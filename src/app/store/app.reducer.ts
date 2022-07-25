import { createReducer, on } from '@ngrx/store';
import { setTheme, setUserPreferences } from './app.actions';
import { AppState } from './app.selectors';

export const initialState: AppState = {
  theme: 'light-theme',
  userPreferences: { theme: '' },
};

const _appReducer = createReducer(
  initialState,
  on(setTheme, (state, { value }) => {
    return { ...state, theme: value };
  }),
  on(setUserPreferences, (state, { value }) => {
    return { ...state, userPreferences: value };
  })
);

export function appReducer(state: any, action: any): AppState {
  return _appReducer(state, action);
}
