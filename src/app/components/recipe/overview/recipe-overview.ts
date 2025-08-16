import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaginationSettings, RecipeInfo } from '@app/models';
import { RecipeService } from '@app/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RecipeGrid } from '../grid/recipe-grid';

@Component({
  selector: 'cobo-recipe',
  templateUrl: './recipe-overview.html',
  styleUrls: ['./recipe-overview.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RecipeGrid,
  ],
})
export class RecipeOverview {
  recipes$: Observable<RecipeInfo[]>;
  searchForm: FormGroup;

  private recipeService = inject(RecipeService);

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
}
