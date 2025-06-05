import { Injectable } from '@angular/core';

import { Bed } from '../../adt/shared/bed.model';
import { BedFeaturesMap } from '../../adt/shared/bedfeature-map.model';
import { BedFeature } from '../../adt/shared/bedfeature.model';
import { Ward } from "../../adt/shared/ward.model";

import { Department } from "../shared/department.model";
import { ServiceDepartment } from "../shared/service-department.model";

import { ImagingItem } from "../../radiology/shared/imaging-item.model";
import { ImagingType } from "../../radiology/shared/imaging-type.model";

import { EmployeeRole } from "../../employee/shared/employee-role.model";
import { EmployeeType } from "../../employee/shared/employee-type.model";
import { Employee } from "../../employee/shared/employee.model";

import { CountrySubdivision, Municipality } from "../shared/country-subdivision.model";
import { Country } from "../shared/country.model";

import { Reaction } from "../shared/reaction.model";

import { RolePermissionMap } from "../../security/shared/role-permission-map.model";
import { Role } from "../../security/shared/role.model";
import { UserRoleMap } from "../../security/shared/user-role-map.model";
import { User } from "../../security/shared/user.model";

import { BillingPackageItem } from '../../billing/shared/billing-package-item.model';

import { BillingDLService } from '../../billing/shared/billing.dl.service';
import { SettingsDLService } from '../shared/settings.dl.service';

import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { Observable } from 'rxjs';
import { AdtAutoBillingItem_DTO } from '../../adt/shared/DTOs/adt-auto-billingItems.dto';
import { AdtBedFeatureSchemePriceCategoryMap_DTO } from '../../adt/shared/DTOs/adt-bedfeature-scheme-pricecategory-map.dto';
import { BillingPackages_DTO } from '../../billing/shared/dto/billing-packages.dto';
import { IntakeOutputParameterListModel } from '../../clinical/shared/intake-output-parameterlist.model';
import { LabTest } from "../../labs/shared/lab-test.model";
import { PHRMStoreModel } from '../../pharmacy/shared/phrm-store.model';
import { RadiologyReportTemplate } from "../../radiology/shared/radiology-report-template.model";
import { DanpheHTTPResponse } from '../../shared/common-models';
import { SchemeVsPriceCategoryModel } from '../billing/map-scheme-and-pricecategory/shared/MapSchemeVsPriceCategory.model';
import { BillServiceItemModel, BillServiceItemsPriceCategoryMap } from '../billing/shared/bill-service-item.model';
import { BillServiceItemSchemeSetting_DTO } from '../billing/shared/dto/bill-service-item-scheme-setting.dto';
import { TemplateFieldMapping_DTO } from '../dynamic-templates/shared/template-field-mapping.dto';
import { Template } from '../dynamic-templates/shared/template.model';
import { PrinterSettingsModel } from '../printers/printer-settings.model';
import { CfgPaymentModesSettings } from './CfgPaymentModesSettings';
import { MinimumDepositAmount_DTO } from './DTOs/minimum-deposit-amount.dto';
import { AdditionalServiceItemModel } from './additional-service-item.model';
import { BanksModel } from './banks.model';
import { BillItemsPriceCategoryMap } from './bil-item-price-category-map-model';
import { BillingSchemeModel } from './bill-scheme.model';
import { CFGParameterModel } from './cfg-parameter.model';
import { CreditOrganization } from './creditOrganization.model';
import { ExternalReferralModel } from './external-referral.model';
import { Membership } from './membership.model';
import { NursingWardSubStoresMapModel } from './nur-ward-substore-map.model';
import { PriceCategory } from './price.category.model';
import { PrintExportConfigurationModel } from './print-export-config.model';
import { ReportingItemBillingItemMappingModel } from './reporting-items-bill-item-mapping.model';
import { ReportingItemsModel } from './reporting-items.model';

@Injectable()
export class SettingsBLService {


  constructor(public settingsDLService: SettingsDLService, public billingDLService: BillingDLService) {
  }

  //start: adt
  public GetBedList() {
    return this.settingsDLService.GetBedList()
      ;
  }
  public GetBedFeatureList() {
    return this.settingsDLService.GetBedFeatureList()
      ;
  }
  public ADT_GetAutoBillingItemList() {
    return this.settingsDLService.ADT_GetAutoBillingItemList()
      ;
  }
  public GetSelectedBedFeatureMapList(bedId: number) {
    return this.settingsDLService.GetSelectedBedFeatureMapList(bedId)
      ;
  }
  public GetWardList() {
    return this.settingsDLService.GetWardList()
      ;
  }

  public GetMembershipType() {
    return this.settingsDLService.GetMembershipType()
      
  }

  public AddBed(CurrentBedMain: Bed) {
    let temp = _.omit(CurrentBedMain, ['BedMainValidator']);
    return this.settingsDLService.PostBed(temp)
      ;
  }
  public AddBedFeature(CurrentBedFeature: BedFeature) {

    let temp = _.omit(CurrentBedFeature, ['BedFeatureValidator']);
    return this.settingsDLService.PostBedFeature(temp)
      ;
  }
  public AddBedFeaturesMap(bedFeaturesMap: BedFeaturesMap) {

    return this.settingsDLService.PostBedFeaturesMap(bedFeaturesMap)
      ;

  }
  public ADT_PostAutoAddBillItmValues() {
    return this.settingsDLService.ADT_PostAutoAddBillItmValues()
      ;
  }

  public AddWard(CurrentWard: Ward) {
    let temp = _.omit(CurrentWard, ['WardValidator']);
    return this.settingsDLService.PostWard(temp)
      ;
  }

  public PostSchemePriceCategoryMapItems(SchemePriceCategoryMapList: SchemeVsPriceCategoryModel[]) {
    return this.settingsDLService.PostSchemePriceCategoryMapItems(SchemePriceCategoryMapList)
      ;
  }
  public UpdateSchemePriceCategoryMapItems(SchemePriceCategoryMap: SchemeVsPriceCategoryModel) {
    return this.settingsDLService.UpdateSchemePriceCategoryMapItems(SchemePriceCategoryMap)
      ;
  }


  public UpdateBed(CurrentBedMain: Bed) {
    //to fix serializaiton problem in server side
    if (CurrentBedMain.CreatedOn)
      CurrentBedMain.CreatedOn = moment(CurrentBedMain.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (CurrentBedMain.ModifiedOn)
      CurrentBedMain.ModifiedOn = moment(CurrentBedMain.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(CurrentBedMain, ['BedMainValidator']);
    return this.settingsDLService.PutBed(temp)
      ;
  }
  public UpdateBedFeature(CurrentBedFeature: BedFeature) {
    //to fix serializaiton problem in server side
    if (CurrentBedFeature.CreatedOn)
      CurrentBedFeature.CreatedOn = moment(CurrentBedFeature.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (CurrentBedFeature.ModifiedOn)
      CurrentBedFeature.ModifiedOn = moment(CurrentBedFeature.ModifiedOn).format('YYYY-MM-DD HH:mm');

    let temp = _.omit(CurrentBedFeature, ['BedFeatureValidator']);
    return this.settingsDLService.PutBedFeature(temp)
      ;
  }
  public UpdateBedFeaturesMap(bedFeaturesMap: BedFeaturesMap) {
    //to fix serializaiton problem in server side
    // bedFeaturesMapList.forEach(bedFeaturesMap => {
    //   if (bedFeaturesMap.CreatedOn)
    //     bedFeaturesMap.CreatedOn = moment(bedFeaturesMap.CreatedOn).format('YYYY-MM-DD HH:mm');
    //   if (bedFeaturesMap.ModifiedOn)
    //     bedFeaturesMap.ModifiedOn = moment(bedFeaturesMap.ModifiedOn).format('YYYY-MM-DD HH:mm');
    // });

    return this.settingsDLService.PutBedFeaturesMap(bedFeaturesMap)
      ;
  }
  public UpdateWard(CurrentWard: Ward) {
    //to fix serializaiton problem in server side
    if (CurrentWard.CreatedOn)
      CurrentWard.CreatedOn = moment(CurrentWard.CreatedOn).format('YYYY-MM-DD');
    if (CurrentWard.ModifiedOn)
      CurrentWard.ModifiedOn = moment(CurrentWard.ModifiedOn).format('YYYY-MM-DD');
    let temp = _.omit(CurrentWard, ['WardValidator']);
    return this.settingsDLService.PutWard(temp)
      ;
  }
  //end: adt

  //start: department
  public GetDepartments() {
    return this.settingsDLService.GetDepartments()
      ;
  }
  public GetStoreList() {
    return this.settingsDLService.GetStoreList()
      ;
  }

  public GetActiveStoreList() {
    return this.settingsDLService.GetActiveStoreList()
      ;
  }
  public GetStoreVerifiers(StoreId: number) {
    return this.settingsDLService.GetStoreVerifiers(StoreId)
      .map(res => { return res; });
  }
  public GetCFGParameters() {
    return this.settingsDLService.GetCFGParameters()
      ;
  }

  public GetServiceDepartments() {
    return this.settingsDLService.GetServiceDepartments()
      ;
  }

  public GetServiceCategories() {
    return this.settingsDLService.GetServiceCategories()
      ;
  }

  public GetIntegrationNameList() {
    return this.settingsDLService.GetIntegrationNameList()
      ;
  }

  public GetOPDServiceItems() {
    return this.settingsDLService.GetOPDServiceItems()
      ;
  }

  public GetSchemePriceCategoryMappedItems() {
    return this.settingsDLService.GetSchemePriceCategoryMappedItems()
      ;
  }

  //post new department
  public AddDepartment(CurrentDepartment: Department) {
    //omiting the appointmentvalidator during post because it causes cyclic error during serialization in server side.
    let dptSrvItmList = [];
    CurrentDepartment.ServiceItemsList.map(val => {
      val = _.omit(val, ['BillingItemValidator']);
      dptSrvItmList.push(val);
    });

    let temp = _.omit(CurrentDepartment, ['DepartmentValidator']);
    temp.ServiceItemsList = new Array();
    temp.ServiceItemsList = dptSrvItmList;
    return this.settingsDLService.PostDepartment(temp)
      ;
  }
  //post new department
  public AddStore(CurrentStore: PHRMStoreModel) {
    let temp = _.omit(CurrentStore, ['StoreValidator']);
    temp.CreatedOn = moment(new Date()).format('YYYY-MM-DD HH:mm');
    temp.ParentStoreId = 1;
    return this.settingsDLService.PostStore(temp)
      ;
  }
  public UpdateDepartment(department: Department) {
    //to fix serializaiton problem in server side
    if (department.CreatedOn)
      department.CreatedOn = moment(department.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (department.ModifiedOn)
      department.ModifiedOn = moment(department.ModifiedOn).format('YYYY-MM-DD HH:mm');

    let temp = _.omit(department, ['DepartmentValidator']);

    return this.settingsDLService.PutDepartment(temp)
      ;
  }
  public UpdateStore(store: PHRMStoreModel) {
    //to fix serializaiton problem in server side
    if (store.CreatedOn)
      store.CreatedOn = moment(store.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (store.ModifiedOn)
      store.ModifiedOn = moment(store.ModifiedOn).format('YYYY-MM-DD HH:mm');

    let temp = _.omit(store, ['StoreValidator']);

    return this.settingsDLService.PutStore(temp)
      ;
  }

  public ActivateDeactivateStore(storeId: number) {

    return this.settingsDLService.PutStoreActiveStatus(storeId)
      ;
  }

  public AddServiceDepartment(CurrentServiceDepartment: ServiceDepartment) {
    let temp = _.omit(CurrentServiceDepartment, ['ServiceDepartmentValidator']);
    return this.settingsDLService.PostServiceDepartment(temp)
      ;
  }
  public UpdateServDepartment(servDepartment: ServiceDepartment) {
    //to fix serializaiton problem in server side
    if (servDepartment.CreatedOn)
      servDepartment.CreatedOn = moment(servDepartment.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (servDepartment.ModifiedOn)
      servDepartment.ModifiedOn = moment(servDepartment.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(servDepartment, ['ServiceDepartmentValidator']);
    return this.settingsDLService.PutServDepartment(temp)
      ;
  }
  //end: department   



  //start: radiology
  public GetRadSignatoryEmps() {
    return this.settingsDLService.GetRadSignatoryEmps()
      ;
  }

  public GetImgTypes() {
    return this.settingsDLService.GetImgTypes()
      ;
  }
  public GetImgItems() {
    return this.settingsDLService.GetImgItems()
      ;
  }

  //Get Raddiology report  template list
  public GetRADReportTemplateList() {
    try {
      return this.settingsDLService.GetRADReportTemplateList()
        ;

    } catch (exception) {
      throw exception;
    }
  }
  //Get template data by templateId
  GetRADReportTemplateById(templateId: number) {
    try {
      return this.settingsDLService.GetRADReportTemplateById(templateId)
        ;
    } catch (exception) {
      throw exception;
    }
  }
  public AddImagingItem(imagingItem: ImagingItem) {


    let temp = _.omit(imagingItem, ['ImagingItemValidator']);
    return this.settingsDLService.PostImagingItem(temp)
      ;
  }

  public AddImagingType(imagingType: ImagingType) {
    let temp = _.omit(imagingType, ['ImagingTypeValidator']);
    return this.settingsDLService.PostImagingType(temp)
      ;
  }

  //Post Radiology report template data to server
  public AddRadiologyReportTemplate(radReportTemplate: RadiologyReportTemplate) {
    try {
      radReportTemplate.CreatedOn = moment().format('YYYY-MM-DD HH:mm');
      let temp = _.omit(radReportTemplate, ['RadiologyReportTemplateValidator']);
      return this.settingsDLService.PostRadiologyReportTemplate(temp)
        ;
    } catch (exception) {
      throw exception;
    }
  }
  public UpdateImagingType(imagingType: ImagingType) {
    //to fix serializaiton problem in server side
    if (imagingType.CreatedOn)
      imagingType.CreatedOn = moment(imagingType.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (imagingType.ModifiedOn)
      imagingType.ModifiedOn = moment(imagingType.ModifiedOn).format('YYYY-MM-DD HH:mm');

    let temp = _.omit(imagingType, ['ImagingTypeValidator']);
    return this.settingsDLService.PutImagingType(temp)
      ;
  }
  public UpdateImagingItem(imagingItem: ImagingItem) {
    //to fix serializaiton problem in server side
    if (imagingItem.CreatedOn)
      imagingItem.CreatedOn = moment(imagingItem.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (imagingItem.ModifiedOn)
      imagingItem.ModifiedOn = moment(imagingItem.ModifiedOn).format('YYYY-MM-DD HH:mm');

    let temp = _.omit(imagingItem, ['ImagingItemValidator']);
    return this.settingsDLService.PutImagingItem(temp)
      ;
  }
  //update radiology report template
  public UpdateRadiologyReportTemplate(radReportTemplate: RadiologyReportTemplate) {
    try {
      radReportTemplate.ModifiedOn = moment().format('YYYY-MM-DD HH:mm');
      let temp = _.omit(radReportTemplate, ['RadiologyReportTemplateValidator']);
      return this.settingsDLService.PutRadiologyReportTemplate(temp)
        ;
    } catch (exception) {
      throw exception;
    }
  }
  //end: radiology

  //start: employee
  public GetEmployeeList() {
    return this.settingsDLService.GetEmployeeList()
      ;
  }
  public GetEmployeeRoleList() {
    return this.settingsDLService.GetEmployeeRoleList()
      ;
  }
  public GetEmployeeTypeList(ShowIsActive: boolean) {
    return this.settingsDLService.GetEmployeeTypeList(ShowIsActive)
      ;
  }
  public GetDisBilItemPriceCFGByServDeptName(servDeptName: string) {
    return this.settingsDLService.GetDisBilItemPriceCFGByServDeptName(servDeptName)
      ;
  }
  public GetDisBilItemPriceCFGByIntegrationName(integrationName: string) {
    return this.settingsDLService.GetDisBilItemPriceCFGByIntegrationName(integrationName)
      ;
  }
  public GetBilItemPriceDetails(itemId: number, servDeptName: string) {
    return this.settingsDLService.GetBilItemPriceDetails(itemId, servDeptName)
      ;
  }

  public GetBilItemPriceDetails_IntegrationName_ItemId(integrationName: string, itemId: number) {
    return this.settingsDLService.GetBilItemPriceDetails_IntegrationName_ItemId(integrationName, itemId)
      ;
  }



  public GetCreditOrganizationList() {
    return this.settingsDLService.GetCreditOrganizationList()
      ;
  }
  public GetSignatoryImage(empId: number) {
    return this.settingsDLService.GetSignatoryImage(empId)
      ;
  }
  public AddEmployee(employee: Employee) {
    let temp = _.omit(employee, ['EmployeeValidator']);
    return this.settingsDLService.PostEmployee(temp)
      ;
  }
  public AddEmployeeRole(employeeRole: EmployeeRole) {
    let temp = _.omit(employeeRole, ['EmployeeRoleValidator']);
    return this.settingsDLService.PostEmployeeRole(temp)
      ;
  }
  public AddEmployeeType(employeeType: EmployeeType) {
    let temp = _.omit(employeeType, ['EmployeeTypeValidator']);
    return this.settingsDLService.PostEmployeeType(temp)
      ;
  }
  public AddCreditOrganization(creditOrganization: CreditOrganization) {
    let temp = _.omit(creditOrganization, ['CreditOrganizationValidator']);
    return this.settingsDLService.PostCreditOrganization(temp)
      ;
  }
  public AddMembership(membership: Membership) {
    let temp = _.omit(membership, ['MembershipValidator']);
    return this.settingsDLService.PostMembership(temp)
      ;
  }
  public PostBillScheme(billscheme: BillingSchemeModel) {
    let temp = _.omit(billscheme, ['SchemeValidator']);
    return this.settingsDLService.PostBillScheme(temp)
      ;
  }
  public UpdateEmployee(employee: Employee) {
    //to fix serializaiton problem in server side
    if (employee.CreatedOn)
      employee.CreatedOn = moment(employee.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (employee.ModifiedOn)
      employee.ModifiedOn = moment(employee.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(employee, ['EmployeeValidator']);
    return this.settingsDLService.PutEmployee(temp)
      ;
  }
  public UpdateEmployeeRole(employeeRole: EmployeeRole) {
    //to fix serializaiton problem in server side
    if (employeeRole.CreatedOn)
      employeeRole.CreatedOn = moment(employeeRole.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (employeeRole.ModifiedOn)
      employeeRole.ModifiedOn = moment(employeeRole.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(employeeRole, ['EmployeeRoleValidator']);
    return this.settingsDLService.PutEmployeeRole(temp)
      ;
  }
  public UpdateEmployeeType(employeeType: EmployeeType) {
    //to fix serializaiton problem in server side
    if (employeeType.CreatedOn)
      employeeType.CreatedOn = moment(employeeType.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (employeeType.ModifiedOn)
      employeeType.ModifiedOn = moment(employeeType.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(employeeType, ['EmployeeTypeValidator']);
    return this.settingsDLService.PutEmployeeType(temp)
      ;
  }
  //end: employee


  //start: External Referrals
  public GetExtReferrerList() {
    return this.settingsDLService.GetExtReferrerList()
      ;
  }

  public GetPrinterSettingList() {
    return this.settingsDLService.GetPrinterSettingList()
      ;
  }

  //Get All-Referrer-List
  public GetAllReferrerList() {
    return this.settingsDLService.GetAllReferrerList()
      ;
  }

  public GetBankList() {
    return this.settingsDLService.GetBankList()
      ;
  }

  public AddExtReferrer(extRefObj: ExternalReferralModel) {
    let temp = _.omit(extRefObj, ['ExternalRefValidator', '', '']);
    return this.settingsDLService.PostExtReferrer(temp)
      ;
  }

  public UpdateExtReferrer(extRefObj: ExternalReferralModel) {
    let temp = _.omit(extRefObj, ['ExternalRefValidator', '', '']);
    return this.settingsDLService.PutExtReferrer(temp)
      ;
  }
  //end: External Referrals

  public AddPrinterSetting(printerSettingObj: PrinterSettingsModel) {
    let temp = _.omit(printerSettingObj, ['PrinterSettingsValidator', '', '']);
    return this.settingsDLService.PostPrinterSetting(temp)
      ;
  }

  public UpdatePrinterSetting(printerSettingObj: PrinterSettingsModel) {
    let temp = _.omit(printerSettingObj, ['PrinterSettingsValidator', '', '']);
    return this.settingsDLService.PutPrinterSetting(temp)
      ;
  }


  public AddBank(bankObj: BanksModel) {
    let temp = _.omit(bankObj, ['BanksValidator', '', '']);
    return this.settingsDLService.PostBank(temp)
      ;
  }

  public UpdateBank(bankObj: BanksModel) {
    let temp = _.omit(bankObj, ['BanksValidator', '', '']);
    return this.settingsDLService.PutBank(temp)
      ;
  }


  //start: billing
  public UpdateCreditOrganization(creditOrganization: CreditOrganization) {
    //to fix serializaiton problem in server side
    if (creditOrganization.CreatedOn)
      creditOrganization.CreatedOn = moment(creditOrganization.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (creditOrganization.ModifiedOn)
      creditOrganization.ModifiedOn = moment(creditOrganization.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(creditOrganization, ['CreditOrganizationValidator']);
    return this.settingsDLService.PutCreditOrganization(temp)
      ;
  }
  public UpdateMembership(membership: Membership) {
    if (membership.CreatedOn)
      membership.CreatedOn = moment(membership.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (membership.ModifiedOn)
      membership.ModifiedOn = moment(membership.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(membership, ['MembershipValidator']);
    return this.settingsDLService.PutMembership(temp)
      ;
  }
  //end: billing

  //start: security
  public GetApplicationList() {
    return this.settingsDLService.GetApplicationList()
      ;
  }
  public GetRouteList() {
    return this.settingsDLService.GetRouteList()
      ;
  }
  public GetPermissionList() {
    return this.settingsDLService.GetPermissionList()
      ;
  }
  public GetRoleList() {
    return this.settingsDLService.GetRoleList()
      ;
  }
  public GetUserList() {
    return this.settingsDLService.GetUserList()
      ;
  }
  public GetSchemeList() {
    return this.settingsDLService.GetSchemeList()
      ;
  }
  public GetRolePermissionList(roleId: number) {
    return this.settingsDLService.GetRolePermissionList(roleId)
      ;
  }
  public GetUserRoleList(userId: number) {
    return this.settingsDLService.GetUserRoleList(userId)
      ;
  }
  public GetDynamicReportNameList() {
    return this.settingsDLService.GetDynamicReportNameList()
      ;
  }
  public GetReportingItemBillItemList(reportingItemId: number) {
    return this.settingsDLService.GetReportingItemBillItemList(reportingItemId)
      ;
  }
  public AddUser(user) {
    let temp = _.omit(user, ['UserProfileValidator']);
    return this.settingsDLService.PostUser(temp)
      ;
  }

  public UpdatePassword(user) {
    let temp = _.omit(user, ['UserProfileValidator']);
    return this.settingsDLService.PutUserPassword(temp)
      ;
  }

  public Security_DeactivateUser(user) {
    let temp = _.omit(user, ['UserProfileValidator']);
    return this.settingsDLService.PutUserIsActive(temp)
      ;
  }

  public AddRole(role) {
    let temp = _.omit(role, ['RoleValidator']);
    return this.settingsDLService.PostRole(temp)
      ;
  }
  public AddRolePermissions(rolePermissions: Array<RolePermissionMap>, roleId: number) {
    return this.settingsDLService.PostRolePermissions(rolePermissions, roleId)
      ;
  }
  public AddUserRoles(userRoles: Array<UserRoleMap>) {
    return this.settingsDLService.PostUserRoles(userRoles)
      ;
  }
  public AddReportingItemsAndBillItemMapping(reportingItemsBillItem: Array<ReportingItemBillingItemMappingModel>) {
    return this.settingsDLService.PostReportingItemAndBillItemMapping(reportingItemsBillItem)
      ;
  }
  public UpdateUser(user: User) {
    //to fix serializaiton problem in server side
    if (user.CreatedOn)
      user.CreatedOn = moment(user.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (user.ModifiedOn)
      user.ModifiedOn = moment(user.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(user, ['UserProfileValidator']);
    return this.settingsDLService.PutUser(temp)
      ;
  }
  public UpdateRole(role: Role) {
    //to fix serializaiton problem in server side
    if (role.CreatedOn)
      role.CreatedOn = moment(role.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (role.ModifiedOn)
      role.ModifiedOn = moment(role.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(role, ['RoleValidator']);
    return this.settingsDLService.PutRole(temp)
      ;
  }
  public UpdateRolePermissions(rolePermissions: Array<RolePermissionMap>) {
    //to fix serializaiton problem in server side
    rolePermissions.forEach(rolePermission => {
      if (rolePermission.CreatedOn)
        rolePermission.CreatedOn = moment(rolePermission.CreatedOn).format('YYYY-MM-DD HH:mm');
      if (rolePermission.ModifiedOn)
        rolePermission.ModifiedOn = moment(rolePermission.ModifiedOn).format('YYYY-MM-DD HH:mm');
    });

    return this.settingsDLService.PutRolePermissions(rolePermissions)
      ;
  }
  public UpdateUserRoles(userRoles: Array<UserRoleMap>) {
    //to fix serializaiton problem in server side
    userRoles.forEach(userRole => {
      if (userRole.CreatedOn)
        userRole.CreatedOn = moment(userRole.CreatedOn).format('YYYY-MM-DD HH:mm');
      if (userRole.ModifiedOn)
        userRole.ModifiedOn = moment(userRole.ModifiedOn).format('YYYY-MM-DD HH:mm');
    });

    return this.settingsDLService.PutUserRoles(userRoles)
      ;
  }
  public UpdateReportingItemAndBillItemMapping(reportingItemsBillItem: Array<ReportingItemBillingItemMappingModel>) {
    return this.settingsDLService.PutReportingItemAndBillItemMapping(reportingItemsBillItem)
      ;
  }

  //end: security

  //start: billing
  public GetBillingItemList(showInactiveItems: boolean = false) {
    return this.settingsDLService.GetBillingItemList(showInactiveItems)
      ;
  }

  public GetServiceItemList() {
    return this.settingsDLService.GetServiceItemList()
      ;
  }

  public GetReportingItemList() {
    return this.settingsDLService.GetReportingItemList()
      ;
  }
  // public AddBillingItem(item) {
  //   let temp = _.omit(item, ['BillingItemValidator']);
  //   return this.settingsDLService.PostBillingItem(temp)
  //     ;
  // }

  public AddReportingItem(item: ReportingItemsModel) {
    let temp = _.omit(item, ['ReportingItemsValidator']);
    return this.settingsDLService.PostReportingItem(temp)
      ;
  }

  public UpdateBillingItem(item) {
    //to fix serializaiton problem in server side
    if (item.CreatedOn)
      item.CreatedOn = moment(item.CreatedOn).format('YYYY-MM-DD HH:mm:ss');
    if (item.ModifiedOn)
      item.ModifiedOn = moment(item.ModifiedOn).format('YYYY-MM-DD HH:mm:ss');
    let temp = _.omit(item, ['BillingItemValidator']);
    return this.settingsDLService.PutBillingItem(temp)
      ;
  }

  public UpdateReportingItem(item: ReportingItemsModel) {
    let temp = _.omit(item, ['ReportingItemsValidator']);
    return this.settingsDLService.UpdateReportingItem(temp)
      ;
  }

  //GET: Price Change History List by ItemId and ServiceDepartmentId
  public GetBillItemChangeHistoryList(itemId: number, serviceDepartmentId: number) {
    return this.settingsDLService.GetBillItemChangeHistoryList(itemId, serviceDepartmentId)
      ;
  }
  //start: billingPackage
  public GetBillingPackageList() {
    return this.settingsDLService.GetBillingPackageList()
      .map(res => {
        return res;
      });
  }

  public GetBillingPackageServiceItemList(BillingPackageId: number, PriceCategoryId: number) {
    return this.settingsDLService.GetBillingPackageServiceItemList(BillingPackageId, PriceCategoryId)
      .map(res => {
        return res;
      });
  }
  public GetBillingServDepartments() {
    return this.billingDLService.GetServiceDepartments()
      .map((responseData) => {
        return responseData;
      });
  }

  public GetDoctorsList() {
    return this.billingDLService.GetDoctorsList()
      ;
  }

  public AddBillingPackage(BillingPackage: BillingPackages_DTO) {
    return this.settingsDLService.PostBillingPackage(BillingPackage)
      .map(res => {
        let responseData = res;
        return responseData;
      });
  }

  public ActivateDeactivateBillingPackage(BillingPackageId: number) {
    return this.settingsDLService.ActivateDeactivateBillingPackage(BillingPackageId)
      .map(res => { return res; });
  }
  public ConvertPackageItemToJson(packageItemList: Array<BillingPackageItem>): string {
    let _itemList: any = [];
    packageItemList.forEach(item => {
      let _item = _.omit(item, ['Price', 'TaxPercent', 'Tax', 'Total', 'SubTotal', 'DiscountAmount', 'FilteredItemList', 'BillingPackageItemValidator']);
      _itemList.push(_item);
    });
    return JSON.stringify(_itemList);
  }

  public UpdateBillingPackage(BillingPackage: BillingPackages_DTO) {
    //to fix serializaiton problem in server side
    // if (BillingPackage.CreatedOn)
    //   BillingPackage.CreatedOn = moment(BillingPackage.CreatedOn).format('YYYY-MM-DD HH:mm');
    // if (BillingPackage.ModifiedOn)
    //   BillingPackage.ModifiedOn = moment(BillingPackage.ModifiedOn).format('YYYY-MM-DD HH:mm');

    // BillingPackage.BillingItemsXML = this.ConvertPackageItemToJson(packageItemList);
    // let temp = _.omit(BillingPackage, ['BillingPackageValidator']);
    return this.settingsDLService.PutBillingPackage(BillingPackage)
      .map(res => {
        // let responseData = res;
        // if (responseData.Results)
        // responseData.Results.BillingItemsXML = JSON.parse(responseData.Results.BillingItemsXML)
        return res;
      });
  }
  //end: billingPackage

  public UpdateAutoBillingItems(autoBillingItemList: AdtAutoBillingItem_DTO) {
    return this.settingsDLService.UpdateAutoBillingItems(autoBillingItemList)
      .map((responseData) => {
        return responseData;
      });
  }
  public AddAutoBillingItems(autoBillingItem: AdtAutoBillingItem_DTO) {
    return this.settingsDLService.AddAutoBillingItems(autoBillingItem)
      .map((responseData) => {
        return responseData;
      });
  }
  public UpdateAdtAutoBillingItems(autoBillingItem: AdtAutoBillingItem_DTO) {
    return this.settingsDLService.UpdateAdtAutoBillingItems(autoBillingItem)
      .map((responseData) => {
        return responseData;
      });
  }

  //end: billing

  //START: Lab

  //GET:Lab- LabTestGroup List
  GetLabTestGroupList() {
    return this.settingsDLService.GetLabTestGroupList()
      ;
  }

  //POST:Lab-Add Lab Test Item to database
  public AddLabItem(labItem: LabTest) {
    let temp = _.omit(labItem, ['LabTestValidator']);
    return this.settingsDLService.PostLabItem(temp)
      ;
  }

  //PUT:Lab-


  //END: Lab


  //Start Geolocation
  public GetCountries() {
    return this.settingsDLService.GetCountries()
      ;
  }

  public AddCountry(CurrentCountry: Country) {
    let temp = _.omit(CurrentCountry, ['CountryValidator']);
    return this.settingsDLService.PostCountry(temp)
      ;
  }

  public AddUpdateMunicipality(CurrMunicipality: Municipality) {
    let temp = _.omit(CurrMunicipality, ['MunicipalityValidator']);
    return this.settingsDLService.AddUpdateMunicipality(temp)
      ;
  }

  public UpdateMunicipalityStatus(id: number) {
    return this.settingsDLService.UpdateMunicipalityStatus(id)
      ;
  }

  public UpdateCountry(country: Country) {
    //to fix serializaiton problem in server side
    if (country.CreatedOn)
      country.CreatedOn = moment(country.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (country.ModifiedOn)
      country.ModifiedOn = moment(country.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(country, ['CountryValidator']);
    return this.settingsDLService.PutCountry(temp)
      ;
  }

  public GetSubDivisions() {
    return this.settingsDLService.GetSubdivisions()
      ;
  }

  public GetMunicipalities() {
    return this.settingsDLService.GetMunicipalities()
      ;
  }

  public AddSubDivision(CurrentSubDivision: CountrySubdivision) {
    let temp = _.omit(CurrentSubDivision, ['SubdivisionValidator']);
    return this.settingsDLService.PostSubdivision(temp)
      ;
  }

  public UpdateSubdivision(subdivision: CountrySubdivision) {
    //to fix serializaiton problem in server side
    if (subdivision.CreatedOn)
      subdivision.CreatedOn = moment(subdivision.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (subdivision.ModifiedOn)
      subdivision.ModifiedOn = moment(subdivision.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(subdivision, ['SubdivisionValidator']);
    return this.settingsDLService.PutSubdivision(temp)
      ;
  }
  //End Geolocation


  //Start Clinical
  public GetReactions() {
    return this.settingsDLService.GetReactions()
      ;
  }
  public AddReaction(CurrentReaction: Reaction) {
    let temp = _.omit(CurrentReaction, ['ReactionValidator']);
    return this.settingsDLService.PostReaction(temp)
      ;
  }
  public UpdateReaction(CurrentReaction: Reaction) {
    if (CurrentReaction.CreatedOn)
      CurrentReaction.CreatedOn = moment(CurrentReaction.CreatedOn).format('YYYY-MM-DD HH:mm');
    if (CurrentReaction.ModifiedOn)
      CurrentReaction.ModifiedOn = moment(CurrentReaction.ModifiedOn).format('YYYY-MM-DD HH:mm');
    let temp = _.omit(CurrentReaction, ['ReactionValidator']);
    return this.settingsDLService.PutReaction(temp)
      ;
  }

  //End Clinical

  public UpdateParameterValue(parameterToUpdate: CFGParameterModel) {
    let data = JSON.stringify(parameterToUpdate);
    return this.settingsDLService.UpdateParameterValue(data)
      ;
  }

  //Start Tax
  public UpdateTaxInfo(taxDetail) {
    return this.settingsDLService.PutTaxInfo(taxDetail)
      ;
  }

  //End Tax


  //Start ICD10 Groups
  public GetICDGroups() {
    return this.settingsDLService.GetICDGroups()
      ;
  }
  //End ICD10 Groups

  public AddPrintExportConfiguration(data: PrintExportConfigurationModel) {
    let temp = _.omit(data, ['ConfigurationValidator', '', '']);
    return this.settingsDLService.PostConfiguration(temp)
      ;
  }

  public UpdatePrintExportConfiguration(data: PrintExportConfigurationModel) {
    let temp = _.omit(data, ['ConfigurationValidator', '', '']);
    return this.settingsDLService.PutConfiguration(temp)
      ;
  }

  public UpdatePaymentModeSetting(data: CfgPaymentModesSettings) {
    return this.settingsDLService.PutPaymentModeSetting(data)
      ;
  }

  public UpdateServiceDepartmentStatus(data: ServiceDepartment) {
    return this.settingsDLService.PutServiceDepartmentStatus(data)
      ;
  }
  public GetBilCfgItemsVsPriceCategory(BillItemPriceId: number) {
    return this.settingsDLService.GetBilCfgItemsVsPriceCategory(BillItemPriceId)
      ;
  }

  public GetServiceItemsVsPriceCategory(ServiceItemId: number) {
    return this.settingsDLService.GetServiceItemsVsPriceCategory(ServiceItemId)
      ;
  }
  public UpdateBillItemsPriceCategoryMap(data: BillItemsPriceCategoryMap) {
    return this.settingsDLService.UpdateBillItemsPriceCategoryMap(data, data.PriceCatMapId)
      ;
  }
  public AddBillItemsPriceCategoryMap(data: BillItemsPriceCategoryMap) {
    return this.settingsDLService.AddBillItemsPriceCategoryMap(data)
      ;
  }
  public AddPriceCategory(priceCategory: PriceCategory) {
    let temp = _.omit(priceCategory, ['PriceValidator', '', '']);
    return this.settingsDLService.AddPriceCategory(temp)
      ;
  }
  public GetPriceCategory() {
    return this.settingsDLService.GetPriceCategory()
      ;
  }
  public GetBillingSchemes() {
    return this.settingsDLService.GetBillingSchemes()
      ;
  }

  public GetBillingSchemeById(schemeId: number) {
    return this.settingsDLService.GetBillingSchemeById(schemeId)
      ;
  }

  public GetPharmacyCreditOrganization() {
    return this.settingsDLService.GetPharmacyCreditOrganization()
      ;
  }
  public GetBillingCreditOrganization() {
    return this.settingsDLService.GetBillingCreditOrganization()
      ;
  }
  public UpdatePriceCategory(priceCategory: PriceCategory) {
    let temp = _.omit(priceCategory, ['PriceValidator', '', '']);
    return this.settingsDLService.UpdatePriceCategory(temp)
      ;
  }
  public UpdateBillScheme(billSchemes: BillingSchemeModel) {
    let temp = _.omit(billSchemes, ['SchemeValidator', '', '']);
    return this.settingsDLService.UpdateBillScheme(temp)
      ;
  }
  public GetPaymentModes() {
    return this.settingsDLService.GetPaymentModes()
      ;
  }
  public PriceCategoryActivation(PriceCatgeoryId: number, IsActive: boolean) {
    return this.settingsDLService.PriceCategoryActivation(PriceCatgeoryId, IsActive)
      ;
  }
  public BillSchemeActivation(SchemeId: number, IsActive: boolean) {
    return this.settingsDLService.BillSchemeActivation(SchemeId, IsActive)
      ;
  }

  public AddServiceItems(billServiceItem: BillServiceItemModel) {
    let temp = _.omit(billServiceItem, ['BillingItemValidator'], ['IsSelected']);
    return this.settingsDLService.PostServiceItems(temp)
      ;
  }

  public UpdateServiceItem(item) {
    if (item.CreatedOn)
      item.CreatedOn = moment(item.CreatedOn).format('YYYY-MM-DD HH:mm:ss');
    if (item.ModifiedOn)
      item.ModifiedOn = moment(item.ModifiedOn).format('YYYY-MM-DD HH:mm:ss');
    let temp = _.omit(item, ['BillingItemValidator']);
    return this.settingsDLService.PutServiceItem(temp);
  }

  public AddBillServiceItemsPriceCategoryMap(data: BillServiceItemsPriceCategoryMap) {
    return this.settingsDLService.AddBillServiceItemsPriceCategoryMap(data)
      ;
  }

  public ActivateDeactivateServiceItem(item) {
    if (item.CreatedOn)
      item.CreatedOn = moment(item.CreatedOn).format('YYYY-MM-DD HH:mm:ss');
    if (item.ModifiedOn)
      item.ModifiedOn = moment(item.ModifiedOn).format('YYYY-MM-DD HH:mm:ss');
    let temp = _.omit(item, ['BillingItemValidator']);
    return this.settingsDLService.ActivateDeactivateServiceItem(temp)
      ;
  }
  public UpdateBillServiceItemsPriceCategoryMap(data: BillServiceItemsPriceCategoryMap) {
    return this.settingsDLService.UpdateBillServiceItemsPriceCategoryMap(data, data.PriceCategoryServiceItemMapId)
      ;
  }
  public GetBillingSchemesDtoList(serviceBillingContext: string) {
    return this.settingsDLService.GetBillingSchemesDtoList(serviceBillingContext)
      
  }
  public PostServiceItemSchemeSettings(billserviceitemschemedata: BillServiceItemSchemeSetting_DTO[]) {
    return this.settingsDLService.PostServiceItemSchemeSettings(billserviceitemschemedata)
      ;
  }

  public GetServiceItemSchemeSettings(SchemeId: number) {
    return this.settingsDLService.GetServiceItemSchemeSettings(SchemeId)
      ;
  }
  public PostNursingWardSupplyMap(nursingWardSupply: Array<NursingWardSubStoresMapModel>) {
    return this.settingsDLService.PostNursingWardSupplyMap(nursingWardSupply)
      ;
  }

  public GetSubstoreWardMap() {
    return this.settingsDLService.GetSubstoreWardMap()
      
  }
  public GetSubstoreWardMapByWardId(WardId: number) {
    return this.settingsDLService.GetSubstoreWardMapByWardId(WardId)
      
  }
  public UpdateSubstoreMapData(nursingWardSupply: Array<NursingWardSubStoresMapModel>) {
    return this.settingsDLService.UpdateSubstoreMapData(nursingWardSupply)
      ;
  }
  public GetBillingSchmes(): Observable<DanpheHTTPResponse> {
    return this.settingsDLService.GetBillingSchmes()
      .map(res => {
        return res;
      });
  }
  public GetAutoBillingItemsList(): Observable<DanpheHTTPResponse> {
    return this.settingsDLService.GetAutoBillingItemsList()
      .map(res => {
        return res;
      });
  }
  public BillingItemActivation(AdtAutoBillingItemId: number, IsActive: boolean) {
    return this.settingsDLService.BillingItemActivation(AdtAutoBillingItemId, IsActive)
      ;
  }
  public GetAdditionalServiceItems() {
    return this.settingsDLService.GetAdditionalServiceItems()
      ;
  }
  public AddAdditionalServiceItems(CurrentAdditionalServiceItem: AdditionalServiceItemModel) {
    let temp = _.omit(CurrentAdditionalServiceItem, ['AdditionalServiceItemValidator']);
    return this.settingsDLService.PostAdditionalServiceItems(temp)
      ;
  }
  public UpdateAdditionalServiceItems(CurrentAdditionalServiceItem: AdditionalServiceItemModel) {
    let temp = _.omit(CurrentAdditionalServiceItem, ['AdditionalServiceItemValidator']);
    return this.settingsDLService.PutAdditionalServiceItems(temp)
      ;
  }
  public ActivateDeactivateAdditionalServiceItemStatus(additionalServiceItemId: number, isActive: boolean) {
    return this.settingsDLService.PutActivateDeactivateAdditionalServiceItemStatus(additionalServiceItemId, isActive)
      ;
  }

  public ActivateDeactivateSchemePriceCategoryMapItem(PriceCategorySchemeMapId: number, Status: boolean) {
    return this.settingsDLService.ActivateDeactivateSchemePriceCategoryMapItem(PriceCategorySchemeMapId, Status)
      ;
  }
  public SaveBedFeatureSchemePriceCategory(bedfeatureschemepricecategoryData: AdtBedFeatureSchemePriceCategoryMap_DTO[]) {
    return this.settingsDLService.SaveBedFeatureSchemePriceCategory(bedfeatureschemepricecategoryData)
      ;
  }
  public GetBedFeatureSchemePriceCategoryMap() {
    return this.settingsDLService.GetBedFeatureSchemePriceCategoryMap()
      ;
  }
  UpdateBedFeatureSchemePriceCategory(BedFeatureSchemePriceCategory: AdtBedFeatureSchemePriceCategoryMap_DTO) {
    return this.settingsDLService.UpdateBedFeatureSchemePriceCategory(BedFeatureSchemePriceCategory)
      ;
  }
  ActivateDeactivateBedFeatureSchemePriceCategoryMap(BedFeatureSchemePriceCategoryMapId: number, IsActive: boolean) {
    return this.settingsDLService.ActivateDeactivateBedFeatureSchemePriceCategoryMap(BedFeatureSchemePriceCategoryMapId, IsActive)
      ;
  }
  public ActivateDeactivateSubScheme(SubSchemeId: number) {
    return this.settingsDLService.ActivateDeactivateSubScheme(SubSchemeId)
      ;
  }

  public GetBillingSubSchemesBySchemeId(SchemeId: number) {
    return this.settingsDLService.GetBillingSubSchemesBySchemeId(SchemeId)
      ;
  }

  public AddDepositHead(currentDepositHead) {
    return this.settingsDLService.PostDepositHead(currentDepositHead)
      ;
  }
  public UpdateDepositHead(currentDepositHead) {
    return this.settingsDLService.PutDepositHead(currentDepositHead)
      ;
  }
  public ActivateDeactivateDepositHeadStatus(depositHeadId: number) {
    return this.settingsDLService.PutActivateDeactivateDepositHeadStatus(depositHeadId)
      ;
  }
  public GetDepositHead() {
    return this.settingsDLService.GetDepositHead()
      ;
  }
  public SaveMinimumDepositAmount(MinimumDepositAmount: MinimumDepositAmount_DTO) {
    let temp = _.omit(MinimumDepositAmount, ['MinimumDepositSettingsValidator']);
    return this.settingsDLService.SaveMinimumDepositAmount(temp)
      ;
  }
  public GetSettingDepositAmount() {
    return this.settingsDLService.GetSettingDepositAmount()
      ;
  }
  UpdateSettingDepositAmount(SettingDepositAmountToUpdate: MinimumDepositAmount_DTO) {
    return this.settingsDLService.UpdateSettingDepositAmount(SettingDepositAmountToUpdate)
      ;
  }
  ActivateDeactivateSettingDepositAmount(AdtDepositSettingId: number) {
    return this.settingsDLService.ActivateDeactivateSettingDepositAmount(AdtDepositSettingId)
      ;
  }
  public GetTemplateTypeList() {
    return this.settingsDLService.GetTemplateTypeList();
  }
  public GetTemplateList() {
    return this.settingsDLService.GetTemplateList();
  }
  public UpdateTemplateSettings(templateId: number) {
    return this.settingsDLService.PutTemplateSettings(templateId)
      ;
  }
  public GetFieldMasterList(templateTypeId: number = null) {
    return this.settingsDLService.GetFieldMasterList(templateTypeId)
  }
  public GetTemplateType() {
    return this.settingsDLService.GetTemplateType()
  }
  public AddNewTemplate(TemplateData: Template) {
    let temp = _.omit(TemplateData, ['DynamicTemplateValidator']);
    return this.settingsDLService.AddNewTemplate(temp)
      ;
  }
  // //update  dynamic  template
  public UpdateDynTemplate(dynTemplate: Template) {
    try {
      let temp = _.omit(dynTemplate, ['DynamicTemplateValidator']);
      return this.settingsDLService.PutDynTemplate(temp)
        ;
    } catch (exception) {
      throw exception;
    }
  }
  public GetDynTemplateDataById(templateId: number) {
    try {
      return this.settingsDLService.GetDynTemplateDataById(templateId)
        ;
    } catch (exception) {
      throw exception;
    }
  }
  public GetFieldMasterByTemplateId(templateId: number) {
    return this.settingsDLService.GetFieldMasterByTemplateId(templateId)
      ;
  }
  public AddUpdateFieldMapping(selectedFields: TemplateFieldMapping_DTO[]) {
    return this.settingsDLService.AddUpdateFieldMapping(selectedFields)
      ;
  }
  public GetIntakeOutputTypeList() {
    return this.settingsDLService.GetIntakeOutputTypeList()
      ;
  }
  public AddIntakeOutputVariable(data: IntakeOutputParameterListModel) {
    return this.settingsDLService.PostIntakeOutputVariable(data)
      ;
  }
  public GetIntakeOutputTypeListForGrid() {
    return this.settingsDLService.GetIntakeOutputTypeListForGrid()
      ;
  }
  public ActivateDeactivateVariableStatus(selectedIntakeOutputData) {
    return this.settingsDLService.PutActivateDeactivateVariableStatus(selectedIntakeOutputData).map(res => { return res; });
  }
  public UpdateIntakeOutputVariable(data: IntakeOutputParameterListModel) {
    return this.settingsDLService.PutIntakeOutputVariable(data)
      ;
  }
}
