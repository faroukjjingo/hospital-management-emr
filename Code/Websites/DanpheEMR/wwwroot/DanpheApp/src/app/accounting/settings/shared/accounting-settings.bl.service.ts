import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MedicalCareType } from '../../../insurance/medicare/shared/medicare-member.model';
import { BankReconciliationCategory } from '../../bank-reconciliation/reconcile-bank-transactions/bank-reconciliation.model';
import { SubLedgerForMakePayment } from '../../transactions/shared/DTOs/sub-ledger-for-payment.dto';
import { AccountingSettingsDLService } from '../shared/accounting-settings.dl.service';
import { CostCenterItemModel } from "../shared/cost-center-item.model";
import { FiscalYearModel } from "../shared/fiscalyear.model";
import { ItemModel } from "../shared/item.model";
import { ledgerGroupCategoryModel } from "../shared/ledger-group-category.model";
import { LedgerModel } from "../shared/ledger.model";
import { ledgerGroupModel } from "../shared/ledgerGroup.model";
import { ChartofAccountModel } from './chart-of-account.model';
import { CostCenterModel } from './cost-center.model';
import { SectionModel } from './section.model';
import { SubLedgerModel } from './sub-ledger.model';
import { VoucherModel } from './voucher.model';
import { VoucherHeadModel } from './voucherhead.model';

@Injectable()
export class AccountingSettingsBLService {

    constructor(public accountingSettingsDLService: AccountingSettingsDLService) {
    }
    //#region Ledger Settings Calls
    //Get
    public GetLedgerList() {
        return this.accountingSettingsDLService.GetLedgersList()
            ;
    }

    public GetSubLedger() {
        return this.accountingSettingsDLService.GetSubLedger()
            ;
    }

    public AddSubLedger(subLedger: Array<SubLedgerModel>) {
        let modifed = subLedger.map(led => {
            return _.omit(led, ['subLedgerValidator']);
        });
        let temp = JSON.stringify(modifed);
        return this.accountingSettingsDLService.AddSubLedger(temp)
            ;
    }

    public UpdateSubLedger(subLedger: SubLedgerModel) {
        return this.accountingSettingsDLService.UpdateSubLedger(subLedger)
            ;
    }

    public ActivateDeactiveSubLedger(subLedger: SubLedgerModel) {
        return this.accountingSettingsDLService.ActivateDeactiveSubLedger(subLedger)
            ;
    }

    public getPrimaryGroupList() {
        return this.accountingSettingsDLService.getPrimaryGroupList()
            ;
    }
    public GetLedgers() {
        return this.accountingSettingsDLService.GetLedgers()
            ;
    }
    public GetFiscalYearList() {
        return this.accountingSettingsDLService.GetFiscalYearList()
            ;
    }
    public GetCostCenterItemList() {
        return this.accountingSettingsDLService.GetCostCenterItemList()
            ;
    }

    //get pharmacy supplier
    GetPharmacySupplier() {
        try {
            return this.accountingSettingsDLService.GetPharmacySupplier()
                ;
        } catch (ex) {
            throw ex;
        }
    }

    //
    GetEmployeeList() {
        try {
            return this.accountingSettingsDLService.GetEmployeeList()
                ;
        } catch (ex) {
            throw ex;
        }
    }
    GetCreditOrgList() {
        try {
            return this.accountingSettingsDLService.GetCreditOrgList()
                ;
        } catch (ex) {
            throw ex;
        }
    }

    GetPaymentModes() {
        try {
            return this.accountingSettingsDLService.GetPaymentModes()
                ;
        } catch (ex) {
            throw ex;
        }
    }

    GetBankReconciliationCategory() {
        try {
            return this.accountingSettingsDLService.GetBankReconciliationCategory()
                ;
        } catch (ex) {
            throw ex;
        }
    }

    UpdateBankReconciliationCategory(bankReconciliation: Array<BankReconciliationCategory>) {
        let temp = _.omit(bankReconciliation, ['IsSelected']);
        return this.accountingSettingsDLService.UpdateBankReconciliationCategory(bankReconciliation)
            ;
    }

    GetInvVendorList() {
        try {
            return this.accountingSettingsDLService.GetInvVendorList()
                ;
        }
        catch (ex) {
            throw ex;
        }
    }
    //get inventory subcategory list
    GetInvSubcategoryList() {
        try {
            return this.accountingSettingsDLService.GetInvSubcategoryList()
                ;
        }
        catch (ex) {
            throw ex;
        }
    }
    GetBillingItemsList() {
        try {
            return this.accountingSettingsDLService.GetBillingItemsList()
                ;
        } catch (ex) {
            throw ex;
        }
    }

    //get fiscal year activity details 
    public getfsyearactivitydetail() {
        return this.accountingSettingsDLService.getfsyearactivitydetail()
            ;
    }
    //public GetLedgerGroupwithMultipleVoucher() {

    //    return this.accountingSettingsDLService.GetLedgerGroupwithMultipleVoucher()
    //        .map((responseData) => {
    //            return responseData;
    //        });
    //}
    //Post
    public AddLedgers(CurrentLedger: LedgerModel) {  //for Single Ledger 
        //omiting the LedgerValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentLedger, ['LedgerValidator']);
        return this.accountingSettingsDLService.PostLedgers(temp)
            ;
    }

    public AddSection(CurrentSection: SectionModel) {
        //  omiting the SectionValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentSection, ['SectionValidator']);
        return this.accountingSettingsDLService.PostSection(temp)
            ;
    }
    public AddLedgerList(CurrentLedgers: Array<LedgerModel>) { //postong Multiple Ledgers
        //omiting the LedgerValidator during post because it causes cyclic error during serialization in server side.
        var newLed: any = CurrentLedgers.map(led => {
            return _.omit(led, ['LedgerValidator']);
        });
        return this.accountingSettingsDLService.PostLedgersList(newLed)
            ;
    }
    public AddFiscalYear(fiscalyear: FiscalYearModel) {
        //omiting the FiscalYearValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(fiscalyear, ['FiscalYearValidator']);
        return this.accountingSettingsDLService.PostFiscalYear(temp)
            ;
    }
    public AddCostCenterItem(costCenterItem: CostCenterItemModel) {
        //omiting the FiscalYearValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(costCenterItem, ['CostCenterItemValidator']);
        return this.accountingSettingsDLService.PostCostCenterItem(temp)
            ;
    }
    public AddLedgersGroupCategory(currentLedgerGroupCategory: ledgerGroupCategoryModel) {
        var temp = _.omit(currentLedgerGroupCategory, ['LedgerGroupCategoryValidator']);
        return this.accountingSettingsDLService.PostLedgersGroupCategory(temp)
            ;
    }
    //Put
    public UpdateLedgerStatus(selectedLedger) {
        ////var temp = _.omit(user, ['UserProfileValidator']);
        return this.accountingSettingsDLService.PutLedgerIsActive(selectedLedger)
            ;
    }
    public UpdateFiscalYearStatus(selectedLedger) {
        ////var temp = _.omit(user, ['UserProfileValidator']);
        return this.accountingSettingsDLService.PutFiscalYearStatus(selectedLedger)
            ;
    }
    public PutReopenFiscalYear(selectedLedger) {
        return this.accountingSettingsDLService.PutReopenFiscalYear(selectedLedger)
            ;
    }

    public UpdateCostCenterItemStatus(selectedCostCenterItm) {
        return this.accountingSettingsDLService.PutCostCenterItemStatus(selectedCostCenterItm)
            ;
    }
    public UpdateLedgerGrpCategoryIsActive(selectedLedgerGrpCategory) {
        return this.accountingSettingsDLService.PutLedgerGrpCategoryIsActive(selectedLedgerGrpCategory)
            ;
    }
    public UpdateLedger(CurrentLedger: LedgerModel) {
        //omiting the LedgerValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentLedger, ['LedgerValidator']);
        return this.accountingSettingsDLService.PutLedger(temp)
            ;
    }
    public UpdateVoucherHead(CurrentVoucherhead: VoucherHeadModel) {
        //omiting the LedgerValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentVoucherhead, ['VoucherHeadValidator']);
        return this.accountingSettingsDLService.PutVoucherHead(temp)
            ;
    }
    //update section
    public UpdateSection(CurrentSection: SectionModel) {
        //omiting the SectionValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentSection, ['SectionValidator']);
        return this.accountingSettingsDLService.PutSection(temp)
            ;
    }
    public UpdateCOA(coa: ChartofAccountModel) {
        var temp = _.omit(coa, ['COAValidator']);
        return this.accountingSettingsDLService.PutCOA(temp)
            ;
    }
    //#endregion Ledger Settings Calls

    //#region voucher Settings Calls
    //public GetVoucherList() {
    //    return this.accountingSettingsDLService.GetVouchersList()
    //        ;
    //}
    public GetVouchers() {
        return this.accountingSettingsDLService.GetVouchers()
            ;
    }

    public GetVoucherHead() {
        return this.accountingSettingsDLService.GetVoucherHead()
            ;
    }

    public GetVoucherswithVOCMap() {
        return this.accountingSettingsDLService.GetVoucherswithVOCMap()
            ;
    }
    public GetLedgerGrpVoucherByLedgerGrpId(ledgergroupId: number) {
        return this.accountingSettingsDLService.GetLedgerGrpVoucherByLedgerGrpId(ledgergroupId)
            ;
    }
    public GetLedgerGrpCategory() {
        return this.accountingSettingsDLService.GetLedgerGrpCategory()
            ;
    }
    public GetLedgerGroupsDetails() {
        return this.accountingSettingsDLService.GetLedgerGroupsDetails()
            ;
    }

    public GetChartofAccount() {
        return this.accountingSettingsDLService.GetChartofAccount()
            ;
    }
    public getTrasferRuleData(sectionId: number) {
        return this.accountingSettingsDLService.getTrasferRuleData(sectionId)
            ;
    }

    //get provisional ledger code
    public GetProvisionalLedgerCode() {
        try {
            return this.accountingSettingsDLService.GetProvisionalLedgerCode()
                ;
        } catch (ex) {
            throw ex;
        }
    }
    //Post
    public AddVouchers(CurrentVoucher: VoucherModel) {
        //omiting the VoucherValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentVoucher, ['VoucherValidator']);
        return this.accountingSettingsDLService.PostVouchers(temp)
            ;
    }
    public AddVoucherHead(CurrentVoucherhead: VoucherHeadModel) {
        //omiting the VoucherValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentVoucherhead, ['VoucherHeadValidator']);
        return this.accountingSettingsDLService.PostVoucherHead(temp)
            ;
    }
    public PostCOA(COA: ChartofAccountModel) {
        var temp = _.omit(COA, ['COAValidator']);
        return this.accountingSettingsDLService.PostCOA(temp)
            ;
    }
    //Put


    //#endregion voucher Settings Calls


    //#region Item Settings Calls 
    //Get
    public GetItemList() {
        return this.accountingSettingsDLService.GetItemsList()
            ;
    }
    public GetItems() {
        return this.accountingSettingsDLService.GetItems()
            ;
    }

    //Post
    public AddItems(CurrentItem: ItemModel) {
        //omiting the VoucherItemValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(CurrentItem, ['ItemValidator']);
        return this.accountingSettingsDLService.PostItems(temp)
            ;
    }
    //post mapped vouchers with ledgegroup
    public PostManageVoucher(mappedLedgerGroup) {
        let data = mappedLedgerGroup.map(item => {
            return _.omit(item, ['VoucherLedgerGroupMapValidator']);
        });
        return this.accountingSettingsDLService.PostManageVoucher(data)
            ;
    }

    //Put
    public UpdateItemStatus(selectedItem) {
        ////var temp = _.omit(user, ['UserProfileValidator']);
        return this.accountingSettingsDLService.PutItemIsActive(selectedItem)
            ;
    }

    //#endregion Item Settings Calls


    //#region LedgerGroup Settings Calls 
    //Get

    public GetLedgerGroup() {
        return this.accountingSettingsDLService.GetLedgerGroup()
            ;
    }

    //Post

    public AddLedgersGroup(currentLedgerGroup: ledgerGroupModel) {
        //omiting the LedgerGroupValidator during post because it causes cyclic error during serialization in server side.

        let newRequisitionSVM: any = currentLedgerGroup;

        let newLedGRP: any = _.omit(currentLedgerGroup, ['LedgerGroupValidator']);

        newRequisitionSVM = newLedGRP;
        let data = JSON.stringify(newRequisitionSVM);
        return this.accountingSettingsDLService.PostLedgersGroup(data)
            
    }

    //Put

    public UpdateLedgerGrpIsActive(selectedLedgerGrp) {
        return this.accountingSettingsDLService.PutLedgerGrpIsActive(selectedLedgerGrp)
            ;
    }


    UpdateLedgersGroup(currentLedgerGroup) {
        //omiting the LedgerGroupValidator 
        let temp: any = _.omit(currentLedgerGroup, ['LedgerGroupValidator']);

        return this.accountingSettingsDLService.PutLedgersGroup(temp)
            
    }

    public UpdateTransferRuleIsActive(ruleName) {
        return this.accountingSettingsDLService.PutTransferRuleIsActive(ruleName)
            ;
    }
    //#endregion LedgerGroup Settings Calls
    public UpdateChequeNoStatus(selectedVoucher) {
        return this.accountingSettingsDLService.PutVoucherShowchequeNo(selectedVoucher)
            ;
    }
    public UpdatePayeeNameStatus(selectedVoucher) {
        return this.accountingSettingsDLService.PutVoucherShowPayeeName(selectedVoucher)
            ;
    }
    public AddCostCenter(costCenter: CostCenterModel) {
        //omiting the CostCenterValidator during post because it causes cyclic error during serialization in server side.
        var temp = _.omit(costCenter, ['CostCenterValidator']);
        return this.accountingSettingsDLService.PostCostCenter(temp)
            ;
    }

    public GetCostCenters() {
        return this.accountingSettingsDLService.GetCostCenters()
            ;
    }
    public GetParentCostCenter() {
        return this.accountingSettingsDLService.GetParentCostCenter()
            ;
    }

    UpdateCostCenter(currentCostCenter: CostCenterModel) {
        let costCenter = _.omit(currentCostCenter, ['CostCenterValidator', '']);
        return this.accountingSettingsDLService.PutCostCenter(costCenter)
            
    }


    ActivateDeactiveCostCenter(currentCostCenter: CostCenterModel) {
        let costCenter = _.omit(currentCostCenter, ['CostCenterValidator', '']);
        return this.accountingSettingsDLService.ActivateDeactivateCostCenter(costCenter)
            
    }
    public UpdateBillingLedgerMappingStatus(BillLedgerMappingId: number, IsActive: boolean) {
        return this.accountingSettingsDLService.UpdateBillingLedgerMappingStatus(BillLedgerMappingId, IsActive)
            ;
    }
    UpdateMedicareType(medicareType: Array<MedicalCareType>) {
        let temp = _.omit(medicareType, ['IsSelected']);
        return this.accountingSettingsDLService.UpdateMedicareType(medicareType)
            ;
    }

    public AddSubLedgers(subLedgers: Array<SubLedgerForMakePayment>) {
        return this.accountingSettingsDLService.AddSubLedgers(subLedgers)
            ;
    }
}
