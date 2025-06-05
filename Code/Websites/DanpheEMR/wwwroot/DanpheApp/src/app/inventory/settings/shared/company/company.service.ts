import { Injectable, Directive } from '@angular/core';
import { CompanyEndPoint } from "./company.endpoint";
import { CompanyModel } from './company.model';

@Injectable()
export class CompanyService {

    constructor(public CompanyEndpoint: CompanyEndPoint) {

    }

    public GetCompanyList() {
        return this.CompanyEndpoint.GetCompanyList()
            ;
    }

    public AddCompany(CurrentCompany: CompanyModel) {
        return this.CompanyEndpoint.AddCompany(CurrentCompany)
            ;
    }

    public UpdateCompany(id: number,CurrentCompany: CompanyModel) {
        return this.CompanyEndpoint.UpdateCompany(id, CurrentCompany)
            ;
    }

    public GetCompany(id: number) {
        return this.CompanyEndpoint.GetCompany(id)
            ;
    }
}