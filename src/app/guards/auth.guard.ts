import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  
  if (token) { 
    return true;
  } else {
    console.log('Acceso denegado. Redirigiendo a login...');
    router.navigate(['/login']);
    return false;
  }
};