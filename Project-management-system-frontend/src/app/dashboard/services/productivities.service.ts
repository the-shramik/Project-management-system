import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class ProductivitiesService {

  constructor(private http:HttpClient) { }
  
  public addProductivities(form:any):Observable<any>{
    return this.http.post(BASE_URL +"/taskmgt/addProductivity",form);
  }

  public getAllProductivities():Observable<any>{
    return this.http.get(BASE_URL +"/taskmgt/getAllProductivities");
  }

  public getProjects(): Observable<any> {
    return this.http.get(BASE_URL + "/taskmgt/getAllProjects"); // Adjust this endpoint as needed
  }


  public getProductivitiesByProject(projectId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/taskmgt/getProductivitiesByProject/${projectId}`);
   
  }

  public getProductivitiesByStatus(status: string): Observable<any> {
    return this.http.get(`${BASE_URL}/taskmgt/getProductivitiesByStatus/${status}`);
  }
  
  public updateProductivity(data: FormData): Observable<any> {
    return this.http.patch(BASE_URL + '/taskmgt/updateProductivity', data);
  }

  public deleteProductivity(productivityId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/taskmgt/deleteCategory/${productivityId}`);
  }
  
}
