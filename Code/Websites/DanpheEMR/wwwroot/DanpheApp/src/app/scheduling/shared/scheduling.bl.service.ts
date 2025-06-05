import { Injectable, Directive } from '@angular/core';
import * as _ from 'lodash';
import { SchedulingDLService } from './scheduling.dl.service';
import { ShiftsMasterModel } from './shifts-master.model';
import { WorkingHoursTxnVM } from "./scheduling-view.models";

@Injectable()
export class SchedulingBLService {

    constructor(public schDLservice: SchedulingDLService) {

    }


    //                        *** GET ***

    //GET : List of Employees
    public GetEmployeeList() {
        return this.schDLservice.GetEmployeeList()
            ;
    }
    //GET : assigned or default schedule of selected employees
    public GetEmpSchedule(selectedEmpIds: string, dates: Array<any>) {
        return this.schDLservice.GetEmpSchedule(selectedEmpIds, dates)
            ;
    }
    //GET: list of shifts
    public GetShiftsList() {
        return this.schDLservice.GetShiftsList()
            ;
    }
    //GET: list of employee working hours
    public GetEmpWHList() {
        return this.schDLservice.GetEmpWHList()
            ;
    }
    //GET: load list of shifts with 'IsDefault = true'
    public GetDefaultShifts() {
        return this.schDLservice.GetDefaultShifts();
    }
    //GET: List of Employees that doesnt have any shift assigned.(employee with no shifts)
    public GetEmployeeNoShift() {
        return this.schDLservice.GetEmployeeNoShift();
    }

    //                      *** POST ***

    //POST : employee schedules
    public AddEmpSchedule(temp) {
        return this.schDLservice.PostEmpSchedule(temp)
            ;
    }
    //POST: insert shift  to shiftmaster
    public AddShift(temp) {
        var data = _.omit(temp, ['ShiftValidator']);
        return this.schDLservice.AddShift(data)
            ;
    }
    //insert-update employee working hours
    public EmpWorkingHours(workHrsTxn: WorkingHoursTxnVM) {
        var shifttemp = [];
        workHrsTxn.Shifts.forEach(a => {
            var temp = _.omit(a, ['ShiftValidator']);
            shifttemp.push(temp);
        });
        workHrsTxn.Shifts = shifttemp;
        return this.schDLservice.EmpWorkingHours(workHrsTxn)
            ;
    }

    //                  *** PUT ***

    //update shift of shift master
    public UpdateShift(shift: ShiftsMasterModel) {
        var temp = _.omit(shift, ['ShiftValidator']);
        return this.schDLservice.UpdateShift(temp)
            ;
    }


}