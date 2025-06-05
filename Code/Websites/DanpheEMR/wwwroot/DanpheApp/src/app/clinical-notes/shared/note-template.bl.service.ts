import { Injectable, Directive } from '@angular/core';
import { ClinicalDLService } from '../../clinical/shared/clinical.dl.service';
import { NotesModel } from '../shared/notes.model';
import * as _ from 'lodash';

@Injectable()
export class NoteTemplateBLService {

  public _NotesId: number = 0;
  get NotesId(): number {
    return this._NotesId;
  }
  set NotesId(NotesId: number) {
    this._NotesId = NotesId;
  }

  constructor(public clinicalDLService: ClinicalDLService) {

  }
  ///Post Notes Template
  public PostProcedureNoteTemplate(NoteMaster: NotesModel) {
    var temp = _.omit(NoteMaster, ['DischargeSummaryNote', 'SubjectiveNote', 'ObjectiveNote', 'FreeTextNote', 'ClinicalDiagnosis', 'AllIcdAndOrders', 'EmergencyNote', 'ProgressiveNote']);
    return this.clinicalDLService.PostProcedureNoteTemplate(temp)
      ;
  }

  public PostProgressNoteTemplate(NoteMaster: NotesModel) {
    var temp = _.omit(NoteMaster, ['DischargeSummaryNote', 'SubjectiveNote', 'ObjectiveNote', 'FreeTextNote', 'ClinicalDiagnosis', 'AllIcdAndOrders', 'EmergencyNote', 'ProcedureNote']);
    return this.clinicalDLService.PostProgressNoteTemplate(temp)
      ;
  }


  public PostFreetextNoteTemplate(NoteMaster: NotesModel) {
    var temp = _.omit(NoteMaster, ['DischargeSummaryNote', 'SubjectiveNote', 'ObjectiveNote', 'ProcedureNote', 'ClinicalDiagnosis', 'AllIcdAndOrders', 'EmergencyNote', 'ProgressiveNote']);
    return this.clinicalDLService.PostFreetextNoteTemplate(temp)
      ;
  }


  public PostDischargeSummary(NoteMaster: NotesModel) {
    var tempNotes = _.omit(NoteMaster, ['SubjectiveNote', 'ObjectiveNote', 'FreeTextNote', 'ProcedureNote', 'ClinicalDiagnosis', 'AllIcdAndOrders', 'EmergencyNote', 'ProgressiveNote']);

    var tempDischargeSummary = _.omit(tempNotes.DischargeSummaryNote, ['DischargeSummaryValidator']);
    tempNotes.DischargeSummaryNote = tempDischargeSummary;
    var tempMedicines: any = tempNotes.DischargeSummaryNote.DischargeSummaryMedications.map(itm => {
      return _.omit(itm, ['DischargeSummaryMedicationValidator']);
    });

    tempNotes.DischargeSummaryNote.DischargeSummaryMedications = tempMedicines;
    return this.clinicalDLService.PostDischargeSummary(tempNotes)
      
  }

  public PostHistoryAndPhysicalNoteTemplate(NoteMaster: NotesModel) {
    var temp = _.omit(NoteMaster, ['DischargeSummaryNote', 'FreeTextNote', 'EmergencyNote', 'ProcedureNote', 'ProgressiveNote', 'ClinicalDiagnosis']);
    var newtemp = _.omit(temp.SubjectiveNote, ['SubjectiveNoteValidator']);
    temp.SubjectiveNote = newtemp;
    return this.clinicalDLService.PostHistoryAndPhysicalNoteTemplate(temp)
      ;
  }

  public PostEmergencyNoteTemplate(NoteMaster: NotesModel) {
    var temp = _.omit(NoteMaster, ['DischargeSummaryNote', 'FreeTextNote', 'ProcedureNote', 'ProgressiveNote', 'ClinicalDiagnosis']);
    var newtemp = _.omit(temp.SubjectiveNote, ['SubjectiveNoteValidator']);
    temp.SubjectiveNote = newtemp;
    return this.clinicalDLService.PostEmergencyNoteTemplate(temp)
      ;
  }

  public PostClinicalPrescriptionNoteTemplate(NoteMaster: NotesModel) {
    let temp = _.omit(NoteMaster, ['DischargeSummaryNote', 'FreeTextNote', 'ObjectiveNote', 'ProcedureNote', 'ProgressNote', 'ClinicalDiagnosis', 'EmergencyNote']);
    let newtemp = _.omit(temp.SubjectiveNote, ['SubjectiveNoteValidator']);
    temp.SubjectiveNote = newtemp;
    return this.clinicalDLService.PostClinicalPrescripitionNote(temp)
      ;
  }



  ///Get Notes Template
  public GetNoteTypeList() {
    return this.clinicalDLService.GetNoteTypeList();
  }

  public GetAllTemplateList() {
    return this.clinicalDLService.GetAllTemplateList()
      ;
  }

  public GetFreetextNoteTemplateByNotesId(NotesId) {
    return this.clinicalDLService.GetFreetextNoteTemplateByNotesId(NotesId)
      ;
  }

  public GetProcedureNoteTemplateByNotesId(NotesId) {
    return this.clinicalDLService.GetProcedureNoteTemplateByNotesId(NotesId)
      ;
  }

  public GetProgressNoteTemplateByNotesId(NotesId) {
    return this.clinicalDLService.GetProgressNoteTemplateByNotesId(NotesId)
      ;
  }
  public GetTemplateDetailsByNotesId(NotesId) {
    return this.clinicalDLService.GetTemplateDetailsByNotesId(NotesId)
      ;
  }
  public GetHistoryAndPhysicalNoteById(NotesId) {
    return this.clinicalDLService.GetHistoryAndPhysicalNoteById(NotesId)
      ;
  }
  public GetEmergencyNoteById(NotesId) {
    return this.clinicalDLService.GetEmergencyNoteById(NotesId)
      ;
  }
  public GetClinicalPrescriptionNoteById(NotesId) {
    return this.clinicalDLService.GetClinicalPrescriptionNoteById(NotesId)
      ;
  }
  public GetAllOrdersByNoteId(NotesId) {
    return this.clinicalDLService.GetAllOrdersByNoteId(NotesId);
  }

  ///Put Notes Template
  public PutFreetextNoteTemplateByNotesId(data) {
    return this.clinicalDLService.PutFreetextNoteTemplateByNotesId(data)
      ;
  }

  public PutProcedureNoteTemplateByNotesId(data) {
    return this.clinicalDLService.PutProcedureNoteTemplateByNotesId(data)
      ;
  }

  public PutProgressNoteTemplateByNotesId(data) {
    return this.clinicalDLService.PutProgressNoteTemplateByNotesId(data)
      ;
  }

  public PutDischargeNoteTemplateByNotesId(data: NotesModel) {

    var tempNotes = _.omit(data, ['SubjectiveNote', 'ObjectiveNote', 'FreeTextNote', 'ProcedureNote', 'ClinicalDiagnosis', 'AllIcdAndOrders', 'EmergencyNote', 'ProgressNote']);

    var tempDischargeSummary = _.omit(tempNotes.DischargeSummaryNote, ['DischargeSummaryValidator']);
    tempNotes.DischargeSummaryNote = tempDischargeSummary;
    var tempMedicines: any = tempNotes.DischargeSummaryNote.DischargeSummaryMedications.map(itm => {
      return _.omit(itm, ['DischargeSummaryMedicationValidator']);
    });

    tempNotes.DischargeSummaryNote.DischargeSummaryMedications = tempMedicines;

    return this.clinicalDLService.PutDischargeNoteTemplateByNotesId(tempNotes)
      ;
  }

  public PutEmergencyNoteTemplate(data) {
    return this.clinicalDLService.PutEmergencyNoteTemplate(data)
      ;
  }

  public PutHistoryAndPhysicalNote(data) {
    return this.clinicalDLService.PutEmergencyNoteTemplate(data)
      ;
  }

  public PutPrescriptionNote(NoteMaster: NotesModel) {
    let temp = _.omit(NoteMaster, ['DischargeSummaryNote', 'FreeTextNote', 'ObjectiveNote', 'ProcedureNote', 'ProgressNote', 'ClinicalDiagnosis', 'EmergencyNote']);
    let newtemp = _.omit(temp.SubjectiveNote, ['SubjectiveNoteValidator']);
    temp.SubjectiveNote = newtemp;
    return this.clinicalDLService.PutClinicalPrescripitionNote(temp)
      ;
  }

}
