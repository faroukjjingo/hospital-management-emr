import { Injectable } from '@angular/core';
import { SecurityService } from '../../security/shared/security.service';
import { DatabaseLogModel } from "../shared/database-log.model";
import { SystemAdminDLService } from './system-admin.dl.service';


@Injectable()
export class SystemAdminBLService {
  constructor(public systemAdminDLService: SystemAdminDLService,
    public securityService: SecurityService) {
  }

  public GetSystemAdmin() {
    return this.systemAdminDLService.GetSystemAdmin();
  }

  //GET:
  //Method for get all database backup log
  public GetDBBakupLog() {
    return this.systemAdminDLService.GetDBBakupLog()
      ;
  }
  //GET:
  //Method for get all Database Activity Log details
  //this.systemAdminBLService.GetDBAuditLogDetails(this.fromDate, this.toDate, this.actionName).
  public GetDBAuditLogDetails(fromDate, toDate, actionName) {
    return this.systemAdminDLService.GetDBAuditLogDetails(fromDate, toDate, actionName)
      ;
  }
  //GET:
  public GetInvoiceDetails(fromDate, toDate) {
    return this.systemAdminDLService.GetInvoiceDetails(fromDate, toDate)
      ;
    //GET:

  }
  public GetAllInvoiceDetails(fromDate, toDate) {
    return this.systemAdminDLService.GetAllInvoiceDetails(fromDate, toDate)
      ;
    //GET:

  }

  public GetAuditList() {
    return this.systemAdminDLService.GetAuditList()
      ;
  }
  public GetLogInInfo(frmDate, toDate) {
    return this.systemAdminDLService.GetLogInInfo(frmDate, toDate)
      ;
  }
  //GET:
  public GetPhrmInvoiceDetails(fromDate, toDate) {
    return this.systemAdminDLService.GetPhrmInvoiceDetails(fromDate, toDate)
      ;
  }
  //GET:
  public GetAuditTrailDetails(CurrentAudit, Table_Name, UserName, ActionName = '') {
    return this.systemAdminDLService.GetAuditTrailDetails(CurrentAudit, Table_Name, UserName, ActionName)
      .map((responseData) => {
        return responseData;
      });
  }

  //POST:
  //Method for take Database Backup
  public TakeDatabaseBackup() {
    return this.systemAdminDLService.TakeDatabaseBackup()
      ;
  }
  //POST:
  //Method for restore Database file
  public RestoreDatabase(databaseLogModel: DatabaseLogModel) {
    let data = JSON.stringify(databaseLogModel);
    return this.systemAdminDLService.RestoreDatabase(data)
      ;
  }
  ////POST:
  ////Method for Export Database as CSV/XML files on client machine
  //public ExportDBToCSVOrXML(exportType: string) {
  //    return this.systemAdminDLService.PostExportDBToCSVOrXML(exportType)
  //        ;
  //}

  //POST:
  //Method for Export Database as CSV/XML files on client machine
  public ExportDBToCSVOrXmlOrPdf(exportType: string) {
    return this.systemAdminDLService.PostExportDBToCSVOrXmlOrPdf(exportType)
      ;
  }


}
