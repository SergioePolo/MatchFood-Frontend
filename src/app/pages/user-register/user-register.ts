import { Component } from '@angular/core';
import { UserRegisterForm } from '../../components/user-register-form/user-register-form';

@Component({
  selector: 'app-user-register',
  imports: [UserRegisterForm],
  templateUrl: './user-register.html',
  styleUrl: './user-register.css'
})
export class UserRegister {

}
