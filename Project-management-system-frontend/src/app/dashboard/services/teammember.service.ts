import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class TeammemberService {

  constructor(private http:HttpClient) { }
  
  public addTeamMember(form:any):Observable<any>{
    return this.http.post(BASE_URL +"/taskmgt/addTeamMember",form);
  }

  public getAllTeamMember():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/getAllTeamMember");
  }
  
  public getAllDesignations():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/getAllDesignations");
  }

  public updateTeamMember(formData: FormData): Observable<any> {
    return this.http.patch(BASE_URL + '/taskmgt/updateTeamMember', formData);
  }

 

  public deleteTeamMember(teamMemberId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/taskmgt/deleteTeamMember/${teamMemberId}`);
  }

}
