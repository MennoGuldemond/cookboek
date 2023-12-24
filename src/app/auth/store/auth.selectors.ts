import { SocialUser } from '@abacritt/angularx-social-login';
import { User } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  user: SocialUser;
  userData: User;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectUserData = createSelector(selectAuthState, (state) => state.userData);
export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.user != null);
