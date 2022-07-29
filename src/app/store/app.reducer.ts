import { createReducer, on } from '@ngrx/store';
import { setTheme, setUserPreferences } from './app.actions';
import { AppState } from './app.selectors';

export const initialState: AppState = {
  theme: 'light-theme',
  userPreferences: { theme: '' },
};

const _appReducer = createReducer(
  initialState,
  on(setTheme, (state, { theme }) => {
    return { ...state, theme: theme };
  }),
  on(setUserPreferences, (state, { userPreferences }) => {
    return { ...state, userPreferences: userPreferences };
  })
);

export function appReducer(state: any, action: any): AppState {
  return _appReducer(state, action);
}
