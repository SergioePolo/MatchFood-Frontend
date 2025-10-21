import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceUsers } from '../../services/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './user-register-form.html',
  styleUrl: './user-register-form.css'
})
export class UserRegisterForm {
  private _userService = inject(ServiceUsers);
  private _router = inject(Router);

  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required]),
    categories: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    role: new FormControl('user') 
  });

  handleSubmit() {
    if (this.userForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

     
      const userData = {
        firstName: this.userForm.value.firstName!,
        lastName: this.userForm.value.lastName!,
        email: this.userForm.value.email!,
        phone: this.userForm.value.phone!,
        password: this.userForm.value.password!,
        city: this.userForm.value.city!,
        categories: this.userForm.value.categories || undefined,
        address: this.userForm.value.address!,
        role: 'user'
      };

      this._userService.createUser(userData as any).subscribe({
        next: (response: any) => {
          console.log('Registro exitoso:', response);
          this.successMessage.set(response.mensaje || 'Usuario creado exitosamente');

          
          setTimeout(() => {
            this._router.navigate(['/inicio-de-sesion']);
          }, 2000);
        },
        error: (error: any) => {
          console.error('Error en registro:', error);
          this.errorMessage.set(
            error.error?.mensaje || 'Error al crear usuario. Intenta nuevamente.'
          );
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      
      if (!this.userForm.value.categories) {
        alert('Por favor selecciona una preferencia alimenticia');
      }
      this.markFormGroupTouched(this.userForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get password() { return this.userForm.get('password'); }
  get city() { return this.userForm.get('city'); }
  get address() { return this.userForm.get('address'); }
}