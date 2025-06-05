import { Injectable, Directive } from '@angular/core';

import { Role } from "../../../security/shared/role.model";
import { User } from "../../../security/shared/user.model";
import { RolePermissionMap } from "../../../security/shared/role-permission-map.model";
import { UserRoleMap } from "../../../security/shared/user-role-map.model";

import { InventorySettingDLService } from './inventory-settings.dl.service';

import { AccountHeadModel } from "./account-head.model";
import { CurrencyModel } from "./currency.model";
import { ItemCategoryModel } from "./item-category.model";
import { ItemModel } from "./item.model";
import { PackagingTypeModel } from "./packaging-type.model";
import { UnitOfMeasurementModel } from "./unit-of-measurement.model";
import { VendorsModel } from "./vendors.model";
import { TermsConditionsMasterModel } from '../../shared/terms-conditions-master.model'

import * as moment from 'moment/moment';
import * as _ from 'lodash';
import { ItemSubCategoryModel } from './item-subcategory.model';

@Injectable()
export class InventorySettingBLService {
  constructor(
    public invSettingDLservice: InventorySettingDLService) {

  }



  //Get

  public GetAccountHeadList() {
    return this.invSettingDLservice.GetAccountHeadList()
      ;
  }
  public GetTermsConditions(TermsApplicationId) {
    return this.invSettingDLservice.GetTermsConditions(TermsApplicationId)
      ;
  }
  public GetAccountHead(ShowIsActive: boolean) {
    return this.invSettingDLservice.GetAccountHead(ShowIsActive)
      ;
  }
  //getMappedledgerlist
  public getMappedledgerlist(ledgerType) {
    return this.invSettingDLservice.getMappedledgerlist(ledgerType)
      ;
  }
  public GetCurrency() {
    return this.invSettingDLservice.GetCurrencyCode()
      ;
  }
  public GetItemList() {
    return this.invSettingDLservice.GetItemList()
      ;
  }
  // public GetItem() {
  //   return this.invSettingDLservice.GetItem()
  //     ;
  // }
  public GetPackagingType() {
    return this.invSettingDLservice.GetPackagingType()
      ;
  }
  public GetUnitOfMeasurement() {
    return this.invSettingDLservice.GetUnitOfMeasurement()
      ;
  }
  public GetItemCategory() {
    return this.invSettingDLservice.GetItemCategory()
      ;
  }
  public GetItemSubCategory() {
    return this.invSettingDLservice.GetItemSubCategory()
      ;
  }
  public GetItemCategoryList() {
    return this.invSettingDLservice.GetItemCategoryList()
      ;
  }
  public GetPackagingTypeList() {
    return this.invSettingDLservice.GetPackagingTypeList()
      ;
  }
  public GetUnitOfMeasurementList() {
    return this.invSettingDLservice.GetUnitOfMeasurementList()
      ;
  }
  public GetVendorsList() {
    return this.invSettingDLservice.GetVendorsList()
      ;
  }
  // public GetVendors() {
  //   return this.invSettingDLservice.GetVendors()
  //     ;
  // }
  public GetCurrencyCode() {
    return this.invSettingDLservice.GetCurrencyCode()
      ;
  }

  public getActiveRbacRoles() {
    return this.invSettingDLservice.getActiveRbacRoles();
  }

  //Post

  public AddAccountHead(CurrentAccountHead: AccountHeadModel) {
    var temp = _.omit(CurrentAccountHead, ['AccountHeadValidator']);

    return this.invSettingDLservice.PostAccountHead(temp)
      ;
  }
  public AddCurrency(CurrentCurrency: CurrencyModel) {
    var temp = _.omit(CurrentCurrency, ['CurrencyValidator']);

    return this.invSettingDLservice.PostCurrency(temp)
      ;
  }

  public AddTerms(CurrentData: TermsConditionsMasterModel) {
    var temp = _.omit(CurrentData, ['TermsValidators']);
    return this.invSettingDLservice.PostTerms(temp)
      ;
  }

  public AddItem(CurrentItem: ItemModel) {
    var temp = _.omit(CurrentItem, ['ItemValidator']);

    return this.invSettingDLservice.PostItem(temp)
      ;
  }
  public AddItemCategory(CurrentItemCategory: ItemCategoryModel) {
    var temp = _.omit(CurrentItemCategory, ['ItemCategoryValidator']);

    return this.invSettingDLservice.PostItemCategory(temp)
      ;
  }
  public AddItemSubCategory(CurrentItemCategory: ItemSubCategoryModel) {
    var temp = _.omit(CurrentItemCategory, ['ItemSubCategoryValidator']);

    return this.invSettingDLservice.PostItemSubCategory(temp)
      ;
  }
  public AddPackagingType(CurrentPackagingType: PackagingTypeModel) {
    var temp = _.omit(CurrentPackagingType, ['PackagingTypeValidator']);

    return this.invSettingDLservice.PostPackagingType(temp)
      ;
  }
  public AddUnitOfMeasurement(CurrentUnitOfMeasurement: UnitOfMeasurementModel) {
    var temp = _.omit(CurrentUnitOfMeasurement, ['UnitOfMeasurementValidator']);

    return this.invSettingDLservice.PostUnitOfMeasurement(temp)
      ;
  }
  public AddVendor(CurrentVendor: VendorsModel) {
    var temp = _.omit(CurrentVendor, ['VendorsValidator']);

    return this.invSettingDLservice.PostVendor(temp)
      ;
  }



  //Put

  public UpdateAccountHead(accounthead: AccountHeadModel) {
    if (accounthead.CreatedOn)
      accounthead.CreatedOn = moment(accounthead.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(accounthead, ['AccountHeadValidator']);

    return this.invSettingDLservice.PutAccountHead(temp)
      ;
  }
  public UpdateCurrency(currency: CurrencyModel) {
    if (currency.CreatedOn)
      currency.CreatedOn = moment(currency.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(currency, ['CurrencyValidator']);

    return this.invSettingDLservice.PutCurrency(temp)
      ;
  }
  public UpdateItem(Item: ItemModel) {
    if (Item.CreatedOn)
      Item.CreatedOn = moment(Item.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(Item, ['ItemValidator']);

    return this.invSettingDLservice.PutItem(temp)
      ;
  }
  public UpdateItemCategory(itemcategory: ItemCategoryModel) {
    if (itemcategory.CreatedOn)
      itemcategory.CreatedOn = moment(itemcategory.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(itemcategory, ['ItemCategoryValidator']);

    return this.invSettingDLservice.PutItemCategory(temp)
      ;
  }
  public UpdateItemSubCategory(itemsubcategory: ItemSubCategoryModel) {
    if (itemsubcategory.CreatedOn)
      itemsubcategory.CreatedOn = moment(itemsubcategory.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(itemsubcategory, ['ItemSubCategoryValidator']);

    return this.invSettingDLservice.PutItemSubCategory(temp)
      ;
  }
  public UpdatePackagingType(vendor: PackagingTypeModel) {
    if (vendor.CreatedOn)
      vendor.CreatedOn = moment(vendor.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(vendor, ['PackagingTypeValidator']);

    return this.invSettingDLservice.PutPackagingType(temp)
      ;
  }
  public UpdateUnitOfMeasurement(unitofmeasurement: UnitOfMeasurementModel) {
    if (unitofmeasurement.CreatedOn)
      unitofmeasurement.CreatedOn = moment(unitofmeasurement.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(unitofmeasurement, ['UnitOfMeasurementValidator']);

    return this.invSettingDLservice.PutUnitOfMeasurement(temp)
      ;
  }
  public UpdateVendor(vendor: VendorsModel) {
    if (vendor.CreatedOn)
      vendor.CreatedOn = moment(vendor.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(vendor, ['VendorsValidator']);

    return this.invSettingDLservice.PutVendor(temp)
      ;
  }

  public UpdateTerms(CurrentData: TermsConditionsMasterModel) {
    if (CurrentData.CreatedOn)
      CurrentData.CreatedOn = moment(CurrentData.CreatedOn).format('YYYY-MM-DD HH:mm');
    var temp = _.omit(CurrentData, ['TermsValidators']);

    return this.invSettingDLservice.PutTerms(temp)
      ;
  }

}
