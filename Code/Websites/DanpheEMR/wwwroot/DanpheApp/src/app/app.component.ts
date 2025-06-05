import { Component, ElementRef, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter, tap } from 'rxjs';
import { VisitService } from './appointments/shared/visit.service';
import { CoreService } from './core/shared/core.service';
import { PatientService } from './patients/shared/patient.service';
import { DanpheRoute } from './security/shared/danphe-route.model';
import { SecurityBLService } from './security/shared/security.bl.service';
import { SecurityService } from './security/shared/security.service';
import { User } from './security/shared/user.model';
import { DLService } from './shared/dl.service';
import { MessageboxService } from './shared/messagebox/messagebox.service';
import { EmployeeService } from './employee/shared/employee.service';
import { LabTypesModel } from './labs/lab-selection/lab-type-selection.component';
import { DanpheHTTPResponse } from './shared/common-models';
import { DanpheCache, MasterType } from './shared/danphe-cache-service-utility/cache-services';
import { NavigationService } from './shared/navigation-service';
import { ENUM_CalendarTypes, ENUM_DanpheHTTPResponses, ENUM_LocalStorageKeys, ENUM_MessageBox_Status, ENUM_ServiceBillingContext } from './shared/shared-enums';

@Component({
  selector: 'my-app',
  templateUrl: './view/home-view/AppMain.html',
  standalone: true,
  imports: [], // Add necessary imports if using Angular modules or directives
})
export class AppComponent {
  private http = inject(HttpClient);
  private patService = inject(PatientService);
  private router = inject(Router);
  private visService = inject(VisitService);
  private coreService = inject(CoreService);
  private securityService = inject(SecurityService);
  private securityBlService = inject(SecurityBLService);
  private employeeService = inject(EmployeeService);
  private dlService = inject(DLService);
  private navService = inject(NavigationService);
  private changeDetector = inject(ChangeDetectorRef);
  private msgBoxServ = inject(MessageboxService);
  private elementRef = inject(ElementRef);

  public currentUsr: User = new User();
  public pageParameters = { CustomerName: '', LandingPageCustLogo: '', EmpiLabel: '' };
  public currUser: User = new User();
  public nepDate: any;
  public validRoutes: DanpheRoute[] = [];
  public showDatePopup = false;
  public empPre = { np: false, en: false };
  public selectedDatePref = '';
  public defaultCal = '';
  public EnableEnglishCalendarOnly = false;
  public loading = true;
  public loadingScreen = false;
  public labTypes: LabTypesModel[] = [];
  public currentLabId = 0;
  public currentLabName: string | null = null;

  constructor() {
    this.setLoginTokenToLocalStorage();
    this.initializeApp();
    this.setupRouterEvents();
    this.setupWindowListener();
  }

  private setLoginTokenToLocalStorage(): void {
    localStorage.setItem(ENUM_LocalStorageKeys.LoginTokenName, this.elementRef.nativeElement.getAttribute('loginToken'));
    this.elementRef.nativeElement.setAttribute('loginToken', '');
  }

  private initializeApp(): void {
    // Cache data
    DanpheCache.GetData(MasterType.Country, null);
    DanpheCache.GetData(MasterType.SubDivision, null);
    DanpheCache.GetData(MasterType.BillingCounter, null);
    DanpheCache.GetData(MasterType.PhrmCounter, null);
    DanpheCache.GetData(MasterType.Employee, null);

    // Initialize parameters
    this.coreService.InitializeParameters().subscribe({
      next: (res) => this.callBackLoadParameters(res),
      error: (err) => this.logError(err),
    });

    // Load master entities and lookups
    this.coreService.GetMasterEntities().subscribe((res) => this.coreService.SetMasterEntities(res));
    this.coreService.GetAllLookups().subscribe((res) => this.coreService.SetAllLookUps(res));

    // Load app settings
    this.coreService.InitializeAppSettings().subscribe({
      next: (res: DanpheHTTPResponse) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          this.coreService.AppSettings = res.Results;
          this.coreService.SetAppVersionNum();
        }
      },
      error: (err) => this.logError(err),
    });

    // Load counters and lab types
    this.getActiveCounter();
    this.getActivePharmacyCounter();
    this.coreService.GetLabTypes().subscribe((res) => {
      this.coreService.SetLabTypes(res);
      if (res.Status === ENUM_DanpheHTTPResponses.OK) {
        this.getActiveLab();
      }
    });

    // Load additional data
    this.getMunicipalities();
    this.getGovLabItems();
    this.loadAccountingHospitalInfo();
    this.getAllValidRouteList();
    this.setValidNavigationRoute();
    this.setValidUserPermissions();
    this.coreService.getCalenderDatePreference().subscribe((res) => {
      this.coreService.SetCalenderDatePreference(res);
      if (this.coreService.DatePreference) {
        this.datePreferenceData(this.coreService.DatePreference);
      }
    });

    // Set QZ-Tray and printer settings
    this.coreService.SetQZTrayObject();
    this.coreService.GetPrinterSettings().subscribe((res) => this.coreService.SetPrinterSettings(res));

    // Load additional configurations
    this.loadAllMembershipTypes();
    this.getPrintExportConfiguration();
    this.getPaymentModeSettings();
    this.getPaymentModes();
    this.getPaymentPages();
    this.getMembershipTypeVsPriceCategoryMapping();
    this.getSchemeList();
  }

  private setupRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationStart | NavigationEnd | NavigationCancel | NavigationError =>
          event instanceof NavigationStart ||
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ),
        tap((event) => {
          if (event instanceof NavigationStart) this.loading = true;
          if (event instanceof NavigationEnd) this.loading = false;
          if (event instanceof NavigationCancel || event instanceof NavigationError) this.loading = false;
        })
      )
      .subscribe();
  }

  private setupWindowListener(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'logout-event') {
        window.location.href = '/Account/Logout';
      }
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  private setLoadingScreenVal(): void {
    try {
      const parVal = this.coreService.Parameters.find((p) => p.ParameterName === 'showLoadingScreen' && p.ParameterGroupName.toLowerCase() === 'common');
      if (parVal) {
        this.loadingScreen = parVal.ParameterValue.toLowerCase() === 'true';
      }
    } catch (exception) {
      console.error('Error Message:', exception.message);
      console.error('Stack Details:', exception.stack);
    }
  }

  private getLoggedInUserId(): void {
    this.securityBlService
      .GetLoggedInUserInformation()
      .subscribe({
        next: (res) => {
          if (res.Status === ENUM_DanpheHTTPResponses.OK) {
            const loggedUsr = this.securityService.GetLoggedInUser();
            loggedUsr.UserId = res.Results.UserId;
            loggedUsr.UserName = res.Results.UserName;
            loggedUsr.EmployeeId = res.Results.EmployeeId;
            loggedUsr.Employee = res.Results.Employee;
            loggedUsr.Profile = res.Results.Profile;
            loggedUsr.NeedsPasswordUpdate = res.Results.NeedsPasswordUpdate;
            loggedUsr.LandingPageRouteId = res.Results.LandingPageRouteId;
            loggedUsr.IsSystemAdmin = res.Results.IsSysAdmin;
            this.currentUsr = loggedUsr;

            if (loggedUsr.Profile.ImageLocation === '') {
              this.employeeService.ProfilePicSrcPath = '/themes/theme-default/images/NO_Image.png';
            } else {
              this.employeeService.ProfilePicSrcPath = '\\' + loggedUsr.Profile.ImageLocation;
            }

            if (loggedUsr.NeedsPasswordUpdate) {
              this.router.navigate(['/Employee/ProfileMain/ChangePassword']);
            }

            if (res.Results.LandingPageRouteId) {
              const path = this.securityService.UserNavigations.find((a) => a.RouteId === res.Results.LandingPageRouteId);
              const check = sessionStorage.getItem('isLandingVisited');
              const isLandingVisitedNewTab = localStorage.getItem('isLandingVisitedNewTab');

              if (check !== 'true' && isLandingVisitedNewTab !== 'true' && path) {
                sessionStorage.setItem('isLandingVisited', 'true');
                localStorage.setItem('isLandingVisitedNewTab', 'true');
                this.router.navigate(['/' + path.UrlFullPath]);
              } else {
                this.router.navigate(['/']);
              }
            }
          }
        },
        error: (err) => {
          this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Error, ['Failed to get user data. Check log for details.']);
          this.logError(err.ErrorMessage);
        },
      });
  }

  onActivate(): void {
    window.scroll(0, 0);
  }

  private getActiveCounter(): void {
    this.securityBlService.GetActiveBillingCounter().subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          this.securityService.getLoggedInCounter().CounterId = res.Results;
        }
      },
      error: (err) => this.logError(err.ErrorMessage),
    });
  }

  private getAllValidRouteList(): void {
    this.securityBlService.GetAllValidRouteList().subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          this.securityService.validRouteList = res.Results;
          this.validRoutes = this.securityService.GetAllValidRoutes();
        }
      },
      error: (err) => this.logError(err.ErrorMessage),
    });
  }

  private getActivePharmacyCounter(): void {
    this.securityBlService.GetActivePharmacyCounter().subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          this.securityService.setPhrmLoggedInCounter(res.Results);
        }
      },
      error: (err) => this.logError(err.ErrorMessage),
    });
  }

  private setValidNavigationRoute(): void {
    this.securityBlService.GetValidNavigationRouteList().subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          this.securityService.UserNavigations = res.Results;
          this.getLoggedInUserId();
          this.currUser = this.currentUsr;
        }
      },
      error: (err) => {
        this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Error, ['Failed to get navigation menu data. Check log for details.']);
        this.logError(err.ErrorMessage);
      },
    });
  }

  private setValidUserPermissions(): void {
    this.securityBlService.GetValidUserPermissionList().subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          this.securityService.UserPermissions = res.Results;
        } else {
          window.location.href = '/Account/Logout';
          this.logError(res.ErrorMessage);
        }
      },
      error: (err) => {
        this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Error, ['Failed to get user permissions. Check log for details.']);
        this.logError(err.ErrorMessage);
      },
    });
  }

  private callBackLoadParameters(res: DanpheHTTPResponse): void {
    if (res.Status === ENUM_DanpheHTTPResponses.OK) {
      this.coreService.Parameters = res.Results;
      this.coreService.SetTaxLabel();
      this.coreService.SetCurrencyUnit();
      this.coreService.SetCalendarADBSButton();
      this.coreService.SetLocalNameFormControl();
      this.coreService.SetCountryMapOnLandingPage();
      this.setLoadingScreenVal();
      this.checkForEnglishCalendarParameterAndSetDefaultPreference();
    } else {
      window.location.href = '/Account/Logout';
      this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Error, [res.ErrorMessage]);
    }
  }

  private checkForEnglishCalendarParameterAndSetDefaultPreference(): void {
    const param = this.coreService.Parameters.find((p) => p.ParameterGroupName === 'Common' && p.ParameterName === 'EnableEnglishCalendarOnly');
    if (param?.ParameterValue) {
      this.EnableEnglishCalendarOnly = JSON.parse(param.ParameterValue);
      if (this.EnableEnglishCalendarOnly) {
        this.empPre.np = false;
        this.empPre.en = true;
        this.selectedDatePref = ENUM_CalendarTypes.English;
        this.defaultCal = 'English (AD)';
        this.coreService.DatePreference = ENUM_CalendarTypes.English;
        this.saveEmpPref();
      }
    }
  }

  downloadUserManual(): void {
    this.dlService.ReadExcel('/Home/GetUserManual').subscribe({
      next: (data) => {
        const blob = data;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'DanpheEMR-UserManual.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (res) => this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Error, [res]),
    });
  }

  logoutFromApplication(): void {
    localStorage.removeItem(ENUM_LocalStorageKeys.LoginTokenName);
    sessionStorage.removeItem('isLandingVisited');
    localStorage.removeItem('isLandingVisitedNewTab');
    localStorage.removeItem('selectedLabCategory');
    localStorage.setItem('logout-event', `logout${Math.random()}`);
    window.location.href = '/Account/Logout';
  }

  openShowDatePreference(): void {
    this.showDatePopup = true;
  }

  close(): void {
    this.showDatePopup = false;
  }

  changeDatePreference(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.name === 'AD') {
      this.datePreferenceData('en');
      this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Notice, [
        'Default English (AD) calendar preference is saved locally. If you want to store permanently click on save',
      ]);
    } else if (target.name === 'BS') {
      this.datePreferenceData('np');
      this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Notice, [
        'Default Nepali (BS) calendar preference is saved locally. If you want to store permanently click on save',
      ]);
    }
  }

  datePreferenceData(type: string): void {
    if (type === 'np') {
      this.empPre.en = false;
      this.empPre.np = true;
      this.selectedDatePref = 'np';
      this.defaultCal = 'Nepali (BS)';
      this.coreService.DatePreference = type;
    } else {
      this.empPre.np = false;
      this.empPre.en = true;
      this.selectedDatePref = 'en';
      this.defaultCal = 'English (AD)';
      this.coreService.DatePreference = type;
    }
  }

  saveEmpPref(): void {
    this.dlService.Add(this.selectedDatePref, '/api/Core/EmployeeDatePreference').subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          const data = res.Results;
          this.coreService.DatePreference = data?.PreferenceValue ?? null;
          if (this.coreService.DatePreference) {
            this.datePreferenceData(this.coreService.DatePreference);
          }
          if (!this.EnableEnglishCalendarOnly) {
            this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Success, ['Saved your date preference']);
          }
          this.close();
        }
      },
      error: (err) => this.logError(err),
    });
  }

  private loadAccountingHospitalInfo(): void {
    this.securityBlService.GetAccountingHopitalInfo().subscribe({
      next: (res: DanpheHTTPResponse) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          this.securityService.SetAccHospitalInfo(res.Results);
          this.coreService.GetCodeDetails().subscribe((res) => this.coreService.SetCodeDetails(res));
          this.coreService.GetFiscalYearList().subscribe((res) => this.coreService.SetFiscalYearList(res));
        }
      },
      error: (err) => {
        this.msgBoxServ.showMessage(ENUM_MessageBox_Status.Error, ['Failed to get hospital info. Check log for details.']);
        this.logError(err.ErrorMessage);
      },
    });
  }

  private checkLabPermissions(): void {
    const labSelectionPermData = this.securityService.UserPermissions.filter((a) =>
      this.labTypes?.find((l) => `lab-type-${l.PermName}` === a.PermissionName)
    );
    const labSelectionPerm = labSelectionPermData.filter((data, index, self) => self.findIndex((d) => d.PermissionId === data.PermissionId) === index);

    if (labSelectionPerm?.length === 1) {
      const type = this.labTypes.find((l) => `lab-type-${l.PermName}` === labSelectionPerm[0].PermissionName);
      this.coreService.singleLabType = true;
      if (type) {
        this.securityService.setActiveLab(type);
        this.activateLab(type);
      }
    }
  }

  private getActiveLab(): void {
    this.labTypes = this.coreService.labTypes;
    this.securityBlService.GetActiveLab().subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK && res.Results.LabTypeId > 0) {
          const type = this.labTypes.find((l) => l.LabTypeId === res.Results.LabTypeId);
          if (type) {
            this.securityService.setActiveLab(type);
            this.activateLab(type);
          }
        } else {
          this.checkLabPermissions();
        }
      },
      error: (err) => this.logError(err.ErrorMessage),
    });
  }

  private activateLab(lab: LabTypesModel): void {
    this.dlService.ActivateLab(lab.LabTypeId, lab.LabTypeName).subscribe({
      next: (res) => {
        if (res.Status === ENUM_DanpheHTTPResponses.OK) {
          const actLabId = res.Results;
          this.securityService.getActiveLab().LabTypeId = actLabId.LabTypeId;
          this.securityService.getActiveLab().LabTypeName = actLabId.LabTypeName;
        }
      },
      error: (err) => this.logError(err),
    });
  }

  private getMunicipalities(): void {
    this.coreService.GetAllMunicipalities();
  }

  private getGovLabItems(): void {
    this.coreService.GetAllGovLabComponents();
  }

  private loadAllMembershipTypes(): void {
    this.dlService.GetAllMembershipType().subscribe({
      next: (res) => {
        this.coreService.AllMembershipTypes = res.Results;
      },
      error: (err) => this.logError(err),
    });
  }

  private getPrintExportConfiguration(): void {
    this.coreService.GetPrintExportConfiguration();
  }

  private getPaymentModeSettings(): void {
    this.coreService.GetPaymentModeSettings();
  }

  private getPaymentModes(): void {
    this.coreService.GetPaymentModes();
  }

  private getPaymentPages(): void {
    this.coreService.GetPaymentPages();
  }

  private getMembershipTypeVsPriceCategoryMapping(): void {
    this.coreService.GetMembershipTypeVsPriceCategoryMapping();
  }

  private getSchemeList(): void {
    this.coreService.GetSchemeList(ENUM_ServiceBillingContext.OpBilling);
  }

  private logError(err: any): void {
    console.error(err);
  }
}