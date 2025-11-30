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

  // Updated to handle both regular updates and FormData (file uploads)
  updateUsers(userData: Partial<User> | FormData, id: string | null) {
    return this._httpClient.put(`${this.apiURL}/users/${id}`, userData);
    // Note: Don't set Content-Type header for FormData - browser handles it automatically
  }

  deleteUser(id: string) {
    return this._httpClient.delete(`${this.apiURL}/users/${id}`);
  }

  getUserById(id: string) {
    return this._httpClient.get(`${this.apiURL}/users/${id}`);
  }
}