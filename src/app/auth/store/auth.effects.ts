import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService, UserService } from '@auth/services';
import { Store } from '@ngrx/store';
import {
  logout,
  AUTH_SET_USER,
  setUser,
  AUTH_GET_USER_DATA,
  getUserData,
  AUTH_SET_USER_DATA,
  AUTH_SET_USER_INFO,
  setUserData,
} from './auth.actions';
import { LocalStorageKeys } from '@app/models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this.authService.signOut().pipe(
          map(() => {
            localStorage.removeItem(LocalStorageKeys.idToken);
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
        const urlBeforeLogin = localStorage.getItem(LocalStorageKeys.urlBeforeLogin);
        if (action.user?.idToken) {
          localStorage.setItem(LocalStorageKeys.idToken, action.user.idToken);
        }
        if (urlBeforeLogin) {
          this.router.navigate([urlBeforeLogin]);
          localStorage.removeItem(LocalStorageKeys.urlBeforeLogin);
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

  setUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUserData),
      mergeMap((action) => {
        return this.userService.getInfo(action.userData.id).pipe(
          map((userInfo) => {
            return { type: AUTH_SET_USER_INFO, userInfo: userInfo };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
