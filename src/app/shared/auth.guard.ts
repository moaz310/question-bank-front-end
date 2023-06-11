import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if(authService.getAccessToken() && (localStorage.getItem(authService.USER_ROLE) === route.data['role'] || route.data['role']=== undefined)){
    return true;
  }
  router.navigate(['']);
  return false;
};
