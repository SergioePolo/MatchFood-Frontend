import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  constructor(
    private router: Router,
    private _loginService: LoginService
  ) {}

  logout() {
    this._loginService.logout();
  }

  abrirUsuarios() {
    this.router.navigate(['/admin/user-admin']);
  }

  abrirRestaurantes() {
    this.router.navigate(['/admin/restaurantes']);
  }
}
