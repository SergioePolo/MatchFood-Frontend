import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-register-form.html',
  styleUrl: './user-register-form.css'
})
export class UserRegisterForm { 
  _router = inject(Router);
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    city: new FormControl(''),
    preferences: new FormControl(''),
    address: new FormControl(''),
  })

  handleSubmit(){
    const firstName = this.userForm.value.firstName;
    const lastName = this.userForm.value.lastName;
    const email = this.userForm.value.email;
    const phone = this.userForm.value.phone;
    const password = this.userForm.value.password;
    const city = this.userForm.value.city;
    const preferences = this.userForm.value.preferences;
    const address = this.userForm.value.address;

    if(preferences === ''){
      alert('Por favor selecciona una preferencia alimenticia');
    }

    console.log(firstName, lastName,email,phone,password,city,preferences,address);
  }
}
