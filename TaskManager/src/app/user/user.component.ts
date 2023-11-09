import { Component } from '@angular/core';
import { TaskManagerServiceService } from '../task-manager-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userdetails:any=[];

  constructor(private service: TaskManagerServiceService){
    this.getAllUser();
  }
getAllUser(){
  this.service.getUserDetails().subscribe((x)=>{
    console.log(x)
    this.userdetails=x;
  });
}
}
