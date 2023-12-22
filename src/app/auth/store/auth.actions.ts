import { SocialUser } from '@abacritt/angularx-social-login';
import { IUser } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const AUTH_LOGOUT = '[Auth] logout';
export const AUTH_GET_USER = '[Auth] getUser';
export const AUTH_SET_USER = '[Auth] setUser';
export const AUTH_GET_USER_DATA = '[Auth] getUserData';
export const AUTH_SET_USER_DATA = '[Auth] setUserData';

export const logout = createAction(AUTH_LOGOUT);
export const getUser = createAction(AUTH_GET_USER);
export const setUser = createAction(AUTH_SET_USER, props<{ user: SocialUser }>());
export const getUserData = createAction(AUTH_GET_USER_DATA);
export const setUserData = createAction(AUTH_SET_USER_DATA, props<{ userData: IUser }>());
