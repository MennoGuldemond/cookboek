import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@app/models';
import { AuthService } from '@auth/services';
import { UserService } from '@auth/services/user.service';
import { RecipeService } from '@recipe/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newestRecipe$: Observable<Recipe>;

  constructor(private recipeService: RecipeService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.newestRecipe$ = this.recipeService.getNewest();
  }

  onRecipeClick(recipe: Recipe): void {
    if (recipe) {
      this.router.navigate([`recepten/detail/${recipe.id}`]);
    }
  }

  test() {
    console.log('test');
    this.userService.getUsers().subscribe((x) => console.log(x));
    // this.auth.SignIn();
  }
}
