import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskManagerServiceService } from '../task-manager-service.service';
import { Route, Router } from '@angular/router';
import{DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  selectedImage: File | undefined;

  finalImage: any;
  name:string='';
  registrationForm =new FormGroup({
    userName : new FormControl(),
    email : new FormControl(),
    password: new FormControl(),
    department: new FormControl(),
    role: new FormControl(),
    imageFile: new FormControl(),
  });

  constructor(private service: TaskManagerServiceService, private router: Router,private sanitizer:DomSanitizer){}

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
    
    register()
    {
      this.name=this.registrationForm.value.userName;
      const image:File=this.registrationForm.value.imageFile as File;
      const formdata=new FormData();
      formdata.append('employeename',this.registrationForm.value.userName);
      formdata.append('email',this.registrationForm.value.email);
      formdata.append('password',this.registrationForm.value.password);
      formdata.append('department',this.registrationForm.value.department);
      formdata.append('role',this.registrationForm.value.role);
      formdata.append('imageFile',this.finalImage,this.finalImage.name)

    
      console.log(formdata.get('email'))
      this.service.registration(formdata,this.finalImage).subscribe((x)=>{
        if(x.status==200){
          console.log("Register Successful");
          this.router.navigateByUrl("Login");
        }
      })
    }     
    }


