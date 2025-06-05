import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Requisition } from '../../inventory/shared/requisition.model';
import { WardInventoryReturnModel } from '../inventory-wardsupply/return/ward-inventory-return.model';
import { PHRMSubStoreRequisition } from './phrm-substore-requisition.model';
import { WARDReportsModel } from './ward-report.model';
import { WardStockModel } from './ward-stock.model';
import { WardSupplyAssetRequisitionModel } from './wardsupply-asset-requisition.model';
import { WardSupplyAssetReturnModel } from './wardsupply-asset-return.model';
import { WardSupplyDLService } from './wardsupply.dl.service';

// Generic API response interface
interface ApiResponse<T = any> {
  Results: T;
  Status: string;
  ErrorMessage?: string;
}

@Injectable({
  providedIn: 'root' // Angular 18: tree-shakable service
})
export class WardSupplyBLService {

  constructor(private wardSplDLservice: WardSupplyDLService) {}

  // GET: Stock Details
  public GetAllWardItemsStockDetailsList(storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetAllWardItemsStockDetailsList(storeId);
  }

  public GetAvailableWardItemsStockDetailsList(storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetAvailableWardItemsStockDetailsList(storeId);
  }

  // GET: Requisition List
  public GetSubstoreRequistionList(fromDate: string, toDate: string, storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetSubstoreRequistionList(fromDate, toDate, storeId);
  }

  public GetInventoryStockByStoreId(storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventoryStockByStoreId(storeId);
  }

  public GetFixedAssetStockBySubStoreId(substoreId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetFixedAssetStockBySubStoreId(substoreId);
  }

  public GetInventorySubStoreItemsByStoreIdForReturn(substoreId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventorySubStoreItemsByStoreIdForReturn(substoreId);
  }

  public GetSubstoreAssetRequistionItemsById(reqId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetSubstoreAssetRequistionItemsById(reqId);
  }

  public GetWardInventoryReturnItemsByReturnId(returnId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardInventoryReturnItemsByReturnId(returnId);
  }

  public GetActiveSubStoreList(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetActiveSubStoreList();
  }

  public GetWardList(currentStoreId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.WardList(currentStoreId);
  }

  public GetAllComsumptionListDetails(wardId: number, storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetAllComsumptionListDetails(wardId, storeId);
  }

  public GetInventoryConsumptionListDetails(storeId: number, fromDate: string, toDate: string): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventoryComsumptionListDetails(storeId, fromDate, toDate);
  }

  public GetWardRequisitionList(status: string, storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardRequisitionList(status, storeId);
  }

  public GetWardReqItemList(requisitionID: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardReqItemList(requisitionID);
  }

  public GetDepartments(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetDepartments();
  }

  public GetConsumptionItemList(patientId: number, wardId: number, storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetConsumptionItemList(patientId, wardId, storeId);
  }

  public GetInventoryConsumptionItemList(userName: string, storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventoryConsumptionItemList(userName, storeId);
  }

  public GetInternalConsumptionList(storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInternalConsumptionList(storeId);
  }

  public GetInternalConsumptionItemList(consumptionId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInternalConsumptionItemList(consumptionId);
  }

  public GetInternalConsumptionDetails(consumptionId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInternalConsumptionDetails(consumptionId);
  }

  public GetItemTypeListWithItems(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetItemTypeListWithItems();
  }

  public GetPatients(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetPatients();
  }

  public GetDispatchListForItemReceive(requisitionId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetDispatchListForItemReceive(requisitionId);
  }

  public GetStockItemsReport(itemId: number, storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetStockItemsReport(itemId, storeId);
  }

  public GetWardRequsitionReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardRequsitionReport(wardReports);
  }

  public GetWardBreakageReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardBreakageReport(wardReports);
  }

  public GetWardConsumptionReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardConsumptionReport(wardReports);
  }

  public GetWardInernalConsumptionReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardInernalConsumptionReport(wardReports);
  }

  public GetWardTransferReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardTransferReport(wardReports);
  }

  public GetRequisitionDispatchReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetRequisitionDispatchReport(wardReports);
  }

  public GetTransferReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetTransferReport(wardReports);
  }

  public GetConsumptionReport(wardReports: WARDReportsModel): Observable<ApiResponse> {
    return this.wardSplDLservice.GetConsumptionReport(wardReports);
  }

  public GetInventoryList(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventoryList();
  }

  public GetDispatchDetails(requisitionId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetDispatchDetails(requisitionId);
  }

  // POST Methods
  public PostConsumptionData(data: any[]): Observable<ApiResponse> {
    const temp = data.map(a => _.omit(a, ['ConsumptionValidator', 'SelectedItem', 'selectedPatient']));
    return this.wardSplDLservice.PostConsumptionData(temp);
  }

  public PostInternalConsumptionData(data: any): Observable<ApiResponse> {
    const newConsumption = _.omit(data, ['InternalConsumptionValidator', 'SelectedItem']);
    newConsumption.WardInternalConsumptionItemsList = newConsumption.WardInternalConsumptionItemsList.map(a =>
      _.omit(a, ['InternalConsumptionItemsValidator', 'SelectedItem'])
    );
    return this.wardSplDLservice.PostInternalConsumptionData(newConsumption);
  }

  public PostInventoryConsumptionData(data: any[]): Observable<ApiResponse> {
    const temp = data.map(a => _.omit(a, ['ConsumptionValidator', 'SelectedItem', 'selectedPatient']));
    return this.wardSplDLservice.PostInventoryConsumptionData(temp);
  }

  public PostManagedStockDetails(selectedData: any, receivedBy: string): Observable<ApiResponse> {
    const newItem = _.omit(selectedData, ['StockManageValidator']);
    return this.wardSplDLservice.PostManagedStockDetails(JSON.stringify(newItem), receivedBy);
  }

  public PostInventoryStockTransfer(selectedData: any): Observable<ApiResponse> {
    const newItem = _.omit(selectedData, ['StockManageValidator']);
    return this.wardSplDLservice.PostInventoryStockTransfer(JSON.stringify(newItem));
  }

  public PostBackToInventory(selectedData: any): Observable<ApiResponse> {
    const newItem = _.omit(selectedData, ['StockManageValidator']);
    return this.wardSplDLservice.PostBackToInventory(JSON.stringify(newItem));
  }

  public PostBreakageStockDetails(selectedData: any): Observable<ApiResponse> {
    const newItem = _.omit(selectedData, ['StockManageValidator']);
    return this.wardSplDLservice.PostBreakageStockDetails(JSON.stringify(newItem));
  }

  public GetCapitalGoodsItemList(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetCapitalGoodsItemList();
  }

  public PostToAssetRequisition(requisition: WardSupplyAssetRequisitionModel): Observable<ApiResponse> {
    const newRequ = _.omit(requisition, ['RequisitionValidator']);
    newRequ.RequisitionItemsList = requisition.RequisitionItemsList.map(item =>
      _.omit(item, ['RequisitionItemValidator'])
    );
    return this.wardSplDLservice.PostToAssetRequisition(JSON.stringify(newRequ));
  }

  public PostToAssetReturn(returnData: WardSupplyAssetReturnModel): Observable<ApiResponse> {
    const newReturn = _.omit(returnData, ['ReturnValidator']);
    newReturn.ReturnItemsList = returnData.ReturnItemsList.map(item =>
      _.omit(item, ['ReturnItemValidator'])
    );
    return this.wardSplDLservice.PostToAssetReturn(JSON.stringify(newReturn));
  }

  public PostToWardInventoryReturn(returnData: WardInventoryReturnModel): Observable<ApiResponse> {
    const newReturn = _.omit(returnData, ['ReturnValidator']);
    newReturn.ReturnItemsList = returnData.ReturnItemsList.map(item =>
      _.omit(item, ['ReturnItemValidator'])
    );
    return this.wardSplDLservice.PostToWardInventoryReturn(JSON.stringify(newReturn));
  }

  public GetSubstoreAssetRequistionList(fromDate: string, toDate: string, subStoreId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetSubstoreAssetRequistionList(fromDate, toDate, subStoreId);
  }

  public GetSubstoreAssetReturnList(fromDate: string, toDate: string, subStoreId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetSubstoreAssetReturnList(fromDate, toDate, subStoreId);
  }

  public GetWardInventoryReturnList(fromDate: string, toDate: string, subStoreId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetWardInventoryReturnList(fromDate, toDate, subStoreId);
  }

  public PostReturnStock(stockItems: Array<WardStockModel>, receivedBy: string): Observable<ApiResponse> {
    const stockItemsCleaned = stockItems.map(item =>
      _.omit(item, ['StockManageValidator', 'positiveNumberValdiator'])
    );
    return this.wardSplDLservice.PostReturnStock(JSON.stringify(stockItemsCleaned), receivedBy);
  }

  public PutConsumptionData(data: any[]): Observable<ApiResponse> {
    const temp = data.map(a => _.omit(a, ['ConsumptionValidator', 'SelectedItem', 'selectedPatient']));
    return this.wardSplDLservice.PutConsumptionData(temp);
  }

  public PutInternalConsumptionData(data: any[]): Observable<ApiResponse> {
    const temp = data.map(a => _.omit(a, ['InternalConsumptionValidator', 'SelectedItem']));
    return this.wardSplDLservice.PutInternalConsumptionData(temp);
  }

  public PutUpdateDispatchedItemsReceiveStatus(dispatchId: number, receivedRemarks: string): Observable<ApiResponse> {
    return this.wardSplDLservice.PutUpdateDispatchedItemsReceiveStatus(dispatchId, JSON.stringify(receivedRemarks));
  }

  public PutUpdateRequisition(requisition: Requisition): Observable<ApiResponse> {
    const newReq = _.omit(requisition, ['RequisitionValidator']);
    newReq.RequisitionItems = requisition.RequisitionItems.map(item =>
      _.omit(item, ['RequisitionItemValidator'])
    );
    return this.wardSplDLservice.PutUpdateRequisition(JSON.stringify(newReq));
  }

  public PutReturnData(data: any): Observable<ApiResponse> {
    return this.wardSplDLservice.PostReturnData(data);
  }

  public SendStockToCssd(fixedAssetStockId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.PutSendStockToCssd(fixedAssetStockId);
  }

  public GetAllPatients(searchTxt: string): Observable<ApiResponse> {
    return this.wardSplDLservice.GetAllPatients(searchTxt);
  }

  public PostInventoryPatConsumptionData(data: any): Observable<ApiResponse> {
    const temp = data.ConsumptionList.map(a =>
      _.omit(a, ['ConsumptionValidator', 'SelectedItem', 'selectedPatient'])
    );
    data.ConsumptionList = temp;
    return this.wardSplDLservice.PostInventoryPatConsumptionData(data);
  }

  public GetInventoryItemsForPatConsumptionByStoreId(storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventoryItemsForPatConsumptionByStoreId(storeId);
  }

  public GetInventoryPatientConsumptionReceiptList(storeId: number, fromDate: string, toDate: string): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventoryPatientComsumptionReceiptList(storeId, fromDate, toDate);
  }

  public GetInventoryPatConsumptionItemListById(receiptId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetInventoryPatConsumptionItemListById(receiptId);
  }

  public GetFixedAssetDispatchListForItemReceive(requisitionId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetFixedAssetDispatchListForItemReceive(requisitionId);
  }

  public UpdateReconciledStockFromExcelFile(changedStockList: Array<WardStockModel>): Observable<ApiResponse> {
    return this.wardSplDLservice.UpdateReconciledStockFromExcelFile(JSON.stringify(changedStockList));
  }

  public ExportStocksForReconciliationToExcel(storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.ExportStocksForReconciliationToExcel(storeId);
  }

  public GetItemSubCategory(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetItemCategory();
  }

  public AddRequisition(requisition: PHRMSubStoreRequisition): Observable<ApiResponse> {
    const newRequ = _.omit(requisition, ['RequisitionValidator']);
    newRequ.RequisitionItems = requisition.RequisitionItems.map(item =>
      _.omit(item, ['RequisitionItemValidator'])
    );
    return this.wardSplDLservice.AddRequisition(newRequ);
  }

  public GetRequisitionDetailView(requisitionId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetRequisitionView(requisitionId);
  }

  public CancelRequisitionItem(requisition: any): Observable<ApiResponse> {
    return this.wardSplDLservice.CancelRequisitionItems(requisition);
  }

  public GetDispatchedItemToReceive(requisitionId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetDispatchedItemToReceive(requisitionId);
  }

  public ReceiveDispatchedItem(dispatchId: number, remarks: string): Observable<ApiResponse> {
    return this.wardSplDLservice.ReceiveDispatchedItem(dispatchId, remarks);
  }

  public GetPHRMSubStoreAvailableStockByStoreId(storeId: number): Observable<ApiResponse> {
    return this.wardSplDLservice.GetPHRMSubStoreAvailableStockByStoreId(storeId);
  }

  public GetVerifiers(): Observable<ApiResponse> {
    return this.wardSplDLservice.GetVerifiers();
  }
}