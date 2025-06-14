﻿import { RouterOutlet, RouterModule } from '@angular/router'
import { Component } from '@angular/core'

import { ReportingService } from '../../../reporting/shared/reporting-service';
import { MessageboxService } from '../../../shared/messagebox/messagebox.service';
import { InventoryReportsBLService } from '../shared/inventory-reports.bl.service';
import { InventoryReportsDLService } from '../shared/inventory-reports.dl.service';
import * as moment from 'moment/moment';
import { GridEmitModel } from '../../../shared/danphe-grid/grid-emit.model';

@Component({
    templateUrl: "../../../view/inventory-view/Reports/InventoryValuation.html"  //"/InventoryReports/InventoryValuation"
})

export class InventoryValuationComponent {
    INVValuationColumns: Array<any> = null;
    INVValuationData: Array<any> = [];
    barcodenumbers: any;
    BarCodeViewPopUp: boolean = false;
    itemName: any;

    constructor(
        public inventoryBLService: InventoryReportsBLService,
        public inventoryDLService: InventoryReportsDLService,
        public msgBoxServ: MessageboxService,
        public reportServ: ReportingService) {
        this.ShowValuation();
    }

    gridExportOptions = {
        fileName: 'InventoryValuation' + moment().format('YYYY-MM-DD') + '.xls',
    };

    ShowValuation() {
        this.inventoryBLService.ShowInvValuation()
            
            .subscribe(
                res => this.Success(res),
                res => this.Error(res)
            );
    }

    Error(err) {
        this.msgBoxServ.showMessage("error", [err]);
    }

    Success(res) {
        if (res.Status == "OK") {
            this.INVValuationColumns = this.reportServ.reportGridCols.InventoryValuationReport;
            this.INVValuationData = res.Results;
        }
        else {
            this.msgBoxServ.showMessage("failed", [res.ErrorMessage]);
        }
    }
    BarCodeGridActions($event: GridEmitModel) {
        switch ($event.Action) {
            case "view": {
                if ($event.Data != null) {
                    var data = $event.Data;
                    this.barcodenumbers = data.BarCodes;
                    this.itemName=data.ItemName;
                    this.BarCodeViewPopUp = true;
                }
                break;
            }
            default:
                break;
        }

    }
    Close() {
        this.BarCodeViewPopUp = false;
    }

}