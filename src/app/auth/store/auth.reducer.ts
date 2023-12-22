import { createReducer, on } from '@ngrx/store';
import { setUser, setUserData } from './auth.actions';
import { AuthState } from './auth.selectors';

export const initialState: AuthState = {
  user: null,
  userData: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, action) => {
    return { ...state, user: action.user };
  }),
  on(setUserData, (state, action) => {
    return { ...state, userData: action.userData };
  })
);

export function authReducer(state: any, action: any): AuthState {
  return _authReducer(state, action);
}
