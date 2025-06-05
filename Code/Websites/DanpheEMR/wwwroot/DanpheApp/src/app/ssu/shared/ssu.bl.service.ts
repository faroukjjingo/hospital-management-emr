import { Injectable } from '@angular/core';
import { Patient } from '../../patients/shared/patient.model';
import { SSU_DLService } from './ssu.dl.service';

import * as _ from 'lodash';
import { PatientsDLService } from '../../patients/shared/patients.dl.service';

//Note: mapping is done here by blservice, component will only do the .subscribe().
@Injectable()
export class SSU_BLService {

  //we-re gradually moving business logic from component to BLServices


  constructor(public ssuDLService: SSU_DLService, public patientDLService: PatientsDLService) {

  }
  // for getting the Patient
  public GetPatients(searcgTxt) {
    return this.ssuDLService.GetPatients(searcgTxt)
      
  }

  public GetPatientById(patientId: number) {
    return this.ssuDLService.GetPatientById(patientId)
      
  }
  // getting the CountrySubDivision from dropdown
  public GetCountrySubDivision(countryId: number) {
    return this.ssuDLService.GetCountrySubDivision(countryId)
      

  }
  public GetCountries() {
    return this.ssuDLService.GetCountries()
      
  }
  public GetMembershipType() {
    return this.ssuDLService.GetMembershipType()
      
  }
  public GetPatientBillHistory(patientCode: string) {
    return this.ssuDLService.GetPatientBillHistory(patientCode)
      
  }




  public GetLightPatientById(patientId: number) {
    return this.ssuDLService.GetLightPatientById(patientId)
      ;
  }
  public GetInsuranceProviderList() {
    return this.ssuDLService.GetInsuranceProviderList()
      ;
  }
  public GetDialysisCode() {
    return this.ssuDLService.GetDialysisCode()
      ;
  }
  // for posting the patient
  // public PostPatient(patientObj: Patient) {
  //   //ommitting all validators, before sending to server.
  //   //BUT, guarantorValidator is behaving differently so we've created this work-around to 
  //   // assign it back to the patientobject -- needs better approach later.. --sudarshan-27feb'17
  //   let guarValidator = patientObj.Guarantor.GuarantorValidator;

  //   var temp = _.omit(patientObj, ['PatientValidator',
  //     'Addresses[0].AddressValidator',
  //     'Addresses[1].AddressValidator',
  //     'Insurances[0].InsuranceValidator',
  //     'Insurances[1].InsuranceValidator',
  //     'KinEmergencyContacts[0].KinValidator',
  //     'KinEmergencyContacts[1].KinValidator',
  //     'Guarantor.GuarantorValidator',
  //     'ProfilePic.PatientFilesValidator',
  //     'CountrySubDivision',
  //   ]);


  //   let data = JSON.stringify(temp);

  //   patientObj.Guarantor.GuarantorValidator = guarValidator;

  //   return this.ssuDLService.PostPatient(data)
  //     

  // }

  //this returns an observable, calling client can subscribe to it.. 
  // for updating the patient
  public PutPatient(patientObj: Patient) {
    //do your business logic here, like removing the validator etc...
    let guarValidator = patientObj.Guarantor.GuarantorValidator;
    var temp = _.omit(patientObj, ['PatientValidator',
      'Addresses[0].AddressValidator',
      'Addresses[1].AddressValidator',
      'Insurances[0].InsuranceValidator',
      'Insurances[1].InsuranceValidator',
      'KinEmergencyContacts[0].KinValidator',
      'KinEmergencyContacts[1].KinValidator',
      'Guarantor.GuarantorValidator',
      'ProfilePic.PatientFilesValidator',
      'CountrySubDivision',]);


    let data = JSON.stringify(temp);
    //ommitting and re-assigning the validator, which was behaving strangely
    patientObj.Guarantor.GuarantorValidator = guarValidator;
    //pass patientid and stringyfied object to the dlservice
    return this.ssuDLService.PutPatient(patientObj.PatientId, data)
      

  }

  //Get Matching Patient Details by FirstName,LastName,PhoneNumber for showing registered matching patient on Registration Creation time
  public GetExistedMatchingPatientList(FirstName, LastName, PhoneNumber, Age, Gender, IsInsurance = false, IMISCode = null) {
    return this.ssuDLService.GetExistedMatchingPatientList(FirstName, LastName, PhoneNumber, Age, Gender, IsInsurance, IMISCode)
      ;
  }

  public GetSsuPatients(searcgTxt) {
    return this.ssuDLService.GetSsuPatients(searcgTxt)
      
  }

  public PostSsuPatient(data) {
    let newPatObject = _.omit(data, ['SsuPatientValidator']);
    let patString = JSON.stringify(newPatObject);
    return this.ssuDLService.PostSsuPatient(patString);
  }

  public PutSsuPatient(data) {
    let newPatObject = _.omit(data, ['SsuPatientValidator']);
    let patString = JSON.stringify(newPatObject);
    return this.ssuDLService.PutSsuPatient(patString);
  }
  public PutActivateDeactivateSsuPatient(data) {
    let newPatObject = _.omit(data, ['SsuPatientValidator']);
    let patString = JSON.stringify(newPatObject);
    return this.ssuDLService.PutActivateDeactivateSsuPatient(patString);
  }

  public GetMunicipality(id: number) {
    return this.patientDLService.GetMunicipality(id)
      
  }

}
