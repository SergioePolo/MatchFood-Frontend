import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginService } from './login';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private _http = inject(HttpClient);
  private _loginService = inject(LoginService);
  private apiUrl = environment.appURL;

  getReservesByUser() {
    const token = this._loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this._http.get(`${this.apiUrl}/reserves/mis-reservas`, { headers });
  }
}