import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GoogleAuthService } from '@app/services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(GoogleAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    if (state.url) {
      // Save the url the user was navigating to.
      localStorage.setItem('urlBeforeLogin', state.url);
    }
    router.navigate(['login']);
    return false;
  }
};
