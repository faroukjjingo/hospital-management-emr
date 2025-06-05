import { Injectable, Directive } from '@angular/core';
import { PhrmRackEndPoint } from "./phrm-rack.endpoint";
import { PhrmRackModel } from './phrm-rack.model';
import { PHRMMapItemToRack } from './Phrm_Map_ItemToRack';

@Injectable()
export class PhrmRackService {

    constructor(public phrmRackEndpoint: PhrmRackEndPoint) {

    }

    public GetRackList() {
        return this.phrmRackEndpoint.GetRackList()
            ;
    }

    public AddRack(CurrentRack: PhrmRackModel) {
        return this.phrmRackEndpoint.AddRack(CurrentRack)
            ;
    }
    public AddRackItem(LatestRack: PhrmRackModel) {
        return this.phrmRackEndpoint.AddRackItem(LatestRack).map(res =>{return res});
    }

    public UpdateRack(id: number,CurrentRack: PhrmRackModel) {
        return this.phrmRackEndpoint.UpdateRack(id, CurrentRack)
            ;
    }

    public GetAllRackList() {
        return this.phrmRackEndpoint.GetAllRack()
            .map(res => {
                return res;
            });
    }

    public GetRack(id: number) {
        return this.phrmRackEndpoint.GetRack(id)
            ;
    }

    public GetDrugList(rackId,storeid) {
        return this.phrmRackEndpoint.GetDrugList(rackId,storeid)
            .map(res => {
                return res;
            });
    }
}