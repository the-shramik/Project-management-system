import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  
  // Add a new task
  public addTask(form: any): Observable<any> {
    return this.http.post(BASE_URL + "/taskmgt/addTask", form);
  }

  // Get all tasks
  public getAllTasks(): Observable<any> {
    return this.http.get(BASE_URL + "/taskmgt/getAllTasks");
  }

  // Get all pending tasks
  public getPendingTasks(): Observable<any> {
    return this.http.get(BASE_URL + "/taskmgt/getAllPendingTasks");
  }

  public getCompletedTasks(): Observable<any> {
    return this.http.get(BASE_URL + "/taskmgt/getAllCompletedTasks");
  }
  public getTasksByProject(projectId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/taskmgt/getTasksByProject/${projectId}`);
   
  }

  public getTasksByStatus(status: string): Observable<any> {
    return this.http.get(`${BASE_URL}/taskmgt/getTasksByStatus/${status}`);
  }
}
