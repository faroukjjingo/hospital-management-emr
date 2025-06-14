import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ReturnToVendorModel } from '../../inventory/return-to-vendor/return-to-vendor.model';
import { InventoryDLService } from '../../inventory/shared/inventory.dl.service';
import { PurchaseOrderDraft } from '../purchase-order/purchase-order-draft.model';
import { PurchaseOrder } from '../purchase-order/purchase-order.model';

@Injectable()
export class ProcurementBLService {
  constructor(public inventoryDLService: InventoryDLService) { }

  //get item list
  public GetItemList(storeId: number) {
    return this.inventoryDLService.GetItemListByStoreId(storeId)
      .map((responseData) => {
        return responseData;
      });
  }
  GetPORequisition(fromDate, toDate) {
    return this.inventoryDLService.GetPORequisition(fromDate, toDate)
      ;
  }
  //GET PO requisition
  GetPurchaseRequestById(RequisitionId: number) {
    return this.inventoryDLService.GetPurchaseRequestById(RequisitionId)
      ;
  }
  public GetPurchaseOrderList(fromDate, toDate, Status: string) {
    return this.inventoryDLService.GetPurchaseOrderList(fromDate, toDate, Status)
      .map((responseData) => {
        return responseData;
      });
  }

  //GET: get purchase order details by purchase order ID
  public GetPOItemsByPOId(PurchaseOrderId) {
    return this.inventoryDLService.GetPOItemsByPOId(PurchaseOrderId)
      ;
  }

  getQuotationDetailsToAddPO(quotationId) {
    return this.inventoryDLService.getQuotationDetailsToAddPO(quotationId)
      ;
  }

  public GetAllPOVerifiers() {
    return this.inventoryDLService.GetAllPOVerifiers()
      .map(res => { return res; });
  }
  //get terms list
  public GetTermsList(TermsApplicationId: number) {
    return this.inventoryDLService.GetTermsList(TermsApplicationId)
      .map((responseData) => {
        return responseData;
      });
  }
  //GET: External : get all goods receipt list
  public GetGoodsReceiptList(fromDate, toDate) {
    return this.inventoryDLService.GetGoodsReceiptList(fromDate, toDate)
      ;
  }
  public getGoodsReceiptMasterList() {
    return this.inventoryDLService.getGoodsReceiptMasterList()
      ;
  }
  //GET: External : get all goods receipt items by goodsReceiptId
  public GetGRItemsByGRId(GoodsReceiptId) {
    return this.inventoryDLService.GetGRItemsByGRId(GoodsReceiptId)
      ;
  }
  //GET: External : get all goods receipt items by goodsReceiptId
  public GetProcurementGRView(GoodsReceiptId) {
    return this.inventoryDLService.GetProcurementGRView(GoodsReceiptId)
      ;
  }
  //GET:Get purchase order list by Purchase Order ID which is active or partialy completed
  public GetPurchaseOrderItemsByPOId(purchaseOrderId: number) {
    return this.inventoryDLService.GetPurchaseOrderItemsByPOId(purchaseOrderId)
      .map((responseData) => {
        return responseData;
      });
  }
  //GET: External : get all  fixed asset donation list
  public GetFixedAssetDonationList() {
    return this.inventoryDLService.GetFixedAssetDonationList()
      ;
  }

  //GET: Getting the return items list
  public GetVendorItemReturnList() {
    return this.inventoryDLService.GetVendorItemReturnList()
      
  }
  //get creditNoteno
  public GetCreditNoteNum() {
    return this.inventoryDLService.GetCreditNoteNum()
      .map((responseData) => {
        return responseData;
      });
  }
  //GET:FiscalYears
  public GetAllFiscalYears() {
    return this.inventoryDLService.GetAllFiscalYears()
      ;
  }
  public GetVendorsDetailsList() {
    return this.inventoryDLService.GetVendorsDetailsList()
      ;
  }
  public GetEachVendorDetailsList(VendorId) {
    return this.inventoryDLService.GetEachVendorDetailsList(VendorId)
      ;
  }
  //POST: posting the purchase order cancel
  PostPurchaseOrderCancelDetail(selectedPoId, cancelationRemarks) {
    try {
      return this.inventoryDLService.PostPurchaseOrderCancelDetail(selectedPoId, cancelationRemarks)
        ;
    } catch (ex) {
      throw ex;
    }
  }
  //POST:posting the requisitions in requistion table..(tests-order.component)
  PostToPurchaseOrder(PO: PurchaseOrder) {

    //omiting the validators during post because it causes cyclic error during serialization in server side.
    //omit validator from inputPO (this will give us object)
    let newPO: any = _.omit(PO, ['PurchaseOrderValidator']);
    let newPoItems = PO.PurchaseOrderItems.map(item => {
      return _.omit(item, ['PurchaseOrderItemValidator']);
    });
    //assign items to above 'newPO' with exact same propertyname : 'PurchaseOrderItems'
    newPO.PurchaseOrderItems = newPoItems.filter(a => a.ItemId > 0); // also filter any items that does not have itemId, esp. last item

    let data = JSON.stringify(newPO);
    return this.inventoryDLService.PostToPurchaseOrder(data)
      
  }
  //POST: posting the  goods receipt cancel
  PostGoodsReceiptCancelDetail(selectedGRId, cancelationRemarks) {
    try {
      return this.inventoryDLService.PostGoodsReceiptCancelDetail(selectedGRId, cancelationRemarks)
        ;
    } catch (ex) {
      throw ex;
    }
  }

  //Save Return to vendor Item
  public PostToReturnToVendor(returnToVendor: ReturnToVendorModel) {
    let temp: any = returnToVendor.itemsToReturn.map(item => {
      return _.omit(item, ['ReturnItemValidator', 'Item', 'batchNoList']);
    });
    returnToVendor.itemsToReturn = temp;

    let data = JSON.stringify(returnToVendor);
    return this.inventoryDLService.PostToReturnToVendor(data)
      
  }


  //PUT
  UpdatePurchaseOrder(PO: PurchaseOrder) {

    //omiting the validators during post because it causes cyclic error during serialization in server side.
    //omit validator from inputPO (this will give us object)
    let newPO: any = _.omit(PO, ['PurchaseOrderValidator']);
    let newPoItems = PO.PurchaseOrderItems.map(item => {
      return _.omit(item, ['PurchaseOrderItemValidator']);
    });
    //assign items to above 'newPO' with exact same propertyname : 'PurchaseOrderItems'
    newPO.PurchaseOrderItems = newPoItems.filter(a => a.ItemId > 0); // also filter any items that does not have itemId, esp. last item

    let data = JSON.stringify(newPO);
    return this.inventoryDLService.UpdatePurchaseOrder(data)
      
  }
  UpdatePORequisitionAfterPOCreation(RequisitionId: number) {
    return this.inventoryDLService.UpdatePORequisitionAfterPOCreation(RequisitionId)
      
  }
  PostToPurchaseOrderDraft(PODraft: PurchaseOrderDraft) {
    var PODraftData = _.omit(PODraft, ['PurchaseOrderDraftValidator']);
    let newPoItems = PODraft.PurchaseOrderDraftItems.map(item => {
      return _.omit(item, ['PurchaseOrderDraftItemValidator']);
    });
    PODraftData.PurchaseOrderDraftItems = newPoItems;
    let PODraftDetail = JSON.stringify(PODraftData);
    return this.inventoryDLService.PostToPurchaseOrderDraft(PODraftDetail)
      
  }
  UpdatePurchaseOrderDraft(PODraft: PurchaseOrderDraft) {
    var PODraftData = _.omit(PODraft, ['PurchaseOrderDraftValidator']);
    let newPoItems = PODraft.PurchaseOrderDraftItems.map(item => {
      return _.omit(item, ['PurchaseOrderDraftItemValidator']);
    });
    PODraftData.PurchaseOrderDraftItems = newPoItems;
    return this.inventoryDLService.UpdatePurchaseOrderDraft(PODraftData)
      

  }
  public GetPurchaseOrderDraftList(status: string) {
    return this.inventoryDLService.GetPurchaseOrderDraftList(status)
      .map((responseData) => {
        return responseData;
      });
  }
  PostDiscardPurchaseOrderDraft(purchaseOrderDraftId, discardRemarks) {
    try {
      return this.inventoryDLService.PostDiscardPurchaseOrderDraft(purchaseOrderDraftId, discardRemarks)
        ;
    } catch (ex) {
      throw ex;
    }
  }
}
