import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class DesignationsService {
  constructor(private http:HttpClient) { }
  
  public adddesignations(form:any):Observable<any>{
    return this.http.post(BASE_URL +"/taskmgt/addDesignation",form);
  }

  public getAllDesignations():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/getAllDesignations");

  }

   public getAllCategories():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/getAllCategories");
    
  }

  public updateDesignation(data: FormData): Observable<any> {
    return this.http.patch(BASE_URL + '/taskmgt/updateDesignation', data);
  }

  public deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/taskmgt/deleteCategory/${categoryId}`);
  }
}
