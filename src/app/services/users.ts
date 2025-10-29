import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsers {
  private _httpClient = inject(HttpClient);
  private apiURL = environment.appURL;  

  createUser(userToCreate: User) {
    return this._httpClient.post(`${this.apiURL}/users`, userToCreate);
  }

  searchUsers() {
    return this._httpClient.get(`${this.apiURL}/users`);
  }

  updateUsers(userToUpdate: User, id: string) {
    return this._httpClient.put(`${this.apiURL}/users/${id}`, userToUpdate);
  }

  deleteUser(id: string) {
    return this._httpClient.delete(`${this.apiURL}/users/${id}`);
  }

  getUserById(id: string): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<User>(`${this.apiURL}/users/${id}`, { headers });
  }
}