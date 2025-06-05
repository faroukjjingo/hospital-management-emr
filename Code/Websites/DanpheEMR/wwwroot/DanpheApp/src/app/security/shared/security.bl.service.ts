import { Injectable, Directive } from '@angular/core';

import { SecurityDLService } from './security.dl.service';

//Note: mapping is done here by blservice, component will only do the .subscribe().
@Injectable()
export class SecurityBLService {

    constructor(public securityDlService: SecurityDLService) {

    }

    public GetLoggedInUserInformation() {
        return this.securityDlService.GetLoggedInUserInfo()
            
    }

    //getting Navigation Route
    //Nagesh 20-Jul-17
    public GetValidNavigationRouteList() {
        return this.securityDlService.GetValidNavigationRouteList()
            
    }

    //getting permissions of user
    //Ajay 09-10-2018
    public GetValidUserPermissionList() {
        return this.securityDlService.GetValidUserPermissionList()
            ;
    }

    public GetActiveBillingCounter() {
        return this.securityDlService.GetActiveBillingCounter()
            
    }
    public GetActiveLab(){
        return this.securityDlService.GetActiveLab().map(res => {return res; });
    }
    public GetActivePharmacyCounter() {
        return this.securityDlService.GetActivePharmacyCounter()
            
    }
    public GetAllValidRouteList() {
        return this.securityDlService.GetAllValidRouteList()
            

    }
    ////not sure if it has to be inside billing or security-- sud:5May'18
    //public GetLoggedInCounterInformation() {
    //    return this.securityDlService.GetLoggedInCounterInfo()
    //        
    //}

    //public SetLoggedInCounter(counterId: number) {
    //    return this.securityDlService.SetLoggedInCounterInfo(counterId)
    //        ;
    //}

    ////adding the samplecode 
    //public GetLoggedInCounterInfo() {
    //    return this.http.get<any>("/api/Security?reqType=loggedInCounter", this.options);
    //}

    ////adding the samplecode 
    //public SetLoggedInCounterInfo() {
    //    return this.http.put<any>("/api/Security?reqType=loggedInCounter", this.options);
    //}

    public GetAccountingHopitalInfo() {
        return this.securityDlService.GetAccHospitalInfo()
            
    }
    public GetINVHospitalInfo() {
        return this.securityDlService.GetINVHospitalInfo()
            
    }    

    public ActivateLab(labId: number, labName: string){
        return this.securityDlService.ActivateLab(labId, labName).map(res => {
          return res;
        });
      }

}