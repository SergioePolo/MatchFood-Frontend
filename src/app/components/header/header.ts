import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';
import { ServiceUsers } from '../../services/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private _LoginService = inject(LoginService);
  private _userService = inject(ServiceUsers);
  
  profilePicture: string = '';
  urlData: string = environment.appURL; // Better to use environment variable
  isLoggedIn: boolean = this._LoginService.isLoggedIn();

  logout() {
    this._LoginService.logout();
    this.isLoggedIn = this._LoginService.isLoggedIn();
  }

  async bringData() {
    try {
      const tokenData = await this._LoginService.roleValidation();
      if (tokenData) {
        this._userService.getUserById(tokenData.id).subscribe({
          next: (res: any) => {
            this.profilePicture = res.data.profilePicture || '';
          },
          error: (err: any) => {
            console.error("Error fetching user data:", err);
          }
        });
      }
    } catch (error) {
      console.error("Error validating token:", error);
    }
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.bringData();
    }
  }
}