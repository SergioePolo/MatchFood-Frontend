import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { ServiceUsers } from '../../services/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register-form',
  imports: [ ReactiveFormsModule],
  templateUrl: './user-register-form.html',
  styleUrl: './user-register-form.css'
})
export class UserRegisterForm { 
  
  private _router = inject(Router);
  private _userService = inject(ServiceUsers);

  userRegisterForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    preferences: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  handleSubmit(){
    if(this.userRegisterForm.invalid){
      this.userRegisterForm.markAllAsTouched();
      return;
    }
    const userForm : User = {
      firstName: this.userRegisterForm.value.firstName || '',
      lastName: this.userRegisterForm.value.lastName || '',
      email: this.userRegisterForm.value.email || '',
      phone: this.userRegisterForm.value.phone || '',
      password: this.userRegisterForm.value.password || '',
      city: this.userRegisterForm.value.city || '',
      preferences: this.userRegisterForm.value.preferences || '',
      address: this.userRegisterForm.value.address || '',
      role: 'user'
    }

    this._userService.createUser(userForm).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: 'Bienvenido',
          icon: 'success',
          text: res.mensaje,
        }).then(()=>{
          this._router.navigate(['/inicio-de-sesion']);
        })
      },
      error:(e:any)=>{
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
