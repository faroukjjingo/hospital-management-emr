import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as cloneDeep from 'lodash/cloneDeep';
import { ADT_DLService } from '../../adt/shared/adt.dl.service';
import { BabyBirthDetails } from '../../adt/shared/baby-birth-details.model';
import { DeathDetails } from '../../adt/shared/death.detail.model';
import { CoreService } from "../../core/shared/core.service";
import { MessageboxService } from '../../shared/messagebox/messagebox.service';
import { MedicalRecordsSummary } from './medical-records.model';
import { MR_DLService } from './mr.dl.service';

@Injectable()
export class MR_BLService {

  constructor(public coreService: CoreService, public msgBoxServ: MessageboxService,
    public admissionDLService: ADT_DLService, public medicalRecordsDLService: MR_DLService) {
  }

  public GetDischargedPatientsList(fromDate: string, toDate: string) {
    return this.medicalRecordsDLService.GetDischargedPatientsList(fromDate, toDate)
      ;
  }

  public GetAllMasterDataForMR() {
    return this.medicalRecordsDLService.GetAllMasterDataForMR()
      ;
  }

  public GetAllTestsByPatIdAndVisitId(patId, visitId) {
    return this.medicalRecordsDLService.GetAllTestsByPatIdAndVisitId(patId, visitId)
      ;
  }

  public GetPatientMRDetailWithMasterData(medicalRecordId, patVisitId) {
    return this.medicalRecordsDLService.GetPatientMRDetailWithMasterData(medicalRecordId, patVisitId)
      ;
  }

  public GetBirthList(fromDate, toDate) {
    return this.medicalRecordsDLService.GetBirthList(fromDate, toDate)
      ;
  }

  public GetAllBirthCertificateNumbers() {

    return this.medicalRecordsDLService.GetAllBirthCertificateNumbers()
      ;
  }
  public GetAllDeadPatients() {

    return this.medicalRecordsDLService.GetAllDeadPatient()
      ;
  }

  public GetPatientDeathDetailsById(PatId) {

    return this.medicalRecordsDLService.GetPatientDeathDetailsById(PatId)
      ;
  }
  public GetAllDeathCertificateNumbers() {
    return this.medicalRecordsDLService.GetAllDeathCertificateNumbers()
      ;
  }
  public GetAllMRFileNumbers() {
    return this.medicalRecordsDLService.GetAllMRFileNumbers()
      ;
  }
  public GetDeathList(fromDate, toDate) {
    return this.medicalRecordsDLService.GetDeathList(fromDate, toDate)
      ;
  }

  public GetBirthDetailForCertificate(deathDetailId) {
    return this.medicalRecordsDLService.GetBirthDetailForCertificate(deathDetailId)
      ;
  }

  public GetDeathDetailForCertificate(deathDetailId) {
    return this.medicalRecordsDLService.GetDeathDetailForCertificate(deathDetailId)
      ;
  }

  public PostMRofPatient(medicalRec: MedicalRecordsSummary) {
    var record = cloneDeep(medicalRec);
    record.BabyBirthDetails.forEach(br => {
      br.PatientId = record.PatientId;
      br.PatientVisitId = record.PatientVisitId;
    });
    if (!record.ShowDeathCertDetail) {
      record = _.omit(record, ['DeathDetail']);
    } else {
      record.DeathDetail.PatientId = record.PatientId;
      record.DeathDetail.PatientVisitId = record.PatientVisitId;
      record = _.omit(record, ['DeathDetail.DeathDetailsValidator', 'BirthDetail', 'BabyBirthDetails']);
    }

    if (!record.ShowBirthCertDetail) {
      record = _.omit(record, ['BabyBirthDetails']);
    } else {
      for (var i = 0; i < record.BabyBirthDetails.length; i++) {
        var currBrthDet = cloneDeep(record.BabyBirthDetails[i]);
        record.BabyBirthDetails[i] = null;
        record.BabyBirthDetails[i] = Object.assign({}, _.omit(currBrthDet, ['BabyBirthDetailsValidator', 'IsValid', 'IsDirty', 'IsValidCheck']));
      }
    }

    record = _.omit(record, ['BirthDetail']);

    var str = JSON.stringify(record);

    return this.medicalRecordsDLService.PostMRofPatient(str)
      ;

  }

  public PutMedicalRecord(medicalRec: MedicalRecordsSummary) {
    var record = cloneDeep(medicalRec);
    record.BabyBirthDetails.forEach(br => {
      br.PatientId = record.PatientId;
      br.PatientVisitId = record.PatientVisitId;
    });

    if (!record.IsOperationConducted) {
      record.OperationTypeId = 0;
      record.OperatedDoctor = null;
      record.OperationDate = null;
    }

    if (!record.ShowDeathCertDetail) {
      if (record.DeathDetail && record.DeathDetail.DeathId && record.DeathDetail.DeathId > 0) {
        record.DeathDetail.IsActive = false;
      } else { record = _.omit(record, ['DeathDetail']); }
    } else {
      record.DeathDetail.PatientId = record.PatientId;
      record.DeathDetail.PatientVisitId = record.PatientVisitId;
      record = _.omit(record, ['DeathDetail.DeathDetailsValidator']);
    }



    if (!record.ShowBirthCertDetail) {
      //record = _.omit(record, ['BabyBirthDetails']);
      record.BabyBirthDetails = record.BabyBirthDetails.filter(b => {
        if (b.BabyBirthDetailsId) {
          return true;
        }
      });
    }

    for (var i = 0; i < record.BabyBirthDetails.length; i++) {
      var currBrthDet = cloneDeep(record.BabyBirthDetails[i]);
      record.BabyBirthDetails[i] = null;
      record.BabyBirthDetails[i] = Object.assign({}, _.omit(currBrthDet, ['BabyBirthDetailsValidator', 'IsValid', 'IsDirty', 'IsValidCheck']));
    }

    record = _.omit(record, ['BirthDetail']);

    var str = JSON.stringify(record);

    return this.medicalRecordsDLService.PutMedicalRecord(str)
      ;
  }

  public PutBirthDetail(birthDet: BabyBirthDetails) {
    var detail = _.omit(birthDet, ['BabyBirthDetailsValidator']);
    let data = JSON.stringify(detail);
    return this.medicalRecordsDLService.PutBirthDetail(data)
      ;
  }

  public PutBirthCertificateReportDetail(birthDet: BabyBirthDetails) {
    var detail = _.omit(birthDet, ['BabyBirthDetailsValidator']);
    let data = JSON.stringify(detail);
    return this.medicalRecordsDLService.PutBirthCertificateReportDetail(data)
      ;
  }

  public PostDeathDetails(data: DeathDetails) {
    var detail = _.omit(data, ['DeathDetailsValidator']);
    let dataTemp = JSON.stringify(detail);
    return this.medicalRecordsDLService.PostDeathDetails(dataTemp)
      ;
  }

  public PutDeathCertificateReportDetail(deathPat: DeathDetails) {
    var detail = _.omit(deathPat, ['DeathDetailsValidator']);
    let data = JSON.stringify(detail);
    return this.medicalRecordsDLService.PutDeathCertificateReportDetail(data)
      ;
  }

  public PutDeathDetails(deathPat: DeathDetails) {
    var detail = _.omit(deathPat, ['DeathDetailsValidator']);
    let data = JSON.stringify(detail);
    return this.medicalRecordsDLService.PutDeathDetails(data)
      ;
  }


  public PostBirthCertificateDetail(birthDet: Array<any>) {
    let temp: Array<any> = [];
    birthDet.forEach(a => { temp.push(_.omit(a, ['BabyBirthDetailsValidator'])) });
    let data = JSON.stringify(temp);
    return this.medicalRecordsDLService.PostBirthCertificateDetail(data)
      ;
  }



  public PutBirthCertificatePrintDetail(birthDet: BabyBirthDetails) {
    var detail = _.omit(birthDet, ['BabyBirthDetailsValidator']);
    let data = JSON.stringify(detail);
    return this.medicalRecordsDLService.PutBirthCertificatePrintDetail(data)
      ;
  }

  public PutDeathCertificatePrintDetail(deathPat: DeathDetails) {
    var detail = _.omit(deathPat, ['DeathDetailsValidator']);
    let data = JSON.stringify(detail);
    return this.medicalRecordsDLService.PutDeathCertificatePrintDetail(data)
      ;
  }


  public GetAllPatients(searchtxt) {
    return this.medicalRecordsDLService.GetAllPatients(searchtxt);
  }
  public GetAllFemalePatients(searchtxt) {
    return this.medicalRecordsDLService.GetAllFemalePatients(searchtxt);
  }

  public GetOutpatientList(fromDate, toDate) {
    return this.medicalRecordsDLService.GetAllOutpatientListWithVisitInfo(fromDate, toDate)
      ;
  }

  public GetICD10ReportingGroup() {
    return this.medicalRecordsDLService.GetICD10ReportingGroup();
  }

  public GetICD10DiseaseGroup() {
    return this.medicalRecordsDLService.GetICD10DiseaseGroup();
  }

  public GetICDList() {
    return this.medicalRecordsDLService.GetICDList();
  }

  public GetOutpatientDiagnosisByVisitId(patId, patVisitId) {
    return this.medicalRecordsDLService.GetOutpatientDiagnosisByVisitId(patId, patVisitId);
  }

  public PostFinalDiagnosis(data: any) {
    let strData = JSON.stringify(data);
    return this.medicalRecordsDLService.PostFinalDiagnosis(strData);
  }
  public GetBabyDetailsListByMotherPatientId(patientId: any) {

    return this.medicalRecordsDLService.GetBabyDetailsListByMotherPatientId(patientId);
  }

  public GetLatestDeathCertificate() {
    return this.medicalRecordsDLService.GetLatestDeathCertificateNumber();
  }
  public GetEmergencypatientList(fromDate, toDate) {
    return this.medicalRecordsDLService.GetAllEmergencypatientListWithVisitInfo(fromDate, toDate)
      ;
  }
  public GetICDReportingGroupForEmergency() {
    return this.medicalRecordsDLService.GetICDReportingGroupForEmergency();
  }

  public GetICDDiseaseGroupForEmergency() {
    return this.medicalRecordsDLService.GetICDDiseaseGroupForEmergency();
  }

  public GetEmergencyPatientDiagnosisByVisitId(patId, patVisitId) {
    return this.medicalRecordsDLService.GetEmergencypatientDiagnosisByVisitId(patId, patVisitId);
  }
  public PostFinalDiagnosisForEmergencyPatient(data: any) {
    let strData = JSON.stringify(data);
    return this.medicalRecordsDLService.PostFinalDiagnosisForEmergencyPatient(strData);
  }
  public GetEthnicGroupStatisticsData(fromDate: string, toDate: string) {
    return this.medicalRecordsDLService.GetEthnicGroupStatisticsData(fromDate, toDate)
      ;
  }

}


