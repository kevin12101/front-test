import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http : HttpClient) { }

  
  post(path: string, data: any): any {
    return this.http
    .post<any>(`${environment.API}${path}`, data)
    .pipe(map((d) => d['data'][0]));
  }

  get(path: string, data?: any): any {
    console.log(data);
    
    return this.http.get<any>(`${environment.API}${path}`, data).pipe(map((data) =>data));
  }

  delete(path: string): any {
  return this.http
    .delete<any>(`${environment.API}${path}`)
    .pipe(map((d) => d));
  }

  put(path: string, data: any): any {
  return this.http
    .put<any>(`${environment.API}${path}`, data)
    .pipe(map((d) => d));
  }

  postfiles(path: string, data: any): any {
    return this.http
      .post<any>(`${environment.API}${path}`, data)
      .pipe(map((data) => data));
  }

 
}

  

