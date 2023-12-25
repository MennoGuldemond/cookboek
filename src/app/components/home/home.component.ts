import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeInfo } from '@app/models';
import { RecipeService } from '@recipe/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newestRecipe$: Observable<RecipeInfo>;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.newestRecipe$ = this.recipeService.getNewest();
  }

  onRecipeClick(recipe: RecipeInfo): void {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }
}
