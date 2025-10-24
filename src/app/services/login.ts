import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../interfaces/credentials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; 
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.appURL;


  login(loginCredentials : Credentials){
    return this._httpClient.post(`${this.apiUrl}/login`, loginCredentials);
  }

  getToken(){
    return localStorage.getItem('token'); 
  }

  roleValidation(){
    const token = this.getToken();
    
    if(token){
      const decoded : any = jwtDecode(token);
      return decoded.role
    }else{
      console.log('No se encontró token');
      return false;
    }
  }

  redirectTo(){
    if(this.roleValidation() === 'admin'){
      this._router.navigate(['/dashboard']);
    }
    
    if(this.roleValidation() === "restaurant"){
      this._router.navigate(['/perfil-del-restaurante']);
    }
    else{
      this._router.navigate(['/inicio']);
    }
  }

  logout(){
    localStorage.removeItem('token');
    alert('Cierre de sesión exitoso, Vuelve pronto!');
    this._router.navigate(['/']);
  }

  isLogggedIn(){
    return this.getToken() ? true: false;
  }

}