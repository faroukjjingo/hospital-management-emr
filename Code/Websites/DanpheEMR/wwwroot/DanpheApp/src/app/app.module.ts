import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingConstant } from './app-routing.constant';
import { AppComponent } from './app.component';
import { DashboardHomeComponent } from './dashboards/home/dashboard-home.component';
import { UnAuthorizedAccessComponent } from './account/unauthorizes-access.component';
import { MessageBoxComponent } from './shared/messagebox/messagebox.component';
import { LoaderComponent } from './shared/danphe-loader-intercepter/danphe-loader';
import { ActivateInventoryComponent } from './shared/activate-inventory/activate-inventory.component';
import { DynamicReportComponent } from './dynamic-report/dynamic-report.component';

import { UnicodeService } from './common/unicode.service';
import { PatientService } from './patients/shared/patient.service';
import { AppointmentService } from './appointments/shared/appointment.service';
import { VisitService } from './appointments/shared/visit.service';
import { SecurityService } from './security/shared/security.service';
import { CallbackService } from './shared/callback.service';
import { RouteFromService } from './shared/routefrom.service';
import { SelectVisitCanActivateGuard } from './shared/select-visit-canactivate-guard';
import { MessageboxService } from './shared/messagebox/messagebox.service';
import { BillingService } from './billing/shared/billing.service';
import { DLService } from './shared/dl.service';
import { ClaimManagementBLService } from './claim-management/shared/claim-management.bl.service';
import { ClaimManagementDLService } from './claim-management/shared/claim-management.dl.service';
import { NotificationBLService } from './core/notifications/notification.bl.service';
import { NotificationDLService } from './core/notifications/notification.dl.service';
import { DispensaryEndpoint } from './dispensary/shared/dispensary.endpoint';
import { DispensaryService } from './dispensary/shared/dispensary.service';
import { EmployeeService } from './employee/shared/employee.service';
import { PatientsDLService } from './patients/shared/patients.dl.service';
import { ActivateInventoryGuardService } from './shared/activate-inventory/activate-inventory-guard.service';
import { ActivateInventoryEndpoint } from './shared/activate-inventory/activate-inventory.endpoint';
import { ActivateInventoryService } from './shared/activate-inventory/activate-inventory.service';
import { NavigationService } from './shared/navigation-service';
import { ActivateBillingCounterGuardService } from './utilities/shared/activate-billing-counter-guard-service';
import { ActivateBillingCounterService } from './utilities/shared/activate-billing-counter.service';

import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutingConstant),
    SharedModule,
    CoreModule,
    SecurityModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DLService,
    PatientsDLService,
    NotificationBLService,
    NotificationDLService,
    SecurityService,
    PatientService,
    AppointmentService,
    VisitService,
    CallbackService,
    RouteFromService,
    SelectVisitCanActivateGuard,
    MessageboxService,
    NavigationService,
    BillingService,
    UnicodeService,
    EmployeeService,
    ActivateInventoryGuardService,
    ActivateInventoryService,
    ActivateInventoryEndpoint,
    DispensaryService,
    DispensaryEndpoint,
    ClaimManagementDLService,
    ClaimManagementBLService,
    ActivateBillingCounterGuardService,
    ActivateBillingCounterService,
  ],
  declarations: [
    AppComponent,
    MessageBoxComponent,
    DashboardHomeComponent,
    UnAuthorizedAccessComponent,
    LoaderComponent,
    ActivateInventoryComponent,
    DynamicReportComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}