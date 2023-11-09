import { Component } from '@angular/core';
import { TaskManagerServiceService } from '../task-manager-service.service';
import { Form, FormControl, FormGroup,Validators } from '@angular/forms';
import{Router} from '@angular/router';
import{MatDialog} from '@angular/material/dialog'
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: TaskManagerServiceService, private router:Router,private dialog:MatDialog){}

  login=new FormGroup({
    Email:new FormControl('',Validators.required),
    Password:new FormControl('',Validators.required)
  })

  openPopup():void{
    this.dialog.open(CreateTaskComponent)
  }
userLogin(){
 let loginName:string=(this.login.value["Email"] as string)?.toString();
 console.log(this.login.value);
 this.service.login(this.login.value).subscribe((x)=>
 {
  console.log(x);
  if(x.status==200){
    alert("login successfull");
    console.log(x);
    localStorage.setItem("UserName",loginName)
    this.router.navigateByUrl('Useraccount')
   
  }
    else
      alert("login failed")
 })
}


}
