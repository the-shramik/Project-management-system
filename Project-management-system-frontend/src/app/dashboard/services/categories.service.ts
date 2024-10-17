import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }
  
  public addcategories(form:any):Observable<any>{
    return this.http.post(BASE_URL +"/taskmgt/addCategory",form);
  }

  public getAllCategories():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/getAllCategories");
  }

  public editCategory(data: FormData): Observable<any> {
    return this.http.patch(BASE_URL + '/taskmgt/updateCategory', data);
  }

  public deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/taskmgt/deleteCategory/${categoryId}`);
  }
  
 

  

}
