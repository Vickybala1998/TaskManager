import { Component } from '@angular/core';
import { TaskManagerServiceService } from '../task-manager-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
notificationDetails:any=[];

constructor(private service:TaskManagerServiceService){
  this.service.getNotification().subscribe((x)=>{
    console.log(x);
    this.notificationDetails=x;
  })
}
}
