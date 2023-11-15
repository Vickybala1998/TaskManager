import { Component , Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import{MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaskManagerServiceService } from '../task-manager-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  isCreate:boolean=true;
  isUpdate:boolean=false;
  taskDetails:any=[];

  constructor(private dialog:MatDialog, private service: TaskManagerServiceService,private route:Router,
              @Inject(MAT_DIALOG_DATA) public data?:any ){
                console.log(data.Id)
                if(data!=null && data.Id!=null){
                  this.isCreate=false;
                  this.service.getTaskDetailsById(data.Id).subscribe((x)=>{
                    console.log(x)
                    this.taskDetails=x;
                    if(data.isView==true){
                      this.isUpdate=false;
                      this.isCreate=false;
                      this.taskForm.disable();
                    }
                    
                    else if(data.isUpdate==true){
                      this.isUpdate=true;
                      this.isCreate=false;
                      this.taskForm.enable();
                    }
                  });
                }
              }

  taskForm=new FormGroup({
    heading:new FormControl({value:'',disabled:false}),
    description: new FormControl({value:'',disabled:false}),
    startDate:new FormControl({value:'',disabled:false}),
    endDate: new FormControl({value:'',disabled:false}),
    status:new FormControl({value:'',disabled:false}),
    assignedTo:new FormControl({value:'',disabled:false})
  })

  closeDialog(){
    this.dialog.closeAll();
    
  }

  createTask(){
    this.service.createTask(this.taskForm.value).subscribe((x)=>{
    console.log(x)
    if(x.status==200){
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      const notificationForm=new FormData();
      notificationForm.append("title","new task created");
      notificationForm.append("message","new task created on today");
      notificationForm.append("date",formattedDate);
      notificationForm.append('assignedBy','admin')
      console.log(notificationForm);
      this.service.createNotification(notificationForm).subscribe();
      const dialogref=this.dialog.open(ConfirmationDialogComponent,
        {
          width:'350px',
          data:{'title':'Task Creation','message':"Task Created Successfully"}});

          dialogref.afterClosed().subscribe((result)=>{
            this.route.navigateByUrl('Home').then((x)=>{
        window.location.reload();
      })
          })
  
      
    }
   
})}

updateTask(){

  const updateTaskDetails=new FormData();
  updateTaskDetails.append("id",this.taskDetails.id);
  updateTaskDetails.append("heading",this.taskForm.value.heading as string)
  updateTaskDetails.append("description",this.taskForm.value.description as string)
  updateTaskDetails.append("startdate",this.taskForm.value.startDate as string)
  updateTaskDetails.append("enddate",this.taskForm.value.endDate as string)
  updateTaskDetails.append("status",this.taskForm.value.status as string)
  updateTaskDetails.append("assignedTo",this.taskForm.value.assignedTo as string)
  console.log(typeof(this.taskDetails.id),typeof(updateTaskDetails.get('id')))
  this.service.updateTask(updateTaskDetails).subscribe((x)=>{
    console.log(x)
    if(x.status==200){
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      const notificationForm=new FormData();
      notificationForm.append("title","task Updated");
      notificationForm.append("message","task Updated on today");
      notificationForm.append("date",formattedDate);
      notificationForm.append('assignedBy','admin')
      console.log(notificationForm);
      this.service.createNotification(notificationForm).subscribe();
}
})
  }

}
