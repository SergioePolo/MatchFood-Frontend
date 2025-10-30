import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  private _loginService = inject(LoginService);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  });

  handleSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const role = this.loginForm.value.role;

      // Preparar credenciales para el backend
      const credentials: Credentials = {
        emailLogin: email!,
        passwordLogin: password!,
        role: role!
      };

      this._loginService.login(credentials).subscribe({
        next: (response: any) => {
          // Guardar token
          localStorage.setItem('token', response.token);
          Swal.fire({
            title: 'Bienvenido',
            text: response.mensaje,
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: false,
          }).then(() => {
            this._loginService.redirectTo();
          });
        },
        error: (error: any) => {
          console.error('Error en login:', error);
          Swal.fire({
            title: 'Error',
            text: error.error?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.',
            icon: 'error',
            confirmButtonText: 'Intenta otra vez'
          });
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
        Swal.fire({
          title: 'Campo requerido',
          text: 'Por favor selecciona uno de los dos tipos de usuarios antes de enviar el formulario',
          icon: 'warning',
          confirmButtonText: 'Entendido'
        });
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