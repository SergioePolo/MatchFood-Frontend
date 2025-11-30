import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private _LoginService = inject(LoginService);

  isLoggedIn: boolean = this._LoginService.isLoggedIn();

  // Método para obtener el rol del usuario
  get userRole(): string | false {
    return this._LoginService.roleValidation();
  }

  // Verifica si el usuario es un restaurante
  get isRestaurant(): boolean {
    return this.userRole === 'restaurant';
  }

  // Verifica si el usuario es un usuario normal
  get isUser(): boolean {
    return this.userRole === 'user';
  }

  logout() {
    this._LoginService.logout();
    this.isLoggedIn = this._LoginService.isLoggedIn(); 
  }
}