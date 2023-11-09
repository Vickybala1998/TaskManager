import { Component } from '@angular/core';
import { TaskManagerServiceService } from '../task-manager-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {

  UserName:string=localStorage.getItem("UserName")??" ";
  UserDetails:any=[]
  image:any;
  imagearray:any;
  isDisabled:boolean=true;
  isEnabled:boolean=false;
  isEditDisabled: boolean=false;
  selectedImage: File | undefined;

  finalImage: any;

  updateUserDetails =new FormGroup({
    userName: new FormControl({value:'',disabled:true}),
    email : new FormControl({value:'',disabled:true}),
    password: new FormControl({value:'',disabled:true}),
    department: new FormControl({value:'',disabled:true}),
    role: new FormControl({value:'',disabled:true}),
    imageFile: new FormControl({value:'',disabled:this.isEnabled}),
  });

  constructor(private service: TaskManagerServiceService,private sanitizer:DomSanitizer){this.getUserDetailsById()}

  //display selected image in Iframe
  onSelectedImage(event: any){
    const file:File=event.target.files[0];
    this.finalImage=file;
    console.log(file.type)
    if(file){
      const reader=new FileReader();
      reader.readAsDataURL(file);
      console.log(file,reader);
      reader.onload=(e:any)=>{
        this.selectedImage=this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result) as File;}
    }
    }
    
  
  getUserDetailsById(){
    this.service.getUserDetailsbyId(this.UserName).subscribe((x)=>{
      console.log(x);
      this.UserDetails=x
      console.log(this.UserDetails.image as number[])
      //this.convertimagetoString(this.UserDetails.image)
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.UserDetails.image);    }
   )
  }

  editDetails(){
    this.isDisabled=false;
    this.isEnabled=true;
    this.isEditDisabled=true;

    this.updateUserDetails.enable();
  }

  updateDetails(){
    console.log("update started");
    const userDetailsUpdate=new FormData();
    userDetailsUpdate.append("id",this.UserDetails.id);
    userDetailsUpdate.append("employeename",this.updateUserDetails.value.userName as string);
    userDetailsUpdate.append('email',this.updateUserDetails.value.email as string);
    userDetailsUpdate.append('password',this.updateUserDetails.value.password as string);
    userDetailsUpdate.append('department',this.updateUserDetails.value.department as string);
    userDetailsUpdate.append('role',this.updateUserDetails.value.role as string);
    console.log(this.finalImage)
    if(this.finalImage!=null || this.finalImage!= undefined)
       userDetailsUpdate.append('imageFile',this.finalImage,this.finalImage.name);

       console.log(userDetailsUpdate.get("imageFile"));
       this.service.updateUser(userDetailsUpdate).subscribe((x)=>{
        console.log(x);
       });
    
  } 
}
