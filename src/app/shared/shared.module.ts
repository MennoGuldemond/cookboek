import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { ChipAutocompleteComponent } from './components';

@NgModule({ declarations: [ChipAutocompleteComponent],
    exports: [CommonModule, ReactiveFormsModule, MaterialModule, ChipAutocompleteComponent], imports: [CommonModule, MaterialModule, ReactiveFormsModule], providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }, provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule {}
