import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private _LoginService = inject(LoginService);
  
  isLoggedIn : boolean = this._LoginService.isLogggedIn();

}
