import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from '../../interfaces/restaurant';
import { ServiceRestaurants } from '../../services/restaurants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './restaurant-register-form.html',
  styleUrl: './restaurant-register-form.css'
})
export class RestaurantRegisterForm {

  private _router = inject(Router);
  private _serviceRestaurant = inject(ServiceRestaurants);

  restaurantRegistrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
    if (this.restaurantRegistrationForm.invalid) {
      this.restaurantRegistrationForm.markAllAsTouched();
      return;
    }

    const restaurantForm: Restaurant = {
      name: this.restaurantRegistrationForm.value.name || '',
      email: this.restaurantRegistrationForm.value.email || '',
      phone: this.restaurantRegistrationForm.value.phone || '',
      city: this.restaurantRegistrationForm.value.city || '',
      address: this.restaurantRegistrationForm.value.address || '',
      password: this.restaurantRegistrationForm.value.password || '',
      role: 'restaurant'
    }

    this._serviceRestaurant.createRestaurant(restaurantForm).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Bienvenido',
          icon: 'success',
          text: res.mensaje,
          timer: 1500, 
          timerProgressBar: true,
          showConfirmButton: false,
          showCancelButton: false,
        }).then(() => {
          this._router.navigate(['/inicio-de-sesion']);
        })
      },
      error: (e: any) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: e.error.mensaje,
          confirmButtonText: 'Intenta nuevamente'
        })
      }
    })
  }
}
