import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeService, DeviceService, AuthService } from '../../services';
import { Recipe } from '../../models';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'cobo-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe>;

  constructor(
    public deviceService: DeviceService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.recipe$ = this.recipeService.getById(params.id);
      }
    });
  }

  onEditClick(id: string): void {
    this.router.navigate([`recipe-edit/${id}`]);
  }

  onClickShare(title: string): void {
    try {
      window.navigator.share({
        title: `${title} delen`,
        url: window.location.href
      });
    } catch (error) {
      console.log('This browser does not support the share function.');
    }
  }

  getImageURLStyle(url: string): string {
    return `url(${url});`;
  }

}
