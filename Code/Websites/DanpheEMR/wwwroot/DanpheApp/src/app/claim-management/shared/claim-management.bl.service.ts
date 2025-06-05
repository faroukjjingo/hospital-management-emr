import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ClaimBillReviewDTO } from './DTOs/ClaimManagement_BillReview_DTO';
import { InsuranceClaimPayment } from './DTOs/ClaimManagement_ClaimPayment_DTO';
import { InsurancePendingClaim } from './DTOs/ClaimManagement_PendingClaims_DTO';
import { SubmittedClaimDTO } from './DTOs/ClaimManagement_SubmittedClaim_DTO';
import { BillingCreditBillItem_DTO } from './DTOs/billing-credit-bill-item.dto';
import { PharmacyCreditBillItem_DTO } from './DTOs/pharmacy-credit-bill-item.dto';
import { ClaimManagementDLService } from './claim-management.dl.service';

@Injectable()

export class ClaimManagementBLService {

  constructor(
    private claimManagementDLService: ClaimManagementDLService
  ) { }

  //#region Get
  public GetInsuranceApplicableCreditOrganizations() {
    return this.claimManagementDLService.GetInsuranceApplicableCreditOrganizations()
      
  }

  public GetBillReviewList(FromDate: string, ToDate: string, CreditOrganizationId: number) {
    return this.claimManagementDLService.GetClaimReviewList(FromDate, ToDate, CreditOrganizationId)
      ;
  }

  public CheckClaimCode(claimCode: number) {
    return this.claimManagementDLService.CheckClaimCode(claimCode)
      ;
  }

  public GetClaimSubmissionPendingList(CreditOrganizationId: number) {
    return this.claimManagementDLService.GetClaimSubmissionPendingList(CreditOrganizationId)
      ;
  }

  public GetInvoicesByClaimSubmissionId(ClaimSubmissionId: number) {
    return this.claimManagementDLService.GetInvoicesByClaimSubmissionId(ClaimSubmissionId)
      ;
  }

  public GetDocumentForPreviewByFileId(FileId: number) {
    return this.claimManagementDLService.GetDocumentForPreviewByFileId(FileId)
      ;
  }

  public GetDocumentsByClaimCode(ClaimCode: number) {
    return this.claimManagementDLService.GetDocumentsByClaimCode(ClaimCode)
      ;
  }

  public GetPaymentPendingClaims(CreditOrganizationId: number) {
    return this.claimManagementDLService.GetPaymentPendingClaims(CreditOrganizationId)
      ;
  }

  public GetInsurancePayments(claimSubmissionId: number) {
    return this.claimManagementDLService.GetInsurancePayments(claimSubmissionId)
      ;
  }

  public ClaimDetailsForPreview(claimSubmissionId: number) {
    return this.claimManagementDLService.ClaimDetailsForPreview(claimSubmissionId)
      ;
  }

  public GetBillingCreditNotesByBillingTransactionId(BillingTransactionId: number) {
    return this.claimManagementDLService.GetBillingCreditNotesByBillingTransactionId(BillingTransactionId)
      ;
  }

  public GetPharmacyCreditNotesByInvoiceId(InvoiceId: number) {
    return this.claimManagementDLService.GetPharmacyCreditNotesByInvoiceId(InvoiceId)
      ;
  }

  public GetBillingCreditBillItems(BillingTransactionId: number) {
    return this.claimManagementDLService.GetBillingCreditBillItems(BillingTransactionId)
      ;
  }

  public GetPharmacyCreditBillItems(PharmacyInvoiceId: number) {
    return this.claimManagementDLService.GetPharmacyCreditBillItems(PharmacyInvoiceId)
      ;
  }

  public GetApiIntegrationNameByOrganizationId(OrganizationId: number) {
    return this.claimManagementDLService.GetApiIntegrationNameByOrganizationId(OrganizationId)
      ;
  }


  //Hitting Other Controller than Claim Management
  public GetBankList() {
    return this.claimManagementDLService.GetBankList()
      ;
  }

  public GetInvoiceReceiptByInvoiceId(invoiceId: number) {
    return this.claimManagementDLService.GetInvoiceReceiptByInvoiceId(invoiceId);
  }

  public GetPharmacySaleReturnInvoiceItemsByInvoiceId(invoiceId: number) {
    return this.claimManagementDLService.GetPharmacySaleReturnInvoiceItemsByInvoiceId(invoiceId)
      ;
  }

  public GetPatientsWithVisitsInfo(searchTxt) {
    return this.claimManagementDLService.GetPatientsWithVisitsInfo(searchTxt)
      ;
  }
  //#endregion


  //#region Post
  public SendBillForClaimScrubbing(bills: Array<ClaimBillReviewDTO>) {
    return this.claimManagementDLService.SendBillForClaimScrubbing(bills)
      ;
  }

  public SubmitClaim(claimDTO: SubmittedClaimDTO) {
    return this.claimManagementDLService.SubmitClaim(claimDTO)
      ;
  }

  public AddInsuranceClaimPayment(claimPaymentObject: InsuranceClaimPayment) {
    return this.claimManagementDLService.AddInsuranceClaimPayment(claimPaymentObject)
      ;
  }
  //#endregion


  //#region Put
  public UpdateClaimableStatus(bills: Array<ClaimBillReviewDTO>, claimableStatus: boolean) {
    return this.claimManagementDLService.UpdateClaimableStatus(bills, claimableStatus)
      ;
  }

  public UpdateClaimableStatusOfClaimedInvoice(bill: ClaimBillReviewDTO, claimableStatus: boolean) {
    return this.claimManagementDLService.UpdateClaimableStatusOfClaimedInvoice(bill, claimableStatus)
      ;
  }

  public RevertInvoiceBackToBillReview(bill: ClaimBillReviewDTO) {
    return this.claimManagementDLService.RevertInvoiceBackToBillReview(bill)
      ;
  }

  public SaveClaimAsDraft(claimDTO: SubmittedClaimDTO) {
    return this.claimManagementDLService.SaveClaimAsDraft(claimDTO)
      ;
  }

  public UpdateClaimableCode(bills: Array<ClaimBillReviewDTO>, claimCode: number) {
    return this.claimManagementDLService.UpdateClaimableCode(bills, claimCode)
      ;
  }

  public UpdateApprovedAndRejectedAmount(claimDTO: InsurancePendingClaim) {
    return this.claimManagementDLService.UpdateApprovedAndRejectedAmount(claimDTO)
      ;
  }

  public ConcludeClaim(claimSubmissionId: number) {
    return this.claimManagementDLService.ConcludeClaim(claimSubmissionId)
      ;
  }

  public RevertClaimBackToClaimScrubbing(claimSubmissionId: number) {
    return this.claimManagementDLService.RevertClaimBackToClaimScrubbing(claimSubmissionId)
      ;
  }

  public UpdateBillingCreditItemClaimableStatus(BillingCreditBillItem: BillingCreditBillItem_DTO) {
    let temp = _.omit(BillingCreditBillItem, ['ItemName', 'Quantity', 'TotalAmount']);
    return this.claimManagementDLService.UpdateBillingCreditItemClaimableStatus(temp)
      ;
  }

  public UpdatePharmacyCreditItemClaimableStatus(PharmacyCreditBillItem: PharmacyCreditBillItem_DTO) {
    let temp = _.omit(PharmacyCreditBillItem, ['ItemName', 'Quantity', 'TotalAmount']);
    return this.claimManagementDLService.UpdatePharmacyCreditItemClaimableStatus(temp)
      ;
  }

  public UpdateInsuranceClaimPayment(claimPaymentObject: InsuranceClaimPayment) {
    return this.claimManagementDLService.UpdateInsuranceClaimPayment(claimPaymentObject)
      ;
  }
  //#endregion
  public GetECHSPatientWithVisitInformation(searchTxt) {
    return this.claimManagementDLService.GetECHSPatientWithVisitInformation(searchTxt)
      ;
  }

}
