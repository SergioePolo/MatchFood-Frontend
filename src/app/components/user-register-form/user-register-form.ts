import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import { ServiceUsers } from '../../services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './user-register-form.html',
  styleUrl: './user-register-form.css'
})
export class UserRegisterForm { 
  
  private _router = inject(Router);
  private _userService = inject(ServiceUsers);
  
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  userRegisterForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required]),
    preferences: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  // Getters para facilitar validaciones en el template
  get firstName() { return this.userRegisterForm.get('firstName'); }
  get lastName() { return this.userRegisterForm.get('lastName'); }
  get email() { return this.userRegisterForm.get('email'); }
  get phone() { return this.userRegisterForm.get('phone'); }
  get password() { return this.userRegisterForm.get('password'); }
  get city() { return this.userRegisterForm.get('city'); }
  get preferences() { return this.userRegisterForm.get('preferences'); }
  get address() { return this.userRegisterForm.get('address'); }

  handleSubmit() {
    // Limpiar mensaje de error
    this.errorMessage.set('');

    // Validar formulario
    if (this.userRegisterForm.invalid) {
      this.userRegisterForm.markAllAsTouched();
      this.errorMessage.set('Por favor completa todos los campos correctamente');
      return;
    }

    this.isLoading.set(true);

    const userForm: User = {
      firstName: this.userRegisterForm.value.firstName || '',
      lastName: this.userRegisterForm.value.lastName || '',
      email: this.userRegisterForm.value.email || '',
      phone: this.userRegisterForm.value.phone || '',
      password: this.userRegisterForm.value.password || '',
      city: this.userRegisterForm.value.city || '',
      preferences: this.userRegisterForm.value.preferences || '',
      address: this.userRegisterForm.value.address || '',
      role: 'user'
    };

    this._userService.createUser(userForm).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: '¡Bienvenido!',
          icon: 'success',
          text: res.mensaje || 'Usuario creado exitosamente',
          confirmButtonColor: '#FFD700'
        }).then(() => {
          this._router.navigate(['/inicio-de-sesion']);
        });
      },
      error: (e: any) => {
        console.error('Error al crear usuario:', e);
        const errorMsg = e.error?.mensaje || 'Error al crear el usuario. Intenta nuevamente.';
        
        this.errorMessage.set(errorMsg);
        
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: errorMsg,
          confirmButtonText: 'Intenta nuevamente',
          confirmButtonColor: '#E97451'
        });
        
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}