import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports:[RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})

export class LoginForm {
  _router = inject (Router);
  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl(''),
    role : new FormControl('')
  })

  handleSubmit(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const role = this.loginForm.value.role;

    if(role === ''){
      alert("Por favor selecciona uno de los dos tipos de usuarios antes de enviar el formularios");
      /* this._router.navigate(['/']) */
    }
    console.log(email, password, role);
  }
}
