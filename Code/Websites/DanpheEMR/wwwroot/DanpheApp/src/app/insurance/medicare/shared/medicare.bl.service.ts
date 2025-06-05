import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { PatientsDLService } from '../../../patients/shared/patients.dl.service';
import { MedicareDependentModel } from './dto/medicare-dependent.model';
import { MedicareMemberModel } from './medicare-member.model';
import { MedicareDLService } from './medicare.dl.service';




@Injectable()
export class MedicareBLService {
    constructor(private medicareDlService: MedicareDLService, private patientDLService: PatientsDLService) {

    }

    public GetPatientsWithVisitsInfo(searchTxt) {
        return this.patientDLService.GetPatientsWithVisitsInfo(searchTxt)
            ;
    }
    public GetAllDepartment() {
        return this.medicareDlService.GetAllDepartments()
            ;
    }

    public GetAllDesignations() {
        return this.medicareDlService.GetAllDesignations()
            ;
    }
    public GetAllMedicareTypes() {
        return this.medicareDlService.GetAllMedicareTypes()
            ;
    }
    public GetAllMedicareInstitutes() {
        return this.medicareDlService.GetAllMedicareInstitutes()
            ;
    }
    public GetAllInsuranceProviderList() {
        return this.medicareDlService.GetAllInsuranceProviderList()
            ;
    }

    public PostMedicareMemberDetails(medicareMemDetails: MedicareMemberModel) {
        let memberDetails = _.omit(medicareMemDetails, ['MedicareMemberValidator']);
        return this.medicareDlService.PostMedicareMemberDetails(memberDetails)
            ;
    }
    public PutMedicareMemberDetails(medicareMemDetails: MedicareMemberModel) {
        let memberDetails = _.omit(medicareMemDetails, ['MedicareMemberValidator']);
        return this.medicareDlService.PutMedicareDetails(memberDetails)
            ;
    }

    public GetMedicareMemberDetailByMedicareNumber(memberNo) {
        return this.medicareDlService.GetMedicareMemberDetailByMedicareNumber(memberNo)
            ;
    }
    public GetMedicareMemberDetailByPatientId(patientId) {
        return this.medicareDlService.GetMedicareMemberDetailByPatientId(patientId)
            ;
    }
    public GetMedicareDependentMemberDetailByPatientId(patientId) {
        return this.medicareDlService.GetMedicareDependentMemberDetailByPatientId(patientId)
            ;
    }

    public PostMedicareDependentDetails(medicareDepDetails: MedicareDependentModel) {
        let dependentDetails = _.omit(medicareDepDetails, ['MedicareDependentValidator']);
        return this.medicareDlService.PostMedicareDependentDetails(dependentDetails)
            ;
    }
    public PutMedicareDependentDetails(medicareDepDetails: MedicareDependentModel) {
        let dependentDetails = _.omit(medicareDepDetails, ['MedicareDependentValidator']);
        return this.medicareDlService.PutMedicareDetails(dependentDetails)
            ;
    }
    public GetMedicarePatientList() {
        return this.medicareDlService.GetMedicarePatients()
            ;
    }
}
