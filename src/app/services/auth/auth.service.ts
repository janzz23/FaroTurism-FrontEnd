import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUri = '/app/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + this.apiUri + 'register',
      data
      // no pasamos headers: el browser pone multipart/form-data con el boundary
    );
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + this.apiUri + 'login',
      data,
      {
        headers: this.httpOptions,
        withCredentials: true, // <-- muy importante
      }
    );
  }

  logout(): Observable<any> {
    Cookies.remove('token');
    return this.http.post<any>(this.apiUri + 'logout', {});
  }

  //Comprobar si esta logeado o no
  loggedIn(): boolean {
    const token = localStorage.getItem('token'); // O usa sessionStorage si prefieres
    console.log('Token desde localStorage:', token);
    return !!token; // Devuelve true si hay token, false si no
  }

  verifyToken(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiUri + 'verify', {
      withCredentials: true,
    });
  }
}
