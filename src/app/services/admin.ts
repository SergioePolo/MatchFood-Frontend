import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class serviceAdmin {
  private _httpClient = inject(HttpClient);
  private apiURL = environment.appURL;

  searchDataAdminDashboard(){
    return this._httpClient.get(`${this.apiURL}/admin`);
  }
}
