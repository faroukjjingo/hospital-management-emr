import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { CoreService } from '../core/shared/core.service';
 
export enum  APIsByType {
  PatientListForRegNewVisit = "/api/Patient/SearchPatientForNewVisit?search=",  //sud:10-Oct'2021--making new api since other one is very heavy.
  PatByName = "/api/Patient/SearchPatient?search=",  
  BillingPatient="/api/Patient/PatientWithVisitInfo",  ///api/Patient?reqType=patientsWithVisitsInfo&admitStatus=
  NursingInpatient="/api/Admission/AdmittedPatientForNursing?&search=",
  VisitList="/api/Visit/GetVisitByStatus?status=",
  NursingOutpatient="/api/Visit/PatientVisitList?search=",
    BillingDuplicatePrint = "/api/Billing/Invoices?search=",
    BillingEditDoctor = "/api/Billing/GetTxnItemsForEditDoctor?search=",
    BillingProvisional = "/api/Billing/DuplicatePrint/ProvisionalReceipts?search="
}
@Injectable()
export class SearchService {

  public  status:string = "";
  public  maxdayslimit:number=0;  
  public patientType: string = "";
  constructor(private http: HttpClient,private _coreService:CoreService) { }

  search(apiUrl,terms: Observable<any>) 
  {
      return terms.debounceTime(400).distinctUntilChanged().switchMap(term => this.searchEntries(apiUrl,term));
  }

  searchEntries(apiurl,term) {
   
    if(term.length==0 || term.length> this.getSerachCharLength()){
      switch(apiurl){
        case APIsByType.VisitList:{
          return this.http.get<any>(apiurl+this.status +"&dayslimit="+this.maxdayslimit+"&search="+term);   
          break;
        }
        case APIsByType.BillingPatient:{
          return this.http.get<any>(apiurl +"&admitStatus="+this.patientType+"&search="+term); 
        }
        default:{
          return this.http.get<any>(apiurl + term);
          break;
        }

      }
    
    }
    else{
      return Observable.empty();
    }
  }
  getSerachCharLength(){
    var length=0;
    var filteredList=this._coreService.Parameters.filter(p=> p.ParameterGroupName=="Common" && p.ParameterName=="ServerSideSearchCharLength");
    if(filteredList.length >0){
        length=filteredList[0].ParameterValue;
    }else{
      length=2; //default search on 3 character
    }
    return length;
  }
}
