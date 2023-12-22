import { SocialUser } from '@abacritt/angularx-social-login';
import { IUser } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  user: SocialUser;
  userData: IUser;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.user != null);
