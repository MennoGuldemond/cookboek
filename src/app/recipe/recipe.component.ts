import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaginationSettings, RecipeInfo } from '@app/models';
import { RecipeService } from './services';

@Component({
  selector: 'cobo-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  recipes$: Observable<RecipeInfo[]>;
  searchForm: FormGroup;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', [Validators.minLength(3)]),
    });

    this.recipes$ = this.recipeService.get(null);
  }

  onSubmit(): void {
    const paginationSettings: PaginationSettings = {
      name: this.searchForm.value.searchTerm,
      authorId: null,
      skip: 0,
      take: 30,
    };

    this.recipes$ = this.recipeService.get(paginationSettings);
  }
}
