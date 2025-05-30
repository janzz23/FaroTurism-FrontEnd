import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GuiaService {
  apiUri = '/app/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}
  getGuias(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'getGuias'


    );
  }

  getGuia(id: string): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'getGuiaById/' + id

      // no pasamos headers: el browser pone multipart/form-data con el boundary
    );
  }
}
