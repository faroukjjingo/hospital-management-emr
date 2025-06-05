import { Injectable, Directive } from '@angular/core';
import { OtherChargesEndPoint } from './other-charges.endpoint';
import { OtherChargesMasterModel } from './other-charges.model';

@Injectable()
export class OtherChargesService {

    constructor(public OtherChargesEndPoint: OtherChargesEndPoint) {

    }

    public GetOtherChargesList() {
        return this.OtherChargesEndPoint.GetOtherChargesList()
            ;
    }

    public createOtherCharges(OtherCharge: OtherChargesMasterModel) {
        return this.OtherChargesEndPoint.createOtherCharges(OtherCharge)
            ;
    }

    public UpdateOtherCharge(OtherCharge: OtherChargesMasterModel) {
        return this.OtherChargesEndPoint.UpdateOtherCharge(OtherCharge)
            ;
    }

    public GetOtherCharge(id: number) {
        return this.OtherChargesEndPoint.GetOtherCharge(id)
            ;
    }
    public GetOtherCharges() {
        return this.OtherChargesEndPoint.GetOtherCharges()
            ;
    }
}