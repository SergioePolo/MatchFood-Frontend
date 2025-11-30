import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../interfaces/restaurant';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiceRestaurants {
  private _httpClient = inject(HttpClient);
  private apiURL = environment.appURL;

  createRestaurant(restaurantToCreate: Restaurant): Observable<Restaurant> {
    return this._httpClient.post<Restaurant>(`${this.apiURL}/restaurant`, restaurantToCreate);
  }
  
  searchRestaurants(): Observable<Restaurant[]> {
    return this._httpClient.get<Restaurant[]>(`${this.apiURL}/restaurant`);
  }

  updateRestaurant(restaurantToUpdate: Restaurant, id: string): Observable<Restaurant> {
    return this._httpClient.put<Restaurant>(`${this.apiURL}/restaurant/${id}`, restaurantToUpdate);
  }

  deleteRestaurant(id: string): Observable<any> {
    return this._httpClient.delete(`${this.apiURL}/restaurant/${id}`);
  }

  searchRestaurantById(id: string): Observable<Restaurant> {
    return this._httpClient.get<Restaurant>(`${this.apiURL}/restaurant/getById/${id}`);
  }
}