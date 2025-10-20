import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-register-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './restaurant-register-form.html',
  styleUrl: './restaurant-register-form.css'
})
export class RestaurantRegisterForm {
  _router = inject (Router);
  restaurantForm = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),
    password : new FormControl(''),
    city  : new FormControl(''),
    address : new FormControl('')
  })

  handleSubmit(){
    const name = this.restaurantForm.value.name;
    const email = this.restaurantForm.value.email;
    const phone = this.restaurantForm.value.phone;
    const password = this.restaurantForm.value.password;
    const city = this.restaurantForm.value.city;
    const address = this.restaurantForm.value.address;

    console.log(name, email, phone, password, city, address);
  }
}
