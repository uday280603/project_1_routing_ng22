import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let _token = _authService.getToken();
  let _routerService = inject(Router);
  if (_token) {
    return true;
  }
  return _routerService.navigate(['/login']);
};
