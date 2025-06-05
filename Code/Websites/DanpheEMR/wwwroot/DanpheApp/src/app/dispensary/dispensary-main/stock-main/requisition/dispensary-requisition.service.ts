import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { PHRMStoreRequisition } from '../../../../pharmacy/shared/phrm-store-requisition.model';
import { DispensaryRequisitionEndpoint } from './dispensary-requisition-endpoint';

@Injectable()
export class DispensaryRequisitionService {

  private _requisitionId: number;
  get RequisitionId(): number {
    return this._requisitionId;
  }
  set RequisitionId(reqId: number) {
    this._requisitionId = reqId;
  }
  constructor(public dispensaryRequisitionEndpoint: DispensaryRequisitionEndpoint) { }

  GetAllRequisitionList(fromDate: string, toDate: string) {
    return this.dispensaryRequisitionEndpoint.GetAllRequisitionList(fromDate, toDate);
  }
  GetAllRequisitionListByDispensaryId(dispensaryId: number, fromDate: string, toDate: string) {
    return this.dispensaryRequisitionEndpoint.GetAllRequisitionListByDispensaryId(dispensaryId, fromDate, toDate);
  }
  GetItemsForRequisition(isInsurance: boolean = false) {
    return this.dispensaryRequisitionEndpoint.GetItemsForRequisition(isInsurance)
      ;
  }
  GetRequisitionView(requisitionId) {
    return this.dispensaryRequisitionEndpoint.GetRequisitionView(requisitionId);
  }
  GetRequisitionDispatchToReceive(requisitionId: number) {
    return this.dispensaryRequisitionEndpoint.GetRequisitionDispatchToReceive(requisitionId);
  }
  AddRequisition(requisition: PHRMStoreRequisition) {
    let newRequ: any = _.omit(requisition, ['RequisitionValidator']);

    let newRequItems = requisition.RequisitionItems.map(item => {
      return _.omit(item, ['RequisitionItemValidator']);
    });


    newRequ.RequisitionItems = newRequItems;
    let data = JSON.stringify(newRequ);
    return this.dispensaryRequisitionEndpoint.AddRequisition(data)
      
  }

  ReceiveDispatchedItems(dispatchId: number, receivedRemarks: string) {
    let data = JSON.stringify(receivedRemarks);
    return this.dispensaryRequisitionEndpoint.ReceiveDispatchedItems(dispatchId, data)
      
  }

  ApproveRequisition(requisitionId: number) {
    return this.dispensaryRequisitionEndpoint.ApproveRequisition(requisitionId)
  }
  CancelRequisitionItems(cancelRequisitionItemDto: any) {
    let data = JSON.stringify(cancelRequisitionItemDto)
    return this.dispensaryRequisitionEndpoint.CancelRequisitionItems(data)
  }
}
