import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Restaurant } from '../../interfaces/restaurant';
import { ServiceRestaurants } from '../../services/restaurants';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-register-form',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './restaurant-register-form.html',
  styleUrls: ['./restaurant-register-form.css']
})
export class RestaurantRegisterForm {

  private _router = inject(Router);
  private _serviceRestaurant = inject(ServiceRestaurants);

  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  restaurantRegistrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  })

  get password() {
    return this.restaurantRegistrationForm.get('password');
  }

  get name() {
    return this.restaurantRegistrationForm.get('name');
  }

  get email() {
    return this.restaurantRegistrationForm.get('email');
  }

  get phone() {
    return this.restaurantRegistrationForm.get('phone');
  }

  get city() {
    return this.restaurantRegistrationForm.get('city');
  }

  get address() {
    return this.restaurantRegistrationForm.get('address');
  }

  handleSubmit() {
    if (this.restaurantRegistrationForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const restaurantForm: Restaurant = {
        name: this.restaurantRegistrationForm.value.name || '',
        email: this.restaurantRegistrationForm.value.email || '',
        phone: this.restaurantRegistrationForm.value.phone || '',
        city: this.restaurantRegistrationForm.value.city || '',
        address: this.restaurantRegistrationForm.value.address || '',
        password: this.restaurantRegistrationForm.value.password || '',
        role: 'restaurant'
      };

      this._serviceRestaurant.createRestaurant(restaurantForm as any).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Bienvenido',
            icon: 'success',
            text: res.mensaje,
          }).then(() => {
            this._router.navigate(['/inicio-de-sesion']);
          });
        },
        error: (e: any) => {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: e.error.mensaje,
            confirmButtonText: 'Intenta nuevamente'
          });
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.markFormGroupTouched(this.restaurantRegistrationForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  get restaurantName() { return this.restaurantRegistrationForm.get('name'); }
  get email() { return this.restaurantRegistrationForm.get('email'); }
  get phone() { return this.restaurantRegistrationForm.get('phone'); }
  get password() { return this.restaurantRegistrationForm.get('password'); }
  get city() { return this.restaurantRegistrationForm.get('city'); }
  get address() { return this.restaurantRegistrationForm.get('address'); }
}
