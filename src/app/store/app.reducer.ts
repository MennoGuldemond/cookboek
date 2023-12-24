import { createReducer, on } from '@ngrx/store';
import { setCategories, setTheme, setUserPreferences } from './app.actions';
import { AppState } from './app.selectors';

export const initialState: AppState = {
  theme: 'light-theme',
  userPreferences: { theme: '' },
  categories: [],
};

const _appReducer = createReducer(
  initialState,
  on(setTheme, (state, { theme }) => {
    return { ...state, theme: theme };
  }),
  on(setUserPreferences, (state, { userPreferences }) => {
    return { ...state, userPreferences: userPreferences };
  }),
  on(setCategories, (state, { categories }) => {
    return { ...state, categories: categories };
  })
);

export function appReducer(state: any, action: any): AppState {
  return _appReducer(state, action);
}
