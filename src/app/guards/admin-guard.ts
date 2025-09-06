import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '@app/services';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  if (userService.isAdmin()) {
    return true;
  } else {
    // TODO: show unauthorized message
    return false;
  }
};
