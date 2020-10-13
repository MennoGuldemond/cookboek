import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeService, DeviceService, AuthService } from '../../services';
import { Recipe } from '../../models';
import { YesNoDialogComponent } from '../../components';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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

  onDeleteClick(id: string): void {
    this.dialog.open(YesNoDialogComponent, {
      data: {
        title: 'Recept verwijderen',
        text: 'Weet je zeker dat je het recept wilt verijderen?'
      }
    }).afterClosed().subscribe(clickedYes => {
      if (clickedYes) {
        this.recipeService.delete(id).subscribe(succeeded => {
          if (succeeded) {
            this.snackBar.open('Het recept is verwijderd', 'Oke', { duration: 3000 });
            this.router.navigate(['recipes']);
          } else {
            this.snackBar.open('Verwijderen mislukt', 'Oke', { duration: 3000 });
          }
        });
      }
    });
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

  onLikeClick(event: MouseEvent, recipe: Recipe): void {
    event.stopPropagation();
    this.auth.user$.subscribe(user => {
      this.recipeService.addLike(recipe, user.uid);
    });
  }

  onUnlikeClick(event: MouseEvent, recipe: Recipe): void {
    event.stopPropagation();
    this.auth.user$.subscribe(user => {
      this.recipeService.removeLike(recipe, user.uid);
    });
  }

}
