import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerServiceService {

  httpHeader:string='https://taskmanagerapi20231110124547.azurewebsites.net/';
  //httpHeader:string='https://localhost:44355/';

  constructor(private http: HttpClient) { }

  getUserDetails(){
    return this.http.get(this.httpHeader+'api/v1.0/TaskManager/user/all')
  }

  getUserDetailsbyId(UserName:string){
    return this.http.get(this.httpHeader+'api/v1.0/TaskManager/user/search/'+UserName);
  }

  login(form:any){
    return this.http.post(this.httpHeader+'api/v1.0/TaskManager/login',form,{observe:'response'})
  }

  registration(registerFrom:FormData, file:File){
    return this.http.post(this.httpHeader+'api/v1.0/TaskManager/user/register',registerFrom,{ observe:'response'})
  }


  updateUser(user:FormData){
    return this.http.put(this.httpHeader+'api/v1.0/TaskManager/user/update',user,{ observe:'response'})
  }

  createTask(Task:any){
    return this.http.post(this.httpHeader+'api/v1.0/TaskManager/createTask',Task,{observe:'response'})
  }

  updateTask(Task:FormData){
    return this.http.put(this.httpHeader+'api/v1.0/TaskManager/updateTask',Task,{observe:'response'})
  }

  getTaskDetails(){
    return this.http.get(this.httpHeader+'api/v1.0/TaskManager/getTaskDetails')
  }

  getTaskDetailsById(id:any){
    return this.http.get(this.httpHeader+'api/v1.0/TaskManager/getTaskDetailsById/'+id)
  }

  deleteTaskDetails(id:any){
    return this.http.delete(this.httpHeader+'api/v1.0/TaskManager/deleteTask/'+id,{observe:'response'})
  }
  createNotification(notificationForm:FormData)
  {
    return this.http.post(this.httpHeader+'api/v1.0/TaskManager/createNotification/',notificationForm,{observe:'response'})
  }

  getNotification(){
    return this.http.get(this.httpHeader+'api/v1.0/TaskManager/getNotification');
  }
}
