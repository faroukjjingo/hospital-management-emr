import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CoreService } from '../../../../core/shared/core.service';
import { SecurityService } from '../../../../security/shared/security.service';
import { NepaliCalendarService } from '../../../../shared/calendar/np/nepali-calendar.service';
import { CommonFunctions } from '../../../../shared/common.functions';
import { DLService } from '../../../../shared/dl.service';
import { MessageboxService } from '../../../../shared/messagebox/messagebox.service';
import { HospitalMortalityModel, HospitalMortalityReportModel } from './hospital-mortality-report.model';

@Component({
  selector: 'app-hospital-mortality',
  templateUrl: './hospital-mortality.component.html',
  styleUrls: ['./hospital-mortality.component.css']
})
export class HospitalMortalityComponent {


  public displayReport: boolean = false;
  public HospitalMortalityReport: HospitalMortalityReportModel = new HospitalMortalityReportModel();
  public summaryValues: HospitalMortalityModel = new HospitalMortalityModel();
  public printDetails: HTMLElement;
  public showPrint: boolean;

  public fromDate: string = null;
  public toDate: string = null;

  public CurrentUser = '';
  public headerDetails: any = null;
  public headerProperties: any;

  constructor(public http: HttpClient, public dlService: DLService,
    public msgBoxServ: MessageboxService,
    public coreservice: CoreService,
    public securityService: SecurityService,
    private nepCalendarService: NepaliCalendarService) {
    this.CurrentUser = this.securityService.loggedInUser.Employee.FullName;
    this.GetHeaderParameter();

  }


  gridExportOptions = {
    fileName: 'InpatientOutcome' + moment().format('YYYY-MM-DD') + '.xls',
    //displayColumns: ['PatientCode', 'ShortName', 'Gender', 'MiddleName', 'DateOfBirth', 'PhoneNumber']
  };

  Load() {
    if (this.fromDate != null && this.toDate != null) {
      this.HospitalMortalityReport.HospitalMortality = [];//reset to empty.
      this.displayReport = false;
      this.summaryValues = new HospitalMortalityModel();
      this.dlService.Read("/GovernmentReporting/GetHospitalMortalityReportData?FromDate="
        + this.fromDate + "&ToDate=" + this.toDate)
        
        .subscribe((res) => {
          if (res.Status == "OK") {
            if (res.Results) {
              this.HospitalMortalityReport.HospitalMortality = JSON.parse(res.Results.HospitalMortality);
              this.ReCalcualteSummaryValuesForFooter(this.HospitalMortalityReport.HospitalMortality);
              this.displayReport = true;
            } else {
              this.msgBoxServ.showMessage("Information", ["No Data Received!"]);
            }

          }
          else {
            this.msgBoxServ.showMessage("failed", [res.ErrorMessage]);
          }

        },
          err => this.Error(err));
    } else {
      this.msgBoxServ.showMessage("error", ['Dates Provided is not Proper']);
    }

  }
  Error(err) {
    this.msgBoxServ.showMessage("error", [err.ErrorMessage]);
  }

  //Anjana:11June'20--reusable From-ToDate-In Reports..
  OnFromToDateChange($event) {
    this.fromDate = $event.fromDate;
    this.toDate = $event.toDate;
  }
  //this is used to print the Report
  Print() {
    let fromDate_string = this.nepCalendarService.ConvertEngToNepaliFormatted(this.fromDate, "YYYY-MM-DD");
    let toDate_string = this.nepCalendarService.ConvertEngToNepaliFormatted(this.toDate, "YYYY-MM-DD");

    let popupWindow;
    let printedDate: any = moment().format("YYYY-MM-DD");
    this.showPrint = true;
    var printContents = '<div style="text-align: center;">' + this.Header + ' </div>' + '<br>';
    printContents += '<div style="text-align: center">Inpatient Morbidity Report</div>' + '<br>';
    printContents += '<b style="float: left">Date Range (BS)' + ':  From: ' + fromDate_string + '  To: ' + toDate_string + '<b style="float: right"> Printed On:' + this.nepCalendarService.ConvertEngToNepaliFormatted(printedDate, "YYYY-MM-DD") + 'BS (' + printedDate + ')' + '</b><br>';
    printContents += '<b style="float: right"> Printed By :' + this.CurrentUser + '</b><br>';
    printContents += document.getElementById("dvPrintPage_IpMorbidityRpt").innerHTML;
    popupWindow = window.open('', '_blank', 'width=600,heigth=800,scrollbars=no, menubar=no,toolbar=no, location=no,status=no,titlebar=no');
    popupWindow.document.open();
    popupWindow.document.write(`<html><head>
    <link rel="stylesheet" type="text/css" href="../../../assets-dph/external/global/plugins/bootstrap/css/theme-default/Danphe_ui_style.css" />
    <link rel="stylesheet" type="text/css" href="../../../themes/theme-default/Danphe_ui_style.css" />
    <link rel="stylesheet" type="text/css" href="../../../themes/theme-default/DanphePrintStyle.css" />
    </head>
    <style type="text/css">.dv-table-wrapper{max-height: inherit !important; overflow: auto !important;} .Selected {border-collapse: collapse;}  .no-print{display: none;} @media print{@page {size: landscape}}</style>
    <body>`
      + printContents + `</body></html>`);
    popupWindow.document.close();
    let tmr = setTimeout(function () {
      popupWindow.print();
      popupWindow.close();
    }, 400);
  }
  callBackPrint() {
    this.showPrint = false;
  }

  public ReCalcualteSummaryValuesForFooter(ipArray: Array<HospitalMortalityModel>) {
    this.summaryValues = new HospitalMortalityModel();
    if (ipArray && ipArray.length) {
      this.summaryValues.v0Day_to_7_Days_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v0Day_to_7_Days_Male; }, 0);
      this.summaryValues.v0Day_to_7_Days_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v0Day_to_7_Days_Female; }, 0);
      this.summaryValues.v8Day_to_28_Days_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v8Day_to_28_Days_Male; }, 0);
      this.summaryValues.v8Day_to_28_Days_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v8Day_to_28_Days_Female; }, 0);
      this.summaryValues.v29Days_to_1yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v29Days_to_1yr_Male; }, 0);
      this.summaryValues.v29Days_to_1yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v29Days_to_1yr_Female; }, 0);
      this.summaryValues.v1yr_to_4yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v1yr_to_4yr_Male; }, 0);
      this.summaryValues.v1yr_to_4yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v1yr_to_4yr_Female; }, 0);
      this.summaryValues.v5yr_to_14yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v5yr_to_14yr_Male; }, 0);
      this.summaryValues.v5yr_to_14yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v5yr_to_14yr_Female; }, 0);
      this.summaryValues.v15yr_to_19yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v15yr_to_19yr_Male; }, 0);
      this.summaryValues.v15yr_to_19yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v15yr_to_19yr_Female; }, 0);
      this.summaryValues.v20yr_to_29yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v20yr_to_29yr_Male; }, 0);
      this.summaryValues.v20yr_to_29yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v20yr_to_29yr_Female; }, 0);
      this.summaryValues.v30yr_to_39yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v30yr_to_39yr_Male; }, 0);
      this.summaryValues.v30yr_to_39yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v30yr_to_39yr_Female; }, 0);
      this.summaryValues.v40yr_to_49yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v40yr_to_49yr_Male; }, 0);
      this.summaryValues.v40yr_to_49yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v40yr_to_49yr_Female; }, 0);
      this.summaryValues.v50yr_to_59yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v50yr_to_59yr_Male; }, 0);
      this.summaryValues.v50yr_to_59yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v50yr_to_59yr_Female; }, 0);
      this.summaryValues.v60yr_to_69yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.v60yr_to_69yr_Male; }, 0);
      this.summaryValues.v60yr_to_69yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.v60yr_to_69yr_Female; }, 0);
      this.summaryValues.gt_70yr_Male = ipArray.reduce(function (acc, obj) { return acc + obj.gt_70yr_Male; }, 0);
      this.summaryValues.gt_70yr_Female = ipArray.reduce(function (acc, obj) { return acc + obj.gt_70yr_Female; }, 0);
      this.summaryValues.TotalDeaths_Male = ipArray.reduce(function (acc, obj) { return acc + obj.TotalDeaths_Male; }, 0);
      this.summaryValues.TotalDeaths_Female = ipArray.reduce(function (acc, obj) { return acc + obj.TotalDeaths_Female; }, 0);
    }
  }

  public Header: string = '';

  GetHeaderParameter() {
    var customerHeaderparam = this.coreservice.Parameters.find(a => a.ParameterGroupName == "Common" && a.ParameterName == "CustomerHeader");
    if (customerHeaderparam != null) {
      var customerHeaderParamValue = customerHeaderparam.ParameterValue;
      if (customerHeaderParamValue) {
        this.headerProperties = JSON.parse(customerHeaderParamValue);
        this.Header = `
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="4" style="text-align:center;font-size:large;"><strong>${this.headerProperties.hospitalName}</strong></td>
      </tr>
       <tr>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="4" style="text-align:center;font-size:small;"><strong>${this.headerProperties.address}</strong></td>
      </tr>`;

      }
    }
  }

  public ExportToExcel(tableId) {
    if (tableId) {
      let workSheetName = 'Hospital Mortality Report';
      let filename = 'HospitalMortalityReport';
      var Heading;
      var phoneNumber;
      var hospitalName;
      var address;

      if (this.headerProperties) {
        if (this.headerProperties.HeaderTitle) Heading = this.headerProperties.HeaderTitle;
        else Heading = 'Hospital Mortality';
        hospitalName = this.headerProperties.hospitalName;
        address = this.headerProperties.address;
        phoneNumber = this.headerProperties.tel;
      }


      var dateRange;
      let fromDateNp: any;
      let toDateNp = '';
      if (this.fromDate.length > 0 && this.toDate.length > 0) {
        fromDateNp = NepaliCalendarService.ConvertEngToNepaliFormatted_static(this.fromDate, '');
        toDateNp = NepaliCalendarService.ConvertEngToNepaliFormatted_static(this.toDate, '');
      }
      let nepaliExportDate = NepaliCalendarService.ConvertEngToNepaliFormatted_static(moment().format('YYYY-MM-DD'), '');

      dateRange = (this.fromDate.length > 0 && this.toDate.length > 0) ? `<tr><td></td><td><b>Date Range (BS): ${fromDateNp} To ${toDateNp}</b></td><td></td><td></td><td></td><td></td><td></td>  <td></td><td ><b> Exported Date:${moment().format('YYYY-MM-DD')} (${nepaliExportDate} BS) <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><b> Exported By:${this.CurrentUser}</b></td></tr>` : '';


      CommonFunctions.ConvertHTMLTableToExcelForMedicalRecord(tableId, dateRange, workSheetName,
        Heading, filename, hospitalName, address, phoneNumber);
    }
  }
}
