import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../interfaces/rating';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRating {
    private _httpClient = inject(HttpClient);
    private apiURL = environment.appURL;
  
    createRating(ratingToCreate: Rating){
      return this._httpClient.post(`${this.apiURL}/rating`, ratingToCreate);
    };
    
    searchRatings(){
      return this._httpClient.get(`${this.apiURL}/rating`);
    };
  
    updateRestaurant(ratingToUpdate: Rating, id: string){
      return this._httpClient.put(`${this.apiURL}/rating/${id}`, ratingToUpdate);
    };
  
    deleteRating(id: string){
      return this._httpClient.delete(`${this.apiURL}/rating/${id}`);
    };
}
