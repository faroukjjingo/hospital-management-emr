import { Injectable } from '@angular/core';
import { SterilizationEndpoint } from './sterilization.endpoint';

@Injectable()
export class SterilizationService {
  constructor(private _sterilizationEndpoint: SterilizationEndpoint) { }
  getAllPendingCSSDTransactions(fromDate, toDate) {
    return this._sterilizationEndpoint.getAllPendingCSSDTransactions(fromDate, toDate);
  }
  getAllFinalizedCSSDTransactions(fromDate, toDate) {
    return this._sterilizationEndpoint.getAllFinalizedCSSDTransactions(fromDate, toDate);
  }
  disinfectCSSDItem(cssdTxnId, disinfectantName, disinfectionRemarks) {
    // disinfectantName = JSON.stringify(disinfectantName);
    // disinfectionRemarks = JSON.stringify(disinfectionRemarks);
    return this._sterilizationEndpoint.disinfectCSSDItem(cssdTxnId, disinfectantName, disinfectionRemarks);
  }
  dispatchCSSDItem(cssdTxnId, dispatchRemarks) {
    dispatchRemarks = JSON.stringify(dispatchRemarks);
    return this._sterilizationEndpoint.dispatchCSSDItem(cssdTxnId, dispatchRemarks);
  }
}
