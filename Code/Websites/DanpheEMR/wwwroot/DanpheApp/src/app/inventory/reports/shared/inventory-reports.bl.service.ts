import { Injectable } from '@angular/core';
import { DetailStockLedger } from '../../shared/detail-stock-ledger.model';
import { ConsumableStockModel } from './consumable-stock.model';

import { InventoryReportsDLService } from './inventory-reports.dl.service';

@Injectable()
export class InventoryReportsBLService {
  //public PurchaseOrderItems: PurchaseOrderItems = null; 

  constructor(public inventoryDLService: InventoryReportsDLService) {

  }

  public GetAllVendorList() {
    return this.inventoryDLService.GetAllVendorList()
      ;
  }

  public GetAllItemsList() {
    return this.inventoryDLService.GetAllItemsList()
      ;
  }

  public GetAllStoreList() {
    return this.inventoryDLService.GetAllStoreList()
      ;
  }

  public GetSupplierWiseStockReportList(data) {
    return this.inventoryDLService.GetSupplierWiseStockReportList(data)
      ;
  }

  public ShowStockLevelReportData(ItemName) {
    return this.inventoryDLService.GetStockLevelReportData(ItemName);

  }

  public ShowStockLevelReportDataByItemId(selectedIds) {
    return this.inventoryDLService.GetStockLevelReportDataByItemId(selectedIds);

  }

  public ShowWriteOffReport(ItemId) {
    return this.inventoryDLService.GetWriteOffReport(ItemId);

  }

  public ShowReturnToVendor(VendorId) {
    return this.inventoryDLService.GetReturnToVendorReport(VendorId);

  }

  public ShowDailyItemDispatch(FromDate, ToDate, StoreId) {
    return this.inventoryDLService.GetDailyItemDispatchReportData(FromDate, ToDate, StoreId);
  }
  public ShowPurchaseOrder(CurrentPurchaseOrder, StoreId) {
    return this.inventoryDLService.GetPurchaseOrderReportData(CurrentPurchaseOrder, StoreId);
  }

  public ShowInventorySummary(FromDate, ToDate, fiscalYearId, storeId) {
    return this.inventoryDLService.GetInventorySummaryReportData(FromDate, ToDate, fiscalYearId, storeId);
  }

  public ShowInvValuation() {
    return this.inventoryDLService.GetInventoryValuationData();
  }
  public ShowItemmgmtReport() {
    return this.inventoryDLService.GetItemMgmtReport();
  }
  public ShowComporisonReports() {
    return this.inventoryDLService.GetComparisonReport();
  }
  public PurchaseItemsReport(FromDate, ToDate, fiscalYearId, ItemId) {
    return this.inventoryDLService.PurchaseItemsReport(FromDate, ToDate, fiscalYearId, ItemId);
  }
  public ShowPurchaseReports() {
    return this.inventoryDLService.GetPurchaseReports();
  }
  public ShowCancelledPOGRReport(CurrentCancelledPOGR) {
    return this.inventoryDLService.GetCancelledPOGRReport(CurrentCancelledPOGR);
  }
  public ShowGREvaluationReport(CurrentCancelledPOGR) {
    return this.inventoryDLService.GetGREvaluationReport(CurrentCancelledPOGR);
  }

  public ShowFixedAssets(CurrentFixedAssets) {
    return this.inventoryDLService.GetFixedAssetsReportData(CurrentFixedAssets);
  }

  public ShowFixedAssetsMovement(CurrentFixedAssets) {
    return this.inventoryDLService.GetFixedAssetsMovementReportData(CurrentFixedAssets);
  }

  public ShowDetailStockLedger(stockLedger: DetailStockLedger, selectedStoreId: number) {
    return this.inventoryDLService.GetShowDetailStockLedgerReportData(stockLedger, selectedStoreId);
  }
  public ConsumableStockLedger(stockLedger: ConsumableStockModel, selectedStoreId: number, fiscalYearId: number) {
    return this.inventoryDLService.GetShowConsumableStockLedgerReportData(stockLedger, selectedStoreId, fiscalYearId);
  }

  public CapitalStockLedger(stockLedger: ConsumableStockModel, selectedStoreId: number, fiscalYearId: number) {
    return this.inventoryDLService.GetShowCapitalStockLedgerReportData(stockLedger, selectedStoreId, fiscalYearId);
  }
  public IssuedItemListReport(FromDate: any, ToDate: any, FiscalYearId: number, ItemId: number, SubStoreId: number, MainStoreId: number, EmployeeId: number, SubCategoryId: number) {
    return this.inventoryDLService.GetIssuedItemListReportDate(FromDate, ToDate, FiscalYearId, ItemId, SubStoreId, MainStoreId, EmployeeId, SubCategoryId);
  }
  public GetOpeningStockValuationReport(tillDate: any) {
    return this.inventoryDLService.GetOpeningStockValuationReportData(tillDate);
  }

  public ShowApprovedMaterialStockRegister(CurrentApprovedMaterialStockRegister) {
    return this.inventoryDLService.GetApprovedMaterialStockRegisterReportData(CurrentApprovedMaterialStockRegister);
  }

  public GetAllFiscalYears() {
    return this.inventoryDLService.GetAllFiscalYears()
      ;
  }
  public GetCurrentFiscalYear() {
    return this.inventoryDLService.GetCurrentFiscalYear()
      ;
  }
  public showVendorTrasactionDetails(fiscalYear, VendorId) {
    return this.inventoryDLService.showVendorTrasactionDetails(fiscalYear, VendorId);
  }
  public showVendorTrasactionData(fiscalYear, VendorId) {
    return this.inventoryDLService.showVendorTrasactionData(fiscalYear, VendorId);
  }
  public showSubstoreStockReport(StoreId, ItemId) {
    return this.inventoryDLService.showSubstoreStockReport(StoreId, ItemId);
  }
  public LoadInventoryStores() {
    return this.inventoryDLService.LoadInventoryStores()
      ;
  }
  public GetItemDetailsByIds(selectedIds, itemId) {
    return this.inventoryDLService.GetItemDetailsByIds(selectedIds, itemId)
      ;
  }
  public GetPurchaseSummaryReport(fromDate, toDate, vendorId) {
    return this.inventoryDLService.GetPurchaseSummaryReport(fromDate, toDate, vendorId)
      ;
  }

  public GetItem() {
    return this.inventoryDLService.GetItem()
      ;
  }

  public GetReturnToSupplierReport(obj) {
    return this.inventoryDLService.GetReturnToSupplierReport(obj)
      ;
  }
  ////Get: Get Expiry Item Report Data
  public GetExpiryItemReport(itemId: number, storeId: number, fromDate, toDate) {
    return this.inventoryDLService.GetExpiryItemReport(itemId, storeId, fromDate, toDate)
      ;
  }
  public GetSupplierInformationReportList() {
    try {
      return this.inventoryDLService.GetSupplierInformationReportList()
        ;
    }
    catch (ex) {
      throw ex;
    }

  }
  GetInventoryList() {
    return this.inventoryDLService.GetInventoryList()
      ;
  }
  GetSubstoreDispatchedAndConsumptionReport(StoreId, ItemId, SubCategoryId, fromDate, toDate) {
    return this.inventoryDLService.GetSubstoreDispatchedAndConsumptionReport(StoreId, ItemId, SubCategoryId, fromDate, toDate);
  }
  public GetExpirableStockReportData(FromDate, ToDate, FiscalYearId, ItemId) {
    return this.inventoryDLService.GetExpirableStockReportData(FromDate, ToDate, FiscalYearId, ItemId);
  }
  GetSubstoreWiseSummaryReport(StoreId, fromDate, toDate, FiscalYearId) {
    return this.inventoryDLService.GetSubstoreWiseSummaryReport(StoreId, fromDate, toDate, FiscalYearId);
  }
  public GetAllSubStores() {
    return this.inventoryDLService.GetAllInventoryStores()
      .map((responseData) => {
        return responseData;
      });
  }
}
