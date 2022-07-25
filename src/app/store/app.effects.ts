import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { ThemingService } from '@app/services';
import { setTheme } from './app.actions';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  setTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setTheme),
      mergeMap((action) => {
        this.themingService.applyTheme(action.value);
        return of({ type: 'NO_ACTION' });
      })
    )
  );

  constructor(private actions$: Actions, private themingService: ThemingService) {}
}
