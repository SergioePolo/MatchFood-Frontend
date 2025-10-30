import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginService } from './login';
import { Reserve } from '../interfaces/reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private _httpClient = inject(HttpClient);
  private apiURL = environment.appURL;


  createReserve(reserveToCreate: Reserve) {
    return this._httpClient.post(`${this.apiURL}/reserves/crear`, reserveToCreate);
  }

  listReserves() {
    return this._httpClient.get(`${this.apiURL}/reserves`);
  }

  getReservesByUser(id: string) {
    return this._httpClient.get(`${this.apiURL}/reserves/mis-reservas/${id}`);
  }

  listReservesByRestaurant(id: string) {
    return this._httpClient.get(`${this.apiURL}/reserves/restaurante/${id}`);
  }
}