import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CategoryService, ThemingService } from '@app/services';
import { APP_SET_CATEGORIES, getCategories, setTheme } from './app.actions';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  setTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setTheme),
      mergeMap((action) => {
        this.themingService.applyTheme(action.theme);
        return of({ type: 'NO_ACTION' });
      })
    )
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      mergeMap(() => {
        return this.categoryService.get().pipe(
          map((categories) => {
            return { type: APP_SET_CATEGORIES, categories: categories };
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private themingService: ThemingService,
    private categoryService: CategoryService
  ) {}
}
