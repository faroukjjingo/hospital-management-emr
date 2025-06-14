﻿import { Component, Directive, ViewChild } from '@angular/core';
import { PHRMReportsModel } from "../../shared/phrm-reports-model";
import { DLService } from "../../../shared/dl.service"
import * as moment from 'moment/moment';
import { MessageboxService } from '../../../shared/messagebox/messagebox.service';
import { GridEmitModel } from "../../../shared/danphe-grid/grid-emit.model";
import { PharmacyBLService } from "../../shared/pharmacy.bl.service";
import PHRMReportsGridColumns from "../../shared/phrm-reports-grid-columns";
import PHRMGridColumns from "../../shared/phrm-grid-columns";

@Component({
    selector: 'my-app',
    templateUrl: "./phrm-abcved-report.html"
})
export class PHRMABCVEDReportComponent {
  
  public Status: string = "";
  PHRMABCVEDReportColumns: Array<any> = null;
  PHRMABCVEDReportData: Array<any> = new Array<any>();


  constructor(public pharmacyBLService: PharmacyBLService, public dlService: DLService, public msgBoxServ: MessageboxService) {
    this.PHRMABCVEDReportColumns = PHRMReportsGridColumns.PHRMABCVEDStockReportColumns;
    this.GetReportData();
    }
   
   
    //////Export data grid options for excel file
    gridExportOptions = {
        fileName: 'ABCVEDStockReport_' + moment().format('YYYY-MM-DD') + '.xls',
    };


    //////Function Call on Button Click of Report
    GetReportData() {
        this.pharmacyBLService.GetPHRMABCVEDStockReport(this.Status)
            .subscribe(res => {
                if (res.Status == 'OK' && res.Results.length > 0) {
                    ////Assign report Column from GridConstant to PHRMABCVEDStockReportColumns
                    this.PHRMABCVEDReportColumns = PHRMReportsGridColumns.PHRMABCVEDStockReportColumns;
                    ////Assign  Result to PHRMABCVEDStockReportColumns
                    this.PHRMABCVEDReportData = res.Results;
                    
                }
                if (res.Status == 'OK' && res.Results.length == 0) {
                    this.msgBoxServ.showMessage("error", ["No Data is Available for Selected Record"]);
                }

            });

    }

    ////on click grid export button we are catching in component an event.. 
    ////and in that event we are calling the server excel export....
    OnGridExport($event: GridEmitModel) {
        this.dlService.ReadExcel("/api/PharmacyReport/ExportToExcelPHRMABCVEDStockReport?Status=" + this.Status)
            
            .subscribe(data => {
                let blob = data;
                let a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "ABCVEDReport_" + moment().format("DD-MMM-YYYY_HHmmA") + '.xls';
                document.body.appendChild(a);
                a.click();
            },

            res => this.ErrorMsg(res));
    }
    ErrorMsg(err) {
        this.msgBoxServ.showMessage("error", ["Sorry!!! Not able export the excel file."]);
        console.log(err.ErrorMessage);
    }






}






