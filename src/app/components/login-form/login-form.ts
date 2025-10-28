import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';
import { CommonModule } from '@angular/common';

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
      const credentials = {
        emailLogin: email!,
        passwordLogin: password!
      };

      this._loginService.login(credentials).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);
          
          // Guardar token
          localStorage.setItem('token', response.token);
          
          // Redirigir según el rol
          if (role === 'usuario') {
            this._router.navigate(['/inicio']);
          } else if (role === 'restaurante') {
            this._router.navigate(['/perfil-del-restaurante']);
          }
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