import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://localhost:7243/eventId';

  constructor(private http: HttpClient) {}

  getEventId(password: string): Observable<string> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    const params = { password };

    return this.http.get<string>(`${this.apiUrl}?password=${password}`, {
      headers,
    });
  }
}
