import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { MessageboxService } from '../../../shared/messagebox/messagebox.service';
import { CoreService } from "../../../core/shared/core.service";
import { DLService } from "../../../shared/dl.service"
import * as moment from 'moment/moment';
import { CommonFunctions } from "../../../shared/common.functions";

@Component({
    selector: 'rpt-bill-doc-summary',
    templateUrl: './bill-doc-summary.html'
})
export class RPT_BIL_DocSummaryComponent {
    @Input("fromDate")
    public FromDate: string = "";
    @Input("toDate")
    public ToDate: string = "";
    public reportData: Array<any> = [];
    public selDoctorId: number = null;
    public showBillDocSummary: boolean = false;
    public showBillDocsDeptSummary: boolean = false;
    public summary = {
        tot_PerformerAmount: 0, tot_PrescriberAmount: 0, tot_ReferrerAmount: 0
    };
    public currentDate: string = "";
    public headerDetail:any;
    public headerProperties:any;

    constructor(
        public msgBoxServ: MessageboxService,
        public dlService: DLService,
        public coreService: CoreService,
        public changeDetector: ChangeDetectorRef) {
        this.currentDate = moment().format('YYYY-MM-DD');
        this.LoadHeaderDetailsCalenderTypes();
    }
    @Input("showDocSummary")
    public set value(val: boolean) {
        if (val) {
            this.loadDocSummary();
        }
        else
            this.showBillDocSummary = false;
    }

    public loadDocSummary() {
        this.dlService.Read("/BillingReports/BillDocSummary?FromDate=" + this.FromDate + "&ToDate=" + this.ToDate)
            
            .subscribe(res => {
                if (res.Status == "OK") {
                    // let data = JSON.parse(res.Results.JsonData);
                    let data = res.Results;
                    if (data.length > 0) {
                        this.reportData = data;
                        //parsing figures
                        this.reportData.forEach(itm => {
                            itm.NetAmount_Performer = CommonFunctions.parseAmount(itm.NetAmount_Performer);
                            itm.NetAmount_Prescriber = CommonFunctions.parseAmount(itm.NetAmount_Prescriber);
                            itm.NetAmount_Referrer = CommonFunctions.parseAmount(itm.NetAmount_Referrer);
                            // itm.NetTotal = CommonFunctions.parseAmount(itm.NetTotal);
                        });
                        //this.CalculateSummaryAmounts(this.reportData);
                        //this.summary.tot_Credit = CommonFunctions.parseAmount(data.Summary[0].CreditAmount);
                        /*this.summary.tot_Cancel = CommonFunctions.parseAmount(data.Summary[0].CancelledAmount);
                        this.summary.tot_Provisional = CommonFunctions.parseAmount(data.Summary[0].ProvisionalAmount);
                        this.summary.tot_DepositReceived = CommonFunctions.parseAmount(data.Summary[0].AdvanceReceived);
                      this.summary.tot_DepositRefund = CommonFunctions.parseAmount(data.Summary[0].AdvanceSettled);
                      this.summary.tot_SettleDisctAmt = CommonFunctions.parseAmount(data.Summary[0].SettledDiscountAmount);
                       // this.summary.tot_SalesTotal = CommonFunctions.parseAmount(this.summary.tot_NetTotal);

                      this.summary.tot_CashCollection = CommonFunctions.parseAmount(this.summary.tot_NetTotal + data.Summary[0].AdvanceReceived - data.Summary[0].AdvanceSettled - this.summary.tot_Credit + this.summary.tot_CreditReceived - this.summary.tot_SettleDisctAmt);
                      */  
                      this.showBillDocSummary = true;
                    }
                    else {
                        this.msgBoxServ.showMessage("notice-message", ['No Data is Available for Selected Parameters...']);
                        this.showBillDocSummary = false;
                    }
                }
            });
    }

    // public ExportToExcelDocSummary() {
    //     this.dlService.ReadExcel("/ReportingNew/ExportToExcelDocSummary?FromDate=" + this.FromDate + "&ToDate=" + this.ToDate)
    //         
    //         .subscribe(data => {
    //             let blob = data;
    //             let a = document.createElement("a");
    //             a.href = URL.createObjectURL(blob);
    //             a.download = "DocSummaryReport_" + moment().format("DD-MMM-YYYY_HHmmA") + '.xls';
    //             document.body.appendChild(a);
    //             a.click();
    //         },
    //             err => this.ErrorMsg(err));
    // }

    LoadHeaderDetailsCalenderTypes() {
        let allParams = this.coreService.Parameters;
        if (allParams.length) {
          let HeaderParms = allParams.find(a => a.ParameterGroupName == "Common" && a.ParameterName == "CustomerHeader");
          if (HeaderParms) {
            this.headerDetail = JSON.parse(HeaderParms.ParameterValue);
            let header = allParams.find(a => a.ParameterGroupName == 'BillingReport' && a.ParameterName == 'TableExportSetting');
            if(header){
                this.headerProperties = JSON.parse(header.ParameterValue)["DoctorSummary"];
            }
          }
        }
      }

    public ExportToExcelDocSummary(tableId){
        if(tableId){
            let workSheetName = 'Doctor Summary Report';
            //let Heading = 'DOCTOR SUMMARY REPORT';
            let filename = 'DoctorSummaryReport';
            var Heading;
            var phoneNumber;
            var hospitalName;
            var address;
            if(this.headerProperties.HeaderTitle!=null){
              Heading = this.headerProperties.HeaderTitle;
            }else{
              Heading = 'DOCTOR SUMMARY REPORT';
            }
      
            if(this.headerProperties.ShowHeader == true){
               hospitalName = this.headerDetail.hospitalName;
               address = this.headerDetail.address;
            }else{
              hospitalName = null;
              address = null;
            }
      
            if(this.headerProperties.ShowPhone == true){
              phoneNumber = this.headerDetail.tel; 
            }else{
              phoneNumber = null;
            }
            // let hospitalName = this.headerDetail.hospitalName;
            // let address = this.headerDetail.address;
            //NBB-send all parameters for now 
            //need enhancement in this function 
            //here from date and todate for show date range for excel sheet data
            CommonFunctions.ConvertHTMLTableToExcelForBilling(tableId, this.FromDate, this.ToDate, workSheetName,
              Heading, filename, hospitalName,address,phoneNumber,this.headerProperties.ShowHeader,this.headerProperties.ShowDateRange);
          }
    }

    public ErrorMsg(err) {
        this.msgBoxServ.showMessage("error", ["Sorry!!! Not able export the excel file."]);
        console.log(err.ErrorMessage);
    }

    public loadDocDepts(row) {
        this.selDoctorId = row.DoctorId;
        this.showBillDocsDeptSummary = true;
        this.showBillDocSummary = false;
    }

    public CalculateSummaryAmounts(data) {
        //initailize to zero
        /*
        this.summary.tot_SubTotal = this.summary.tot_Discount = this.summary.tot_Refund = this.summary.tot_NetTotal = this.summary.tot_Credit = this.summary.tot_Provisional = this.summary.tot_Cancel = 0;

        data.forEach(a => {
            this.summary.tot_SubTotal += a.SubTotal;
            this.summary.tot_Discount += a.Discount;
            this.summary.tot_Refund += a.Refund;
            this.summary.tot_NetTotal += a.NetTotal;
            this.summary.tot_Credit += a.CreditAmount;
            this.summary.tot_CreditReceived += a.CreditReceivedAmount;
        });

        this.summary.tot_SubTotal = CommonFunctions.parseAmount(this.summary.tot_SubTotal);
        this.summary.tot_Discount = CommonFunctions.parseAmount(this.summary.tot_Discount);
        this.summary.tot_Refund = CommonFunctions.parseAmount(this.summary.tot_Refund);
        this.summary.tot_NetTotal = CommonFunctions.parseAmount(this.summary.tot_NetTotal);
        */
        this.summary.tot_PerformerAmount = data.reduce((acc,curr) => acc + curr.NetAmount_Performer,0);
        this.summary.tot_PrescriberAmount = data.reduce((acc,curr) => acc + curr.NetAmount_Prescriber,0);
        this.summary.tot_ReferrerAmount = data.reduce((acc,curr) => acc + curr.NetAmount_Referrer,0);
    }

    public CallBackDocs() {
        this.showBillDocsDeptSummary = false;
        this.showBillDocSummary = true;
        this.changeDetector.detectChanges();
    }
}
