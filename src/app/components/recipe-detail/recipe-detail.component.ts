import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeService } from '../../services';
import { Recipe } from '../../models';


@Component({
  selector: 'cobo-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe$: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.recipe$ = this.recipeService.getById(params.id);
      }
   });
  }

  onEditClick(id: string): void {
    this.router.navigate([`recipe-edit/${id}`]);
  }

}
