﻿import { Injectable } from '@angular/core';
import { ClinicalDLService } from './clinical.dl.service';

import { Allergy } from './allergy.model';
import { InputOutput } from './input-output.model';
import { Vitals } from './vitals.model';
//import { NotesModel } from '../notes/shared/notes.model';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { BloodSugarMonitoring } from './blood-sugar-monitoring.model';
@Injectable()
export class IOAllergyVitalsBLService {

    constructor(public clinicalDLService: ClinicalDLService) { }
    //allergy
    //get list of allergy using patientId
    public GetPatientAllergyList(patientId: number) {
        return this.clinicalDLService.GetPatientAllergyList(patientId)
            ;
    }
    public GetReactionList() {
        return this.clinicalDLService.GetMasterReactionList()
            ;
    }
    public GetMedicineList() {
        return this.clinicalDLService.GetMasterMedicineList()
            ;
    }
    //input-output
    //get list of IO using PatientId
    public GetPatientInputOutputList(patientVisitId: number, fromDate: string, toDate: string) {
        return this.clinicalDLService.GetPatientInputOutputList(patientVisitId, fromDate, toDate)
            ;
    }
    //vitals
    //get list of vitals using patient Id
    public GetPatientVitalsList(patientVisitId: number) {
        return this.clinicalDLService.GetPatientVitalsList(patientVisitId)
            ;
    }
    //get list of signature using provider Id
    public GetProviderLongSignature(providerId: number) {
        return this.clinicalDLService.GetProviderLongSignature(providerId)
            ;
    }

    public GetPhrmGenericList() {
        return this.clinicalDLService.GetPhrmGenericList()
            ;
    }

    //notes
    // public GetPatientClinicalDetailsForNotes(patientVisitId: number, patientId: number) {
    //     return this.clinicalDLService.GetPatientClinicalDetailsForNotes(patientVisitId, patientId)
    //         ;
    // }
    //allergy
    //post allergy
    public PostAllergy(currentAllergy: Allergy) {
        var temp = _.omit(currentAllergy, ['AllergyValidator']);
        return this.clinicalDLService.PostAllergy(temp)
            ;
    }
    //input-output
    //post IO
    public PostInputOutput(currentInputOutput: InputOutput) {
        var temp = _.omit(currentInputOutput, ['InputOutputValidator']);
        return this.clinicalDLService.PostInputOutput(temp)
            ;
    }
    //notes
    //post notes
    // public AddNotes(currentNotes: NotesModel, addType: string) {
    //     let notes = _.omit(currentNotes, ['PatientVisit']);
    //     return this.clinicalDLService.PostNotes(notes)
    //         ;
    // }

    //input-output
    //calculate Balance in IO.
    public CalculateBalance(intake, output, lastBalance): number {
        return intake + lastBalance - output;
    }
    //vitals
    //calculate BMI in viatls.
    public CalculateBMI(height, weight, heightunit, weightunit): number {
        var _height;
        var _weight;
        //calculating BMI taking height in meter and weight in kg
        // BMI = (weight/ (height*height));
        if (heightunit == "cm")
            _height = height * 0.01;

        else if (heightunit == "inch") {
            _height = height * 0.0254;
        }

        else if (heightunit == "meter")
            _height = height;

        if (weightunit == "pound")
            _weight = weight * 0.45;

        else if (weightunit == "kg")
            _weight = weight

        var bmi = (_weight / (_height * _height));

        ///Math.round-> rounds off to the 1 decimal point
        return (Math.round(bmi * 10) / 10);
    }

    public ConvertInchToFootInch(value) {
        let inch = value % 12;
        let foot = (value - inch) / 12;
        if (foot < 0)
            foot = 0;
        let footinch = foot + "'" + inch + "''";
        return footinch;
    }

    //vitals
    //post vitals
    public PostVitals(currentVitals: Vitals) {
        //start1<sudarshan:23jan'17>: assigning validator to null to avoid circular-reference error inside JSON.stringify
        var obj = currentVitals;
        var vitalValidator = obj.VitalsValidator;//JUGAAD-cut,stringify & reassign validator : revision needed[see below error]
        obj.VitalsValidator = null;
        //ideally below line '_.omit' should work, but its giving null reference error, 
        //var temp = _.omit(obj, ['VitalsValidator']);
        let data = JSON.stringify(obj);
        obj.VitalsValidator = vitalValidator;
        //end1<sudarshan:23jan'17>: assigning validator to null to avoid circular-reference error inside JSON.stringify
        // we make the json string

        return this.clinicalDLService.PostVitals(data)
            ;
    }
    //vitals
    //update vitals
    public PutVitals(currentVitals: Vitals) {
        currentVitals.CreatedOn = moment(currentVitals.CreatedOn).format('YYYY-MM-DD HH:mm');
        //start1<sudarshan:23jan'17>: assigning validator to null to avoid circular-reference error inside JSON.stringify
        var obj = currentVitals;
        var vitalValidator = obj.VitalsValidator;//JUGAAD-cut,stringify & reassign validator : revision needed[see below error]
        obj.VitalsValidator = null;
        //ideally below line '_.omit' should work, but its giving null reference error, 
        //var temp = _.omit(obj, ['VitalsValidator']);
        let data = JSON.stringify(obj);
        obj.VitalsValidator = vitalValidator;
        // let reqType = 'vitals';
        return this.clinicalDLService.PutClinicalVitals(data)
            ;

    }
    //allergy
    //updates allergy
    public PutAllergy(currentAllergy: Allergy) {
        currentAllergy.CreatedOn = moment(currentAllergy.CreatedOn).format('YYYY-MM-DD HH:mm');
        var temp = _.omit(currentAllergy, ['AllergyValidator']);
        let data = JSON.stringify(temp);
        // let reqType = 'allergy';
        return this.clinicalDLService.PutClinicalAllergy(data)
            ;
    }

    //input-output
    //updates IO
    public PutInputOutput(currentInputOutput: InputOutput) {
        currentInputOutput.CreatedOn = moment(currentInputOutput.CreatedOn).format('YYYY-MM-DD HH:mm');
        var temp = _.omit(currentInputOutput, ['InputOutputValidator']);

        let data = JSON.stringify(temp);
        // let reqType = 'inputoutput';
        return this.clinicalDLService.PutClinicalInputOutput(data)
            ;
    }
    public PostBloodSugar(currentInputOutput: BloodSugarMonitoring) {
        let temp = _.omit(currentInputOutput, ['BloodSugarValidator', 'PatientInfo', 'EnteredBy']);
        return this.clinicalDLService.PostBloodSugar(temp)
            ;
    }

    public GetPatientAdmissionInfo(patientVisitId: number) {
        return this.clinicalDLService.GetPatientAdmissionInfo(patientVisitId)
            ;
    }
    public GetPatientBloodSugarList(patientVisitId: number) {
        return this.clinicalDLService.GetPatientBloodSugarList(patientVisitId)
            ;
    }
    public GetClinicalIntakeOutputParameterList() {
        return this.clinicalDLService.GetClinicalIntakeOutputParameterList()
            ;
    }
    //notes
    //update notes
    // public PutNotes(currentNotes: NotesModel, addType: string) {
    //     currentNotes.CreatedOn = moment(currentNotes.CreatedOn).format('YYYY-MM-DD HH:mm');
    //     let notes = _.omit(currentNotes, ['PatientVisit']);
    //     let data = JSON.stringify(notes);
    //     let reqType = 'notes';
    //     return this.clinicalDLService.PutClinical(data, reqType)
    //         ;

    // }
}