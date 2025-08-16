import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { GoogleUser, Recipe, User } from '@app/models';
import { YesNoDialog } from '@app/components';
import { GoogleAuthService, RecipeService } from '@app/services';
import { LikeService } from '@app/services';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cobo-recipe-detail',
  templateUrl: './recipe-detail.html',
  styleUrls: ['./recipe-detail.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
})
export class RecipeDetail implements OnInit {
  recipe$: Observable<Recipe>;
  user: Signal<GoogleUser>;

  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private likeService = inject(LikeService);
  private authService = inject(GoogleAuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.recipe$ = this.recipeService.getById(params['id']);
      }
    });

    this.user = this.authService.user;
  }

  onEditClick(id: string) {
    this.router.navigate([`recepten/maak/${id}`]);
  }

  onDeleteClick(recipe: Recipe) {
    this.dialog
      .open(YesNoDialog, {
        data: {
          title: 'Recept verwijderen',
          text: 'Weet je zeker dat je het recept wilt verijderen?',
        },
      })
      .afterClosed()
      .subscribe((clickedYes) => {
        if (clickedYes) {
          this.recipeService.delete(recipe.id).subscribe((succeeded) => {
            if (succeeded) {
              this.snackBar.open('Het recept is verwijderd', 'Oke', { duration: 3000 });
              this.router.navigate(['recepten']);
            } else {
              this.snackBar.open('Verwijderen mislukt', 'Oke', { duration: 3000 });
            }
          });
        }
      });
  }

  onClickShare(title: string) {
    try {
      window.navigator.share({
        title: `${title} delen`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('This browser does not support the share function.');
    }
  }

  getImageURLStyle(url: string): string {
    return `url(${url})`;
  }

  isLikedByUser(user: GoogleUser, recipe: Recipe): boolean {
    return recipe.likes.find((l) => l.userId === user.id) != null;
  }

  onLikeClick(event: MouseEvent, recipe: Recipe, user: GoogleUser) {
    event.stopPropagation();
    this.likeService.save(recipe.id, user.id).subscribe((like) => {
      this.recipe$ = this.recipe$.pipe(take(1));
    });
  }

  onUnlikeClick(event: MouseEvent, recipe: Recipe, user: GoogleUser) {
    event.stopPropagation();
    const like = recipe.likes.find((l) => l.userId === user.id);
    this.likeService.delete(like.id).subscribe((success) => {
      if (success) {
        this.recipe$ = this.recipe$.pipe(take(1));
      }
    });
  }
}
