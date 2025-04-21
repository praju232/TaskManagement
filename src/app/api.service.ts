import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(status?: string): Observable<any[]> {
    if (status) {
      return this.http.get<any[]>(`${this.apiUrl}?status=${status}`);
    }
    return this.http.get<any[]>(this.apiUrl);
  }

 
  createTask(task: any): Observable<any> {
    // Add a timestamp to the task
    const taskWithStatus = {
      ...task,
      createdAt: new Date().toISOString(),
      id: Date.now().toString() // Generate a unique ID
    };
    return this.http.post<any>(this.apiUrl, taskWithStatus);
  }
  updateTask(id: string, task: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
