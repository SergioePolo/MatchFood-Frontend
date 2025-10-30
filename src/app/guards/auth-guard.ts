import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // 👈 Importa SweetAlert2

export const authGuard: CanActivateFn = (route, state) => {
  const _LoginService = inject(LoginService);
  const _router = inject(Router);

  if(!_LoginService.isLoggedIn()){
    Swal.fire({
      title: 'Inicio de sesión requerido',
      text: 'Para ver todo el contenido debes iniciar sesion con tu usuario',
      icon: 'warning',
      showConfirmButton: false,
      showCancelButton: false,
      timer: 2000, 
      timerProgressBar: true,
    });
    _router.navigate(['/inicio-de-sesion']);
    return false;
  }

  if(!_LoginService.roleValidation()){
    Swal.fire({
      title: 'Acceso denegado',
      text: 'No puedes acceder a esta página. Si crees que es un error, contacta con el administrador del sistema',
      icon: 'error',
      showConfirmButton: false,
      showCancelButton: false,
      timer: 2000, 
      timerProgressBar: true,
     
    });
    _router.navigate(['/administracion']);
    return false;
  }
  
  return true;
};