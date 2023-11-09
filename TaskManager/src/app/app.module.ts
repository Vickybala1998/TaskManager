import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
//import{RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserAccountComponent } from './user-account/user-account.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatDialogModule} from '@angular/material/dialog';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HomeComponent } from './home/home.component';
import{MatIconModule} from '@angular/material/icon';
import { NotificationComponent } from './notification/notification.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserAccountComponent,
    RegistrationComponent,
    CreateTaskComponent,
    HomeComponent,
    NotificationComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    //RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
