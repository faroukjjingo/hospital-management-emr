import { Component, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageboxService } from '../../shared/messagebox/messagebox.service';
import { CommonFunctions } from '../../shared/common.functions';
import { CoreService } from '../../core/shared/core.service';
import { NepaliCalendarService } from '../../shared/calendar/np/nepali-calendar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // Correct import
import { DestroyRef } from '@angular/core';
import { IPWristBandViewModel } from './ip-wrist-band-info.model';
import { ADT_BLService } from '../shared/adt.bl.service';
import { DanpheHTTPResponse } from '../../shared/common-models';
import { PrinterSettingsModel, ENUM_PrintingType } from '../../settings-new/printers/printer-settings.model';
import html2canvas from 'html2canvas';

@Component({
  selector: 'ip-wrist-band',
  templateUrl: './ip-wrist-band.html',
  host: { '(window:keydown)': 'hotkeys($event)' },
})
export class IPWristBandPrintComponent implements AfterViewInit {
  private http = inject(HttpClient);
  private msgBoxServ = inject(MessageboxService);
  private router = inject(Router);
  private nepaliCalendarServ = inject(NepaliCalendarService);
  private admissionBlService = inject(ADT_BLService);
  private coreService = inject(CoreService);
  private changeDetector = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  wristBandInfo: IPWristBandViewModel | null = null;
  showWristBand = false;
  loading = false;
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
  };
  showLoading = false;
  showQrCode = false;
  defaultFocus: string | null = null;
  patientQRCodeInfo = '';
  closePopUpAfterWristBandPrint = true;

  @Input() patientVisitId: number | undefined;
  @Input() showAsPopup = true;
  @Output() closePopup = new EventEmitter<boolean>();

  @Input() set showWristBandInput(val: boolean) {
    this.showWristBand = val;
    if (this.showWristBand && this.patientVisitId) {
      this.getWristBandInfo();
    }
  }

  selectedPrinter: PrinterSettingsModel = new PrinterSettingsModel();
  openBrowserPrintWindow = false;
  browserPrintContentObj: HTMLElement | null = null;

  ngAfterViewInit(): void {
    const val = this.coreService.Parameters.find(
      (p) => p.ParameterGroupName === 'ADT' && p.ParameterName === 'AdmissionPrintSettings'
    );
    if (val) {
      const param = JSON.parse(val.ParameterValue);
      this.defaultFocus = param.DefaultFocus;
      this.closePopUpAfterWristBandPrint = param.closePopUpAfterWristBandPrint;
      this.focusOnPrint();
    }
    this.showHidePrintButton();
  }

  focusOnPrint(): void {
    const btnObj = document.getElementById('btnPrintWristBand');
    if (btnObj && this.defaultFocus?.toLowerCase() === 'wristband') {
      btnObj.focus();
    }
  }

  getWristBandInfo(): void {
    this.http
      .get<DanpheHTTPResponse>(`/api/Admission/WristBandInfo?patientVisitId=${this.patientVisitId}`, this.options)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.Status === 'OK' && res.Results) {
            this.callBackGetWristbandInfo(res);
            this.focusOnPrint();
          } else {
            this.showWristBand = false;
          }
        },
        error: (err) => {
          this.msgBoxServ.showMessage('error', ['Sorry!!! unable to get wristband information..!']);
          console.error(err);
          this.showWristBand = false;
        },
      });
  }

  callBackGetWristbandInfo(res: DanpheHTTPResponse): void {
    this.wristBandInfo = res.Results;
    const ageSex = CommonFunctions.GetFormattedAgeSex(this.wristBandInfo.DateOfBirth, this.wristBandInfo.Gender);
    this.patientQRCodeInfo = `Name: ${this.wristBandInfo.PatientName}\nHospital No: ${this.wristBandInfo.PatientCode}\nAge/Sex: ${ageSex}`;
    this.showQrCode = true;
  }

  printWristBandStickerClient(): void {
    const printContents = document.getElementById('wristband-print-page')?.outerHTML;
    const popupWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    if (popupWindow) {
      popupWindow.document.open();
      const documentContent = `
        <html>
          <head>
            <link rel="stylesheet" type="text/css" href="../../themes/theme-default/DanpheStyle.css"/>
          </head>
          <body onload="window.print()" style="margin:8px 0px 0px 280px !important;">
            ${printContents}
          </body>
        </html>`;
      popupWindow.document.write(documentContent);
      popupWindow.document.close();
    }
  }

  closeWindow(): void {
    this.closePopup.emit(true);
  }

  showServerPrintBtn = false;

  loadPrinterSetting(): string | null {
    const parameter = this.coreService.Parameters.find((p) => p.ParameterName === 'DefaultPrinterName');
    if (parameter) {
      const jsonObject = JSON.parse(parameter.ParameterValue);
      return jsonObject.OPDSticker;
    }
    return null;
  }

  loadFileStoragePath(): string | null {
    const wristBandFileLocationParam = this.coreService.Parameters.find(
      (p) => p.ParameterGroupName === 'ADT' && p.ParameterName === 'WristBand_FolderPath'
    );
    return wristBandFileLocationParam ? wristBandFileLocationParam.ParameterValue : null;
  }

  showHidePrintButton(): void {
    const wristBandServerPrintParam = this.coreService.Parameters.find(
      (p) => p.ParameterGroupName === 'ADT' && p.ParameterName === 'WristBand_PrintServerSide'
    );
    if (wristBandServerPrintParam) {
      this.showServerPrintBtn = wristBandServerPrintParam.ParameterValue === 'true';
    }
  }

  printWristBandServer(): void {
    html2canvas(document.querySelector('#imgHospitalLogo')!, { scale: 8 }).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const newImg = document.createElement('img');
      newImg.setAttribute('src', image);
      newImg.setAttribute('alt', 'IdPrint of Patient');
      newImg.setAttribute('style', 'height: auto;max-width: 100%;');
      const logoContainer = document.getElementById('dvLogoContainer');
      const existingLogo = document.getElementById('imgHospitalLogo');
      if (existingLogo && logoContainer) {
        existingLogo.remove();
        logoContainer.appendChild(newImg);
      }
      this.sendHtmlContentToServer();
    });
  }

  timerFunction(): void {
    setTimeout(() => {
      this.showLoading = false;
      this.msgBoxServ.showMessage('success', ['wristband printed successfully..']);
      this.closeWindow();
    }, 10000);
  }

  sendHtmlContentToServer(): void {
    const printContents = document.getElementById('wristband-print-page')?.outerHTML;
    const printableHTML = `
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="DanpheStyle.css" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        </head>
        <body style="margin:8px 0px 0px 280px !important;">
          ${printContents}
        </body>
      </html>`;
    let printerName = this.loadPrinterSetting();
    if (printerName && this.wristBandInfo) {
      printerName += this.wristBandInfo.PatientCode;
    }
    const folderPath = this.coreService.AllPrinterSettings.find(
      (a) => a.PrintingType === 'server' && a.GroupName === 'reg-sticker'
    )?.ServerFolderPath;

    if (!folderPath) {
      this.msgBoxServ.showMessage('error', ["Couldn't find storage location for WristBand. Please check Parameter values."]);
      return;
    }

    this.loading = true;
    this.showLoading = true;

    this.admissionBlService
      .saveWristBandHtmlFile(printerName, folderPath, printableHTML)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: DanpheHTTPResponse) => {
          if (res.Status === 'OK') {
            this.timerFunction();
            console.log('wristband printed successfully..');
          } else {
            this.loading = false;
            this.showLoading = false;
          }
        },
        error: () => {
          this.loading = false;
          this.showLoading = false;
        },
      });
  }

  hotkeys(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeWindow();
    }
  }

  onPrinterChanged(event: PrinterSettingsModel): void {
    this.selectedPrinter = event;
  }

  print(): void {
    if (!this.selectedPrinter || this.selectedPrinter.PrintingType === ENUM_PrintingType.browser) {
      this.browserPrintContentObj = document.getElementById('wristband-print-page');
      this.openBrowserPrintWindow = false;
      this.changeDetector.detectChanges();
      this.openBrowserPrintWindow = true;
      if (this.closePopUpAfterWristBandPrint) {
        this.router.navigate(['ADTMain/AdmittedList']);
      }
    } else if (this.selectedPrinter.PrintingType === ENUM_PrintingType.server) {
      this.printWristBandServer();
    } else {
      this.msgBoxServ.showMessage('error', ['Printer Not Supported.']);
    }
  }
}