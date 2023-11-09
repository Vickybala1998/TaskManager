import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'Useraccount',component:UserAccountComponent},
  {path:'Registration',component:RegistrationComponent},
  {path:'Notification',component:NotificationComponent},
  {path:'',redirectTo:'Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
