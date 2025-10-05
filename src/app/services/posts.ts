import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicePosts {
    private _httpClient = inject(HttpClient);
    private apiURL = environment.appURL;
  
    createPost(postToCreate: Post){
      return this._httpClient.post(`${this.apiURL}/post`, postToCreate);
    };
    
    searchPosts(){
      return this._httpClient.get(`${this.apiURL}/post`);
    };
  
    updatePost(postToUpdate: Post, id: string){
      return this._httpClient.put(`${this.apiURL}/post/${id}`, postToUpdate);
    };
  
    deletePost(id: string){
      return this._httpClient.delete(`${this.apiURL}/post/${id}`);
    };
}
