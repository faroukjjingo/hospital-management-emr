import { Injectable, Directive } from '@angular/core';
import { NotificationViewModel } from "./notification.model"
import { NotificationDLService } from "./notification.dl.service"
import * as _ from 'lodash';

@Injectable()
export class NotificationBLService {
    constructor(
        public notificationdlserv: NotificationDLService,
    ) {
    }

    //Get Notification 
    public GetNotification() {
        return this.notificationdlserv.GetNotification()
            ;
    }
    public GetNotificationVisitDetail(notificationId:number) {
        return this.notificationdlserv.GetNotificationVisitDetail(notificationId)
            ;
    }

    ///updating Notification
    public MarkNotificationAsRead(messageList: Array<NotificationViewModel>) {
        let messageString = JSON.stringify(messageList);
        return this.notificationdlserv.PutNotificationIsRead(messageString)
            ;
    }

    ///updating Notification
    public MarkNotificationAsArchived(messageList: Array<NotificationViewModel>) {
        let messageString = JSON.stringify(messageList);
        return this.notificationdlserv.PutNotificationIsArchived(messageString)
            ;
    }



}
