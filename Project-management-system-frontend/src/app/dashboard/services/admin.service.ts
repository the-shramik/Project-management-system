import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  public adduser(form:any):Observable<any>{
    return this.http.post(BASE_URL +"/taskmgt/addUser",form);
  }
  public getAllGroups():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/allGroups")
  }
  public getAllPermissionsById(id:any):Observable<any>{
    return this.http.get(`${BASE_URL}/taskmgt/getPermissionById/${id}`)
   
  }
  public getGroupById(id:any):Observable<any>{
    return this.http.get(`${BASE_URL}/taskmgt/getGroupById/${id}`)
  }
  public getAllUser():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/getAllUser")
  }
  public updatePermissions(permission:any):Observable<any>{
    return this.http.put(BASE_URL +"/taskmgt/updatePermissions", permission);
  }
  public add_adminGroup(data:any):Observable<any>{
    return this.http.post(BASE_URL +"/taskmgt/addGroup", data)
  }
}
