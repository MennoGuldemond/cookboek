import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService, UserService } from '@auth/services';
import { logout, AUTH_SET_USER, setUser, AUTH_GET_USER_DATA, getUserData, AUTH_SET_USER_DATA } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this.authService.signOut().pipe(
          map(() => {
            localStorage.removeItem('id_token');
            this.router.navigate(['/']);
            return { type: AUTH_SET_USER, user: null };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUser),
      map((action) => {
        const urlBeforeLogin = localStorage.getItem('urlBeforeLogin');
        if (action.user.idToken) {
          localStorage.setItem('id_token', action.user.idToken);
        }
        if (urlBeforeLogin) {
          this.router.navigate([urlBeforeLogin]);
          localStorage.removeItem('urlBeforeLogin');
        } else {
          this.router.navigate(['home']);
        }
        return { type: AUTH_GET_USER_DATA };
      })
    )
  );

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserData),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map((userData) => {
            return { type: AUTH_SET_USER_DATA, userData: userData };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
