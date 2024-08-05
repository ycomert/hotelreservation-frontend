import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  addEvent(event: any): Observable<any> {
    const token = localStorage.getItem('token'); // Token'i local storage'dan al
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post(`${this.baseUrl}/event/createevent`, event, { headers });
  }

  getEvents(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get(`${this.baseUrl}/event/getevents/${userId}`, { headers });
  }
}


