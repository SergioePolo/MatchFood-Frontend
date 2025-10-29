import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interfaces/restaurant';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiceRestaurants {
  private _httpClient = inject(HttpClient);
  private apiURL = environment.appURL;

  createRestaurant(restaurantToCreate: Restaurant){
    return this._httpClient.post(`${this.apiURL}/restaurant`, restaurantToCreate);
  };
  
  searchRestaurants(){
    return this._httpClient.get(`${this.apiURL}/restaurant`);
  };

  updateRestaurant(restaurantToUpdate: Restaurant, id: string){
    return this._httpClient.put(`${this.apiURL}/restaurant/${id}`, restaurantToUpdate);
  };

  deleteRestaurant(id: string){
    return this._httpClient.delete(`${this.apiURL}/restaurant/${id}`);
  };

  searchRestaurantById(id: string){
    return this._httpClient.get(`${this.apiURL}/restaurant/getById/${id}`);
  };
}
