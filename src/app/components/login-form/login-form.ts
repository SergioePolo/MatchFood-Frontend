import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})

export class LoginForm {

  private _serviceLogin = inject(LoginService);

  loginAppForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required])
  })

  handleSubmit() {
    if (this.loginAppForm.invalid) {
      this.loginAppForm.markAllAsTouched();
      return;
    }

    const loginCredentials: Credentials = {
      emailLogin: this.loginAppForm.value.email ?? '',
      passwordLogin: this.loginAppForm.value.password ?? '',
      role: this.loginAppForm.value.role ?? ''
    };

    this._serviceLogin.login(loginCredentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        Swal.fire({
          title: 'Welcome',
          text: res.msg,
          icon: 'success',
          confirmButtonText: 'Continuemos'
        });
        this._serviceLogin.redirectTo();
      },
      error: (e: any) => {
        Swal.fire({
          title: 'Error',
          text: e.error.mensaje,
          icon: 'error',
          confirmButtonText: 'Intenta otra vez'
        });
      }
    });
  }
}