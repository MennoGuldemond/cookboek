import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Recipe } from '@app/models';
import { PhotoService } from '@app/services';
import { RecipeService } from '../../services';
import { Store } from '@ngrx/store';
import { AuthState, selectUser } from '@auth/store/auth.selectors';

@Component({
  selector: 'cobo-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  photoFile: File;
  editRecipeForm: FormGroup;
  imagePreviewSrc: string;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private recipeService: RecipeService,
    private store: Store<AuthState>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // TODO: find a better fix for this
    window.scrollTo(0, 0);

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.recipeService.getById(params['id']).subscribe((recipe) => {
          if (recipe) {
            this.recipe = recipe;
            this.buildForm();
          } else {
            // TODO: Should I just give an error at this point?
          }
        });
      } else {
        this.recipe = new Recipe();
        this.buildForm();
      }
    });
  }

  buildForm(): void {
    this.editRecipeForm = this.formBuilder.group({
      title: new FormControl(this.recipe.title, [Validators.required]),
      description: new FormControl(
        this.recipe.description ? this.recipe.description.replace(/<br\s*[\/]?>/gi, '\n') : ''
      ),
      instructions: new FormControl(
        this.recipe.instructions ? this.recipe.instructions.replace(/<br\s*[\/]?>/gi, '\n') : '',
        [Validators.required]
      ),
      ingredients: new FormControl(
        this.recipe.ingredients ? this.recipe.ingredients.replace(/<br\s*[\/]?>/gi, '\n') : '',
        [Validators.required]
      ),
    });
  }

  onSubmit(): void {
    if (this.photoFile) {
      this.photoService.upload(this.photoFile).subscribe((uploadResult) => {
        uploadResult.downloadURL$.subscribe((url) => {
          this.recipe.photoURL = url;
          this.saveRecipe();
        });
      });
    } else {
      // TODO: Do we want to let users save without a photo?
      this.saveRecipe();
    }
  }

  saveRecipe(): void {
    this.store.select(selectUser).subscribe((user) => {
      const toSave: Recipe = {
        ...this.recipe,
        title: this.editRecipeForm.value.title,
        description: this.editRecipeForm.value.description.replace(/\n/g, '<br>'),
        instructions: this.editRecipeForm.value.instructions.replace(/\n/g, '<br>'),
        ingredients: this.editRecipeForm.value.ingredients.replace(/\n/g, '<br>'),
      };

      if (this.recipe.id) {
        // Existing recipe
        this.recipeService.update(toSave).subscribe((id) => {
          console.log(id);
          if (id) {
            this.snackBar.open('Recept Bijgewerkt', 'Oke', { duration: 3000 });
            this.router.navigate([`recepten/detail/${id}`]);
          } else {
            this.snackBar.open('Bijwerken mislukt', 'Oke', { duration: 3000 });
          }
        });
      } else {
        // New recipe
        toSave.ownerId = user.uid;
        toSave.ownerName = user.displayName;
        toSave.likes = [];
        toSave.createdOn = new Date();

        this.recipeService.save(toSave).subscribe((id) => {
          if (id) {
            this.snackBar.open('Recept Opgeslagen', 'Oke', { duration: 3000 });
            this.router.navigate([`recepten/detail/${id}`]);
          } else {
            this.snackBar.open('Opslaan mislukt', 'Oke', { duration: 3000 });
          }
        });
      }
    });
  }

  onFileInputChange(data: any): void {
    if (data.target.files) {
      this.photoFile = data.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.photoFile);

      reader.onload = () => {
        this.imagePreviewSrc = reader.result as string;
      };
    } else {
      this.photoFile = null;
    }
  }

  // This function tries to focus on the next input
  onListEnter(event, addButton): void {
    event.preventDefault();
    event.stopPropagation();

    if (addButton) {
      addButton._elementRef.nativeElement.click();
    }

    // TODO: fix this trickery
    setTimeout(() => {
      let element =
        event.srcElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.getElementsByTagName(
          'input'
        )[0];
      if (element == null) return;
      // focus if the next input is found
      else element.focus();
    }, 1);
  }
}
