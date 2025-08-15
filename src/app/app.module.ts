import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthModule } from '@auth/auth.module';
import { StoreModule } from '@ngrx/store';
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
  LoginComponent,
} from './components';
import { RecipeModule } from '@recipe/recipe.module';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserQuickMenuComponent,
    AccountComponent,
    NotFoundComponent,
    YesNoDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
    AuthModule,
    RecipeModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl-NL' },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.google.clientId),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    NgxImageCompressService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
