import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Recipe } from '@app/models';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cobo-recipe-list',
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.scss'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class RecipeList {
  @Input() recipes: Recipe[];
  displayedColumns: string[] = ['name', 'createdOn'];

  private router = inject(Router);

  onRecipeClick(recipe: Recipe) {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }

  onClickAdd() {
    this.router.navigate(['recepten/maak']);
  }
}
