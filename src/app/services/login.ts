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

  login(loginCredentials: Credentials) {
    return this._httpClient.post(`${this.apiUrl}/login`, loginCredentials);
  }

  // Guardar token después de hacer login
  saveToken(token: string) {
    localStorage.setItem('token', token);

    // 🔍 Decodificar token para guardar id y rol del usuario
    const decoded: any = jwtDecode(token);
    if (decoded.id) {
      localStorage.setItem('userId', decoded.id);
    }
    if (decoded.role) {
      localStorage.setItem('role', decoded.role);
    }
  }

  // Obtener token actual
  getToken() {
    return localStorage.getItem('token'); 
  }

  // Obtener el rol del usuario
  roleValidation() {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    } else {
      console.log('No se encontró token');
      return false;
    }
  }

  // Obtener ID del usuario desde token o localStorage
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.id || decoded._id || localStorage.getItem('userId');
    }
    return null;
  }


  redirectTo() {
    const role = this.roleValidation();

    if (role === 'admin') {
      this._router.navigate(['/dashboard']);
    } else if (role === 'restaurant') {
      this._router.navigate(['/perfil-del-restaurante']);
    } else {
      this._router.navigate(['/inicio']);
    }
  }

 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    alert('Cierre de sesión exitoso, ¡Vuelve pronto!');
    this._router.navigate(['/']);
  }

 
  isLoggedIn() {
    return !!this.getToken();
  }
}
