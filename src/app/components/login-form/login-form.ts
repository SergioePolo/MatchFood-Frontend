
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
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  private _loginService = inject(LoginService);
  private _router = inject(Router);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  });

  handleSubmit() {

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const role = this.loginForm.value.role;

      this.isLoading.set(true);
      this.errorMessage.set('');

      // Preparar credenciales para el backend
      const credentials: Credentials = {
        emailLogin: email!,
        passwordLogin: password!,
        role: role!
      };

      this._loginService.login(credentials).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);
          
          // Guardar token
          localStorage.setItem('token', response.token);
          Swal.fire({
            title:'Bienvenido',
            text: response.mensaje,
            icon:'success'
          }).then(()=>{
            this._loginService.redirectTo();
          })
        },
        error: (error: any) => {
          console.error('Error en login:', error);
          this.errorMessage.set(
            error.error?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.'
          );
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      // Validar que se haya seleccionado un rol
      if (!this.loginForm.value.role) {
        alert('Por favor selecciona uno de los dos tipos de usuarios antes de enviar el formulario');
      }
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  // Getters para validación en template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get role() {
    return this.loginForm.get('role');
  }
}