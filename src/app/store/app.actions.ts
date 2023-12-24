import { createAction, props } from '@ngrx/store';
import { Category, UserPreferences } from '@app/models';

export const APP_SET_THEME = '[App] setTheme';
export const APP_SET_USER_PREFERENCES = '[App] setUserPreferences';
export const APP_GET_CATEGORIES = '[App] getCategories';
export const APP_SET_CATEGORIES = '[App] setCategories';

export const setTheme = createAction(APP_SET_THEME, props<{ theme: string }>());
export const setUserPreferences = createAction(APP_SET_USER_PREFERENCES, props<{ userPreferences: UserPreferences }>());
export const getCategories = createAction(APP_GET_CATEGORIES);
export const setCategories = createAction(APP_SET_CATEGORIES, props<{ categories: Category[] }>());
