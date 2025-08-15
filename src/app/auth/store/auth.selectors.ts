import { SocialUser } from '@abacritt/angularx-social-login';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocalStorageKeys, User, UserInfo } from '@app/models';
import { isTokenexpired } from '@auth/auth.utils';

export interface AuthState {
  user: SocialUser;
  userData: User;
  userInfo: UserInfo;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectUserData = createSelector(selectAuthState, (state) => state.userData);
export const selectUserInfo = createSelector(selectAuthState, (state) => state.userInfo);
export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.user != null);
export const selectIsTokenExpired = createSelector(selectAuthState, (state) => {
  return isTokenexpired(localStorage.getItem(LocalStorageKeys.idToken));
});
