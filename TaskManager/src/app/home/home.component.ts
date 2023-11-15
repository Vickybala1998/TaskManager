import { Component } from '@angular/core';
import{MatDialog} from '@angular/material/dialog';
import{CreateTaskComponent} from '../create-task/create-task.component'
import { TaskManagerServiceService } from '../task-manager-service.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  taskDetails:any=[];
  constructor(private dialog:MatDialog, private service:TaskManagerServiceService, private router: Router){
    this.service.getTaskDetails().subscribe((x)=>{
      console.log(x)
      this.taskDetails=x;
      console.log(this.taskDetails)
    })
  }
  openPopup():void{
    this.dialog.open(CreateTaskComponent,{disableClose:true,data:{Id:null,isCreate:true,isView:false,isUpdate:false}})
  }

  viewTask(id:any){
    console.log(id);
    this.dialog.open(CreateTaskComponent,{disableClose:true,data:{Id:id,isCreate:false,isView:true,isUpdate:false}})
  }

  updateTask(id:any){
    console.log(id);
    this.dialog.open(CreateTaskComponent,{disableClose:true,data:{Id:id,isCreate:false,isView:false,isUpdate:true}})
  }

  deleteTask(id:any){
    const dialogref=this.dialog.open(ConfirmationDialogComponent,
      {
        width:'350px',
        data:{'title':"confirmation",'message':"Are you sure want to delete the task?"}});

        dialogref.afterClosed().subscribe((result)=>{
          if(result==0){
            this.service.deleteTaskDetails(id).subscribe((x)=>{
              if(x.status==200){
                this.router.navigateByUrl('Home').then((x)=>{
                  window.location.reload();})
              }
            });
            
          }
          else{
            dialogref.close();
          }
        })
  }
}
