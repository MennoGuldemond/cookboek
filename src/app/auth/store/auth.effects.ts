import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '@auth/services';
import { logout, AUTH_SET_USER, setUser } from './auth.actions';

@Injectable()
export class AuthEffects {
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

  setUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUser),
        map((action) => {
          const urlBeforeLogin = localStorage.getItem('urlBeforeLogin');
          if (urlBeforeLogin) {
            this.router.navigate([urlBeforeLogin]);
            localStorage.removeItem('urlBeforeLogin');
          }
          if (action.user.idToken) {
            localStorage.setItem('id_token', action.user.idToken);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
