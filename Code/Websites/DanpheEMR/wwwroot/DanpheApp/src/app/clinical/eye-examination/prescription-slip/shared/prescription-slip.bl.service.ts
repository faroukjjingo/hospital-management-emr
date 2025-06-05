
import { ClinicalDLService } from '../../../shared/clinical.dl.service';

import * as moment from 'moment/moment';
import * as _ from 'lodash';
import { PrescriptionSlipModel } from '../shared/PrescriptionSlip.model'
import { HistoryModel } from '../shared/history.model';
import { PlupModel } from '../shared/plup.model';
import { VaUnaidedModel } from '../shared/va-unaided.model';
import { RetinoscopyModel } from '../shared/retinoscopy.model';
import { AcceptanceModel } from '../shared/acceptance.model';
import { SchrimeModel } from '../shared/schrime.model';
import { TBUTModel } from '../shared/TBUT.model';
import { DilateModel } from '../shared/dilate.model';
import { IOPModel } from '../shared/IOP.model';
import { Injectable, Directive } from '@angular/core';

@Injectable()
export class PrescriptionSlipBLService {

  public _MasterId: number = 0;
  get MasterId(): number {
    return this._MasterId;
  }
  set MasterId(MasterId: number) {
    this._MasterId = MasterId;
  }

  constructor(public clinicalDLService: ClinicalDLService) {
  }

  public PostAcceptance(Acceptance: AcceptanceModel) {

    return this.clinicalDLService.PostAcceptance(Acceptance)
      ;
  }
  public PostHistory(History: HistoryModel) {

    return this.clinicalDLService.PostHistory(History)
      ;
  }
  public PostDilate(Dilate: DilateModel) {

    return this.clinicalDLService.PostDilate(Dilate)
      ;
  }
  public PostIOP(IOP: IOPModel) {

    return this.clinicalDLService.PostIOP(IOP)
      ;
  }
  public PostPlup(Plup: PlupModel) {

    return this.clinicalDLService.PostPlup(Plup)
      ;
  }
  public PostRetinoscopy(Plup: RetinoscopyModel) {

    return this.clinicalDLService.PostRetinoscopy(Plup)
      ;
  }
  public PostSchrime(Plup: SchrimeModel) {

    return this.clinicalDLService.PostSchrime(Plup)
      ;
  }
  public PostVaUnaided(vaunaided: VaUnaidedModel) {

    return this.clinicalDLService.PostVaUnaided(vaunaided)
      ;
    }
    public PostTBUT(TBUT: TBUTModel) {

    return this.clinicalDLService.PostTBUT(TBUT)
      ;
  }
  public PostMasterPrescriptionSlip(PrescriptionSlip: PrescriptionSlipModel) {
    return this.clinicalDLService.PostMasterPrescriptionSlip(PrescriptionSlip)
      ;
  }

  public GetPrescriptionHistoryByPatientId(PatientId: number) {
    return this.clinicalDLService.GetPrescriptionHistoryByPatientId(PatientId)
      ;
  }

  public LoadPrescriptionDetailbyMasterId(MasterId) {
    return this.clinicalDLService.LoadPrescriptionDetailbyMasterId(MasterId)
      ;
  }
}
