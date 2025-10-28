import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})

export class LoginForm {

  private _serviceLogin = inject(LoginService);
  private _router = inject(Router);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  loginAppForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required])
  })

  handleSubmit() {
    if (this.loginAppForm.invalid) {
      const email = this.loginAppForm.value.email;
      const password = this.loginAppForm.value.password;
      const role = this.loginAppForm.value.role;

      this.isLoading.set(true);
      this.errorMessage.set('');

      const loginCredentials: Credentials = {
        emailLogin: email!,
        passwordLogin: password!,
        role: role!
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
          this.errorMessage.set(
            e.error?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.'
          );
          this.isLoading.set(false);
        },
        complete:()=>{
          this.isLoading.set(false);
        }
      });
    }
    else{
      if (!this.loginAppForm.value.role) {
        alert('Por favor selecciona uno de los dos tipos de usuarios antes de enviar el formulario');
      }
      this.markFormGroupTouched(this.loginAppForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  
  get email() {
    return this.loginAppForm.get('email');
  }

  get password() {
    return this.loginAppForm.get('password');
  }

  get role() {
    return this.loginAppForm.get('role');
  }
}