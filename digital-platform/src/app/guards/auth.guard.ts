import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../core/authorization.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);

  if (authorizationService.getIsUserLoggedIn()) {
    console.log('user is logged in');
    router.navigate(['/']);
    return false;
  }

  return true;
};
