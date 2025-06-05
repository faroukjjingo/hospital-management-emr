import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { DischargeSummary } from '../../adt/shared/discharge-summary.model';
import { BillingDLService } from '../../billing/shared/billing.dl.service';
import { CoreService } from "../../core/shared/core.service";
import { LabsDLService } from '../../labs/shared/labs.dl.service';
import { ImagingDLService } from '../../radiology/shared/imaging.dl.service';
import { MessageboxService } from '../../shared/messagebox/messagebox.service';
import { DischargeSummaryDLService } from './discharge-summary.dl.service';
import { PatientCertificate } from './patient-certificate.model';

@Injectable()
export class DischargeSummaryBLService {
  public currencyUnit: string = "";

  constructor(public coreService: CoreService,
    public msgBoxServ: MessageboxService,
    public dischargeSummaryDLService: DischargeSummaryDLService,
    public imagingDLService: ImagingDLService,
    public labsDLService: LabsDLService,
    public billingDLService: BillingDLService) {
    this.GetCurrencyUnit;
  }

  public GetDischargeType() {
    return this.dischargeSummaryDLService.GetDischargeType()
      ;
  }
  public GetDischargeConditions() {
    return this.dischargeSummaryDLService.GetDischargeConditions()
      ;
  }
  public GetDeliveryType() {
    return this.dischargeSummaryDLService.GetDeliveryType()
      ;
  }
  public GetBabyBirthCondition() {
    return this.dischargeSummaryDLService.GetBabyBirthCondition()
      ;
  }
  public GetCurrentFiscalYear() {
    return this.dischargeSummaryDLService.GetCurrentFiscalYear()
      ;
  }

  public GetCertificate(dischargeSummaryId: number, PatientId: number) {
    return this.dischargeSummaryDLService.GetCertificate(dischargeSummaryId, PatientId)
      ;
  }
  public GetDeathType() {
    return this.dischargeSummaryDLService.GetDeathType()
      ;
  }
  public GetProviderList() {
    return this.dischargeSummaryDLService.GetProviderList()
      ;
  }
  //get list of employee from Anasthetists dept
  public GetAnasthetistsEmpList() {
    return this.dischargeSummaryDLService.GetAnasthetistsEmpList()
      ;
  }
  public GetLabReportByVisitId(patientVisitId: number) {
    return this.labsDLService.GetReportByPatientVisitId(patientVisitId)
      ;
  }

  public GetAllTests() {
    return this.labsDLService.GetAllLabTests()
      ;
  }

  public GetICDList() {
    return this.dischargeSummaryDLService.GetICDList()
      ;
  }
  //gets only the requisitions made on give visits: added for temporary purpose (to display in discharge-summary, remove later if not required)  sud: 9Aug'17
  public GetLabRequestsByPatientVisit(patientId: number, patientVisitId: number) {
    return this.labsDLService.GetRequisitionsByPatientVisitId(patientId, patientVisitId)
      ;
  }

  public GetMedicationFrequency() {
    return this.dischargeSummaryDLService.GetMedicationFrequency()
      ;
  }
  public GetImagingReportsReportsByVisitId(patientVisitId: number) {
    return this.imagingDLService.GetPatientVisitReports(patientVisitId)
      ;
  }
  public GetDischargeSummary(patientVisitId: number) {
    return this.dischargeSummaryDLService.GetDischargeSummary(patientVisitId)
      ;
  }
  public PostDischargeSummary(dischargeSummary: DischargeSummary) {
    var tempVisitModel = _.omit(dischargeSummary, ['DischargeSummaryValidator']);
    var tempMedicines: any = tempVisitModel.DischargeSummaryMedications.map(itm => {
      return _.omit(itm, ['DischargeSummaryMedicationValidator']);
    });
    var tempConsultants: any = tempVisitModel.DischargeSummaryConsultants.map(itm => {
      return _.omit(itm, ['DischargeSummaryConsultantValidator']);
    });
    //var babies: any = tempVisitModel.BabyBirthDetails.map(itm => {
    //  return _.omit(itm, ['BabyBirthDetailsValidator']);
    //});    
    //tempVisitModel.BabyBirthDetails = babies;
    tempVisitModel.DischargeSummaryMedications = tempMedicines;
    tempVisitModel.DischargeSummaryConsultants = tempConsultants;
    return this.dischargeSummaryDLService.PostDischargeSummary(tempVisitModel)
      
  }
  public UpdateDischargeSummary(dischargeSummary: DischargeSummary) {
    //to fix serializaiton problem in server side
    if (dischargeSummary.CreatedOn)
      dischargeSummary.CreatedOn = moment(dischargeSummary.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (dischargeSummary.ModifiedOn)
      dischargeSummary.ModifiedOn = moment(dischargeSummary.ModifiedOn).format('YYYY-MM-DD HH:mm');
    var tempVisitModel = _.omit(dischargeSummary, ['DischargeSummaryValidator']);
    var tempMedicines: any = tempVisitModel.DischargeSummaryMedications.map(itm => {
      return _.omit(itm, ['DischargeSummaryMedicationValidator']);
    });
    //  if(tempVisitModel.BabyBirthDetails){
    //  var babies: any = tempVisitModel.BabyBirthDetails.map(itm => {
    //    return _.omit(itm, ['BabyBirthDetailsValidator']);
    //  });
    //  tempVisitModel.BabyBirthDetails = babies;
    //}
    tempVisitModel.DischargeSummaryMedications = tempMedicines;
    return this.dischargeSummaryDLService.PutDischargeSummary(tempVisitModel)
      ;
  }

  public GetCurrencyUnit() {
    var currParameter = this.coreService.Parameters.find(a => a.ParameterName == "Currency")
    if (currParameter)
      this.currencyUnit = JSON.parse(currParameter.ParameterValue).CurrencyUnit;
    else
      this.msgBoxServ.showMessage("error", ["Please set currency unit in parameters."]);
  }
  public PostCertificate(patientCertificate: PatientCertificate) {
    return this.dischargeSummaryDLService.PostCertificate(patientCertificate)
      
  }
  public UpdateCertificate(patientCertificate: PatientCertificate) {
    return this.dischargeSummaryDLService.UpdateCertificate(patientCertificate)
      
  }
  public GetDischargeSummaryTemplates(TemplateTypeName: string) {
    return this.dischargeSummaryDLService.GetDischargeSummaryTemplates(TemplateTypeName)
      .map((responseData) => {
        return responseData;
      })
  }
  public LoadTemplateFields(TemplateId: number) {
    return this.dischargeSummaryDLService.LoadTemplateFields(TemplateId)
      .map((responseData) => {
        return responseData;
      })
  }
  public LoadTemplate(TemplateId: number) {
    return this.dischargeSummaryDLService.LoadTemplate(TemplateId)
      .map((responseData) => {
        return responseData;
      })
  }

}


