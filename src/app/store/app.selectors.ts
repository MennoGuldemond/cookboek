import { createSelector } from '@ngrx/store';
import { UserPreferences } from '@app/models';

export interface AppState {
  theme: string;
  userPreferences: UserPreferences;
}

export const selectAppState = (state) => state.app;

export const selectTheme = createSelector(selectAppState, (state: AppState) => state.theme);
export const selectUserPreferences = createSelector(selectAppState, (state: AppState) => state.userPreferences);
