import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  apiUri = '/app/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  postReserva(reservaForm: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + this.apiUri + 'crearReserva',
      reservaForm,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }

  getReserva(id: string): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'getReserva/' + id

      // no pasamos headers: el browser pone multipart/form-data con el boundary
    );
  }
}
