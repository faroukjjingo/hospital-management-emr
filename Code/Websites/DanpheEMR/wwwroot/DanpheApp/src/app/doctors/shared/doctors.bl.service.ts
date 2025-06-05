import { Injectable, Directive } from '@angular/core';
import { DoctorsDLService } from './doctors.dl.service';
import { ClinicalDLService } from '../../clinical/shared/clinical.dl.service';
import * as _ from 'lodash';
import { Visit } from '../../appointments/shared/visit.model';
import { NursingDLService } from '../../nursing/shared/nursing.dl.service';
//Note: mapping is done here by blservice, component will only do the .subscribe().
@Injectable()
export class DoctorsBLService {

  constructor(public doctorsDlService: DoctorsDLService, public nursingDLService: NursingDLService,
    public clinicalDLService: ClinicalDLService) {

  }

  public GetTodaysVisits() {
    return this.doctorsDlService.GetTodaysVisits()
      ;
  }

  public GetTodaysVisitsList(today: string) {
    return this.doctorsDlService.GetTodaysVisitsList(today)
      ;
  }

  public GetPastVisits(fromDate: string, toDate: string) {
    return this.doctorsDlService.GetPastVisits(fromDate, toDate)
      ;
  }

  public GetDepartMent(employeeId: number) {
    return this.doctorsDlService.GetDepartMent(employeeId)
      ;
  }
  public GetVisitType() {
    return this.doctorsDlService.GetVisitType()
      ;
  }

  public GetDocDeptVisits(fromDate: string, toDate: string) {
    return this.doctorsDlService.GetDocDeptVisits(fromDate, toDate)
      ;
  }

  GetPatientPreview(patientId: number, patientVisitId: number) {
    return this.doctorsDlService.GetPatientPreview(patientId, patientVisitId)
      ;
  }

  GetPatientOtherRequests(patientId: number, patientVisitId: number) {
    return this.doctorsDlService.GetPatientOtherRequests(patientId, patientVisitId)
      ;
  }
  public PutActiveMedical(currentActiveMedical) {
    var temp = _.omit(currentActiveMedical, ['ActiveMedicalValidator']);
    let data = JSON.stringify(temp);
    // let reqType = 'activemedical';
    return this.clinicalDLService.PutActiveMedicalProblem(data)
      ;
  }
  //re-assign provider id for given patient visit .s
  public SetReassignedProvider(patVisit: Visit) {
    var temp = _.omit(patVisit, ['VisitValidator']);
    let data = JSON.stringify(temp);
    return this.doctorsDlService.SetReassignedProvider(data)
      ;
  }
  public ChangeProvider(temp) {
    let data = JSON.stringify(temp);
    return this.doctorsDlService.ChangeProvider(data)
      ;
  }
  public ConcludeVisit(visitid) {
    return this.doctorsDlService.ConcludeVisit(visitid)
      ;
  }

  public AddComplaints(chiefComplains) {
    return this.nursingDLService.AddNewComplaint(chiefComplains).map((responseData) => {
      return responseData;
    })
  }

  public GetComplaints(patVisitId) {
    return this.nursingDLService.GetComplaints(patVisitId).map((responseData) => {
      return responseData;
    })
  }

  public UpdateComplaint(complain) {
    return this.nursingDLService.UpdateComplaint(complain).map((responseData) => {
      return responseData;
    });
  }
}
