import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { ChipAutocompleteComponent } from './components';

@NgModule({
  imports: [CommonModule, HttpClientModule, MaterialModule, ReactiveFormsModule],
  declarations: [ChipAutocompleteComponent],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule, ChipAutocompleteComponent],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
})
export class SharedModule {}
