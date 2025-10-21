import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceUsers } from '../../services/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-register-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './restaurant-register-form.html',
  styleUrl: './restaurant-register-form.css'
})
export class RestaurantRegisterForm {
  private _userService = inject(ServiceUsers);
  private _router = inject(Router);

  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  restaurantForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  });

  handleSubmit() {
    if (this.restaurantForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      
      const restaurantData = {
        firstName: this.restaurantForm.value.name!,
        lastName: this.restaurantForm.value.name!, 
        email: this.restaurantForm.value.email!,
        phone: this.restaurantForm.value.phone!,
        password: this.restaurantForm.value.password!,
        city: this.restaurantForm.value.city!,
        address: this.restaurantForm.value.address!,
        role: 'restaurant' 
      };

      this._userService.createUser(restaurantData as any).subscribe({
        next: (response: any) => {
          console.log('Registro exitoso:', response);
          this.successMessage.set(response.mensaje || 'Restaurante registrado exitosamente');

          
          setTimeout(() => {
            this._router.navigate(['/inicio-de-sesion']);
          }, 2000);
        },
        error: (error: any) => {
          console.error('Error en registro:', error);
          this.errorMessage.set(
            error.error?.mensaje || 'Error al registrar restaurante. Intenta nuevamente.'
          );
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      this.markFormGroupTouched(this.restaurantForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  
  get restaurantName() { return this.restaurantForm.get('name'); }
  get email() { return this.restaurantForm.get('email'); }
  get phone() { return this.restaurantForm.get('phone'); }
  get password() { return this.restaurantForm.get('password'); }
  get city() { return this.restaurantForm.get('city'); }
  get address() { return this.restaurantForm.get('address'); }
}