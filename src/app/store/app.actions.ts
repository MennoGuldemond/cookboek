import { createAction, props } from '@ngrx/store';
import { UserPreferences } from '@app/models';

export const APP_SET_THEME = '[App] setTheme';
export const APP_SET_USER_PREFERENCES = '[App] setUserPreferences';

export const setTheme = createAction(APP_SET_THEME, props<{ value: string }>());
export const setUserPreferences = createAction(APP_SET_USER_PREFERENCES, props<{ value: UserPreferences }>());
