import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';

import { AuthModule } from '@auth/auth.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from '@store/app.reducer';
import { AppEffects } from '@store/app.effects';
import { environment } from '@env/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import {
  HomeComponent,
  UserQuickMenuComponent,
  AccountComponent,
  NotFoundComponent,
  YesNoDialogComponent,
} from './components';
import { RecipeModule } from '@recipe/recipe.module';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserQuickMenuComponent,
    AccountComponent,
    NotFoundComponent,
    YesNoDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RecipeModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }],
  bootstrap: [AppComponent],
  entryComponents: [YesNoDialogComponent],
})
export class AppModule {}
