import { createReducer, on } from '@ngrx/store';
import { setUser } from './auth.actions';
import { AuthState } from './auth.selectors';

export const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, action) => {
    return { ...state, user: action.value };
  })
);

export function authReducer(state: any, action: any): AuthState {
  return _authReducer(state, action);
}
