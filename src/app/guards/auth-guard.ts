import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _LoginService = inject(LoginService);
  const _router = inject(Router);

  if(!_LoginService.isLogggedIn()){
    alert('No haz iniciado sesión, inicia tu sesión para poder accerder al sistema');
    _router.navigate(['/inicio-de-sesion']);
    return false;
  }

  if(!_LoginService.isAdmin()){
    alert('No puedes acceder a está página, si crees que es un error contacta con el administrador del sistema');
    _router.navigate(['/administracion']);
    return false;
  }
  
  return true;
};