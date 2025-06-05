import { Role } from "../../../security/shared/role.model";
import { User } from "../../../security/shared/user.model";
import { RolePermissionMap } from "../../../security/shared/role-permission-map.model";
import { UserRoleMap } from "../../../security/shared/user-role-map.model";
import { Injectable, Directive } from '@angular/core';
import { ItemModel } from "../shared/item.model";
import { ItemDLService } from '../shared/item.dl.service'

import * as moment from 'moment/moment';
import * as _ from 'lodash';
@Injectable()
export class ItemBLService {

    constructor(public itemDLService: ItemDLService) {
    }

    //Get
    public GetItemList() {
        return this.itemDLService.GetItemList()
            ;
    }
    public GetItem() {
        return this.itemDLService.GetItem()
            ;
    }
    
    public GetAccountHead() {
        return this.itemDLService.GetAccountHead()
            ;
    }
    public GetPackagingType() {
        return this.itemDLService.GetPackagingType()
            ;
    }
    public GetUnitOfMeasurement() {
        return this.itemDLService.GetUnitOfMeasurement()
            ;
    }
    public GetItemCategory() {
        return this.itemDLService.GetItemCategory()
            ;
    }

    //Post
    public AddItem(CurrentItem: ItemModel) {
        //omiting the appointmentvalidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentItem, ['ItemValidator']);
        return this.itemDLService.PostItem(temp)
            ;
    }

    //Put

    public UpdateItem(Item: ItemModel) {
        //to fix serializaiton problem in server side
        if (Item.CreatedOn)
            Item.CreatedOn = moment(Item.CreatedOn).format('YYYY-MM-DD HH:mm');

        var temp = _.omit(Item, ['ItemValidator']);
        return this.itemDLService.PutItem(temp)
            ;
    }

}