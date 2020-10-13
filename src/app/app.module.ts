import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';

import {
  NavBarComponent,
  RecipeDetailComponent,
  RecipeListComponent,
  RecipeEditComponent,
  HomeComponent,
  NotFoundComponent,
  LoginComponent,
  AccountComponent,
  RecipeCardComponent,
  YesNoDialogComponent,
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailComponent,
    NavBarComponent,
    RecipeListComponent,
    RecipeEditComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    AccountComponent,
    RecipeCardComponent,
    YesNoDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [
    { provide: BUCKET, useValue: environment.firebase.storageBucket },
  ],
  bootstrap: [AppComponent],
  entryComponents: [YesNoDialogComponent],
})
export class AppModule {}
