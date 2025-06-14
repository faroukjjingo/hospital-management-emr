import { Injectable, Directive } from '@angular/core';
import { ImagingDLService } from './imaging.dl.service';
import { SecurityService } from '../../security/shared/security.service';
import { ImagingItemRequisition } from './imaging-item-requisition.model';
import { ImagingItem } from './imaging-item.model';
import { ImagingItemReport } from '../shared/imaging-item-report.model';
import { BillItemRequisition } from '../../billing/shared/bill-item-requisition.model';
import { BillingDLService } from '../../billing/shared/billing.dl.service';


import * as moment from 'moment/moment';
import * as _ from 'lodash';
import { InPatientLabTest } from '../../labs/shared/InpatientLabTest';
import { BillingTransactionItem } from '../../billing/shared/billing-transaction-item.model';
import { RadEmailModel } from './rad-email.model';
//Note: mapping is done here by blservice, component will only do the .subscribe().
@Injectable()
export class ImagingBLService {
  constructor(public imagingDLService: ImagingDLService,
    public billingDLService: BillingDLService,
    public securityService: SecurityService) {
  }


  public GetFilmTypeData(){
    return this.imagingDLService.GetFilmTypeData()
    .map((responseData) => {
      return responseData;
    });
  }

  //this returns a promise, the calling component can subscribe and do the needful
  //get the items by type
  //imaging-requisition.component
  public GetItemsByType(typeId: number) {
    return this.imagingDLService.GetItemsByType(typeId)
      .map((responseData) => {
        return responseData;
      });
  }
  //imaging-requisition.component
  //gets selected patient's requisitions despite of the status.
  //Method below is commented as it is not in use.
  // public GetPatientImagingRequisitions(patientId: number, orderStatus: string) {
  //   return this.imagingDLService.GetPatientImagingRequisitions(patientId, orderStatus)
  //     ;

  // }
  //imaging-requisition.component
  //gets types of imaging in radiology
  public GetImagingTypes() {
    return this.imagingDLService.GetImagingTypes();
  }
  //imaging-report.component
  //gets all the active requisitions and pending reports
  public GetImagingReqsAndReportsByStatus(fromDate: string, toDate: string, typeList: Array<number>) {
    var reqOrderStatus = "active";
    var reportOrderStatus = "pending";
    let typeListStr = JSON.stringify(typeList);
    return this.imagingDLService.GetImagingReqsAndReportsByStatus(reqOrderStatus, reportOrderStatus, typeListStr, fromDate, toDate)
      ;
  }



  //imaging-result.component
  //gets reports of selected patient
  //Method below is commented as it is not in use.
  // public GetPatientReports(patientId) {
  //   var reportOrderStatus = "final";
  //   return this.imagingDLService.GetPatientReports(patientId, reportOrderStatus)
  //     ;
  // }

  //gets dicom Image list
  public GetDicomImageList(PatientStudyId) {
    return this.imagingDLService.GetDicomImageList(PatientStudyId)
      ;
  }
  //imaging-result.component
  //gets reports of selected patient
  public GetAllImagingReports(frmDate, toDate, typeList: Array<number>) {
    var reportOrderStatus: string = "final";
    let typeStr = JSON.stringify(typeList);
    return this.imagingDLService.GetAllImagingReports(reportOrderStatus, frmDate, toDate, typeStr)
      ;
  }
  public GetImagingReportByRequisitionId(requisitionId: number) {
    return this.imagingDLService.GetImagingReportByRequisitionId(requisitionId)
      ;
  }

  public GetDoctorsList() {
    return this.billingDLService.GetDoctorsList()
      ;
  }

  //gets all the imaging types
  // Method below is commented as it has no references
  // public GetImagingType() {
  //   return this.imagingDLService.GetImagingType()
  //     ;
  // }
  public GetEmpPreference(employeeId) {

    return this.imagingDLService.GetEmpPreference(employeeId)
      
  }
  //public GetReportingDoctor(imagingTypeId) {

  //    return this.imagingDLService.GetReportingDoctor(imagingTypeId)
  //        
  //}
  //get ReportText, imageNames, imageFolderpath by Id from imgRequisition or imgReport table
  public GetImagingReportContent(isRequisitionReport, id) {
    try {
      return this.imagingDLService.GetImagingReportContent(isRequisitionReport, id)
        ;
    } catch (exception) {
      throw exception;
    }
  }
  public GetAllReportTemplates() {
    return this.imagingDLService.GetAllReportTemplates()
      
  }
  public GetDoctorList() {
    return this.imagingDLService.GetDoctorList()
      
  };
  //Get scanned imaging files list for add to report
  //get data from pac server
  GetImgFileList(fromDate: string, toDate: string) {
    try {
      return this.imagingDLService.GetImgFileList(fromDate, toDate)
        ;
    } catch (exception) {
      throw exception;
    }
  }
  //get report text by Imaging report id from report table
  //Method below is commented as it is not in use.
  // GetReportTextByImagingReportId(ImagingReportId) {
  //   try {
  //     return this.imagingDLService.GetReportTextByImagingReportId(ImagingReportId)
  //       ;
  //   } catch (exception) {
  //     throw exception;
  //   }
  // }
  //Get dicom viewer url and open dicom viewer
  //Method below is commented as it is not in use.
  // GetDICOMViewerByImgRptId(ImagingReportId, PatientStudyId) {
  //   try {
  //     return this.imagingDLService.GetDICOMViewerByImgRptId(ImagingReportId, PatientStudyId)
  //       ;
  //   } catch (exception) {
  //     throw exception;
  //   }
  // }
  //imaging-requisition.component 
  //post requisition items
  public PostRequestItems(reqItemList: Array<ImagingItemRequisition>) {
    return this.imagingDLService.PostRequestItems(reqItemList)
      .map((responseData) => {
        return responseData;
      });
  }

  //imaging-report.component 
  //posts the report of an item
  public PostItemReport(itemReport: ImagingItemReport) {
    return this.imagingDLService.PostItemReport(itemReport)
      ;
  }

  //imaging-requisition.component
  //Posts to BillingRequisitionTable after posting to imagingRequisitionTable
  public PostToBilling(reqItemList: Array<ImagingItemRequisition>) {
    let currentUser: number = 1;//logged in doctor
    let billItems: Array<BillItemRequisition> = new Array<BillItemRequisition>();

    reqItemList.forEach(img => {
      billItems.push({
        BillItemRequisitionId: 0,
        ItemId: img.ImagingItemId,
        RequisitionId: img.ImagingRequisitionId,
        ItemName: img.ImagingItemName,
        ProcedureCode: img.ProcedureCode,
        //RequestedBy: currentUser,
        ServiceDepartmentId: 0,
        PatientId: img.PatientId,
        PatientVisitId: img.PatientVisitId,
        ServiceDepartment: img.ImagingTypeName,
        DepartmentName: "Radiology",
        Quantity: 1,
        PerformerId: img.PrescriberId,
        CreatedBy: this.securityService.GetLoggedInUser().EmployeeId,
        CreatedOn: moment().format('YYYY-MM-DD'),
        Price: 0,//check for proper price and change it later.
        AssignedTo: img.PrescriberId//need to change this later on.. sud: 20may
      });
    });
    return this.billingDLService.PostBillingItemRequisition(billItems)
      
  }
  //imaging-report.component
  //post report 
  public AddImgItemReport(filesToUpload, imgReport: ImagingItemReport, orderStatus: string, enableProviderUpdate: boolean) {
    try {
      let input = new FormData();
      //localFolder storage address for the file ex. Radiology\X-Ray
      var localFolder: string = "Radiology\\" + imgReport.ImagingTypeName;
      var fileName: string;
      imgReport.ImageName = "";//make it empty since we're replacing the existing images everytime.
      //patient object was included to display it's details on client side
      //it is not necessary during post
      var omited = _.omit(imgReport, ['Patient']);

      //we've to encode uri since we might have special characters like , / ? : @ & = + $ #  etc in our report value. 
      var reportDetails = JSON.stringify(omited);//encodeURIComponent();


      let uploadedImgCount = 0;
      //ImageName can contain names of more than one image seperated by ;
     
      if (imgReport.ImageName) {
        uploadedImgCount = imgReport.ImageName.split(";").length;
      }

      if (filesToUpload) {
        for (var i = 0; i < filesToUpload.length; i++) {
          //to get the imagetype
          let splitImagetype = filesToUpload[i].type.split("/");
          let imageExtension = splitImagetype[1];
          //fileName = PatientId_ImagingItemName_PatientVisitId_CurrentDateTime_Counter.imageExtension
          fileName = imgReport.PatientId + "_" + imgReport.ImagingItemId + "_" + imgReport.PatientVisitId + "_" + moment().format('YYYY-MM-DD_HHmm') + "_" + (i + uploadedImgCount) + "." + imageExtension;
          input.append("uploads", filesToUpload[i], fileName);
        }
      }

      if (enableProviderUpdate) {
        input.append("enableProviderEditInBillTxnItem", "true");
      } else {
        input.append("enableProviderEditInBillTxnItem", "false");
      }
      //pending reports has ImagingReportId
      //new reports does not has ImagingReportId
      //if ImagingReportId is present then update item.
      input.append("reportDetails", reportDetails);
      input.append("localFolder", localFolder);
      input.append("orderStatus", orderStatus);
      
      if (imgReport.ImagingReportId)
        return this.imagingDLService.PutImgItemReport(input)
          ;
      //else post the item
      else
        return this.imagingDLService.PostImgItemReport(input)
          ;
    } catch (exception) {
      throw exception;
    }
  }

  public sendEmail(email: RadEmailModel) {
    let data: RadEmailModel = new RadEmailModel();
    data = Object.assign(data, email);
    var omited = _.omit(data, ['RadEmailValidator']);
    return this.imagingDLService.SendEmail(omited)
      ;
  }



  //attach Imaging files with report
  AddImagingPatientStudyToReport(reportData: ImagingItemReport) {
    try {
      reportData.Patient = null;
      if (reportData.ImagingReportId)
        return this.imagingDLService.PutPatientStudy(reportData)
          ;
      //else post the item
      else
        return this.imagingDLService.PostPatientStudy(reportData)
          ;
    } catch (exception) {
      throw exception;
    }
  }
  //delete imaging report selected images by ImagingReportId
  DeleteImgsByImgingRptId(reportModelData) {
    try {
      return this.imagingDLService.DeleteImgsByImagingRptId(reportModelData)
        ;
    } catch (exception) {
      throw exception;
    }
  }



  //start: sud-5Feb'18--For Ward Billing--



  //To Update Tables to cancel the LabTest Request for Inpatient
  CancelInpatientCurrentLabTest(currentInpatientLabTest: InPatientLabTest) {
    let data = JSON.stringify(currentInpatientLabTest);
    return this.imagingDLService.CancelInpatientCurrentLabTest(data)
      ;
  }

  public CancelRadRequest(item: BillingTransactionItem) {
    var temp = _.omit(item, ['ItemList', 'BillingTransactionItemValidator', 'Patient']);
    let data = JSON.stringify(temp);
    return this.imagingDLService.CancelRadRequest(data)
      .map((responseData) => {
        return responseData;
      });
  }
  public CancelBillRequest(item: BillingTransactionItem) {
    var temp = _.omit(item, ['ItemList', 'BillingTransactionItemValidator', 'Patient']);
    let data = JSON.stringify(temp);
    return this.imagingDLService.CancelBillRequest(data)
      .map((responseData) => {
        return responseData;
      });
  }

  //start: sud:5Feb'19--for radiology ward billing
  public GetRadiologyBillingItems() {
    return this.imagingDLService.GetRadiologyBillingItems()
      ;
  }
  //end: sud:5Feb'19--for radiology ward billing

  //end: sud-5Feb'18--For Ward Billing--

  //Update ReferredBy Doctor
  PutDoctor(prescriberId: number, prescriberName: string, reqId: number) {
    return this.imagingDLService.PutDoctor(prescriberId, prescriberName, reqId)
      ;
  }

  PutScannedDetails(reqId) {
    return this.imagingDLService.PutScannedDetails(reqId)
      ;
  }

}

