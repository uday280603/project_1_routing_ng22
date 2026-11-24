import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const roleBaseAccessControlGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let role = _authService.getUserRole();
  let roleArray = route.data['roles'];

  return roleArray.includes(role);
};
