import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaginationSettings, RecipeInfo } from '@app/models';
import { BrowserUtilService, RecipeService } from '@app/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RecipeGrid } from '../grid/recipe-grid';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cobo-recipe',
  templateUrl: './recipe-overview.html',
  styleUrls: ['./recipe-overview.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RecipeGrid,
  ],
})
export class RecipeOverview {
  recipes$: Observable<RecipeInfo[]>;
  searchForm: FormGroup;

  browserUtils = inject(BrowserUtilService);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', [Validators.minLength(3)]),
    });

    this.recipes$ = this.recipeService.get(null);
  }

  onSubmit() {
    const paginationSettings: PaginationSettings = {
      name: this.searchForm.value.searchTerm,
      authorId: null,
      skip: 0,
      take: 30,
    };

    this.recipes$ = this.recipeService.get(paginationSettings);
  }

  onClickAdd() {
    this.router.navigate(['recepten/maak']);
  }
}
