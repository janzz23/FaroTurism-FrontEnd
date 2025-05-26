import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUri = 'app/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri + 'register',
      data
      // no pasamos headers: el browser pone multipart/form-data con el boundary
    );
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUri + 'login', data, {
      headers: this.httpOptions,
    });
  }
}
