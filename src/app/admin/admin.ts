import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
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
