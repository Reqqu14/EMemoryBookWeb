import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private apiUrl = 'https://localhost:7243/api/Message';

  constructor(private http: HttpClient) {}

  getMessagesByEventId(eventId: string): Observable<Message[]> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    return this.http.get<Message[]>(`${this.apiUrl}?eventId=${eventId}`, {
      headers,
    });
  }

  uploadMessage(
    eventId: string,
    userName: string,
    file: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(
      `${this.apiUrl}?eventId=${eventId}&userName=${userName}`,
      formData
    );
  }
}
