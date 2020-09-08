import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PhotoService, RecipeService, AuthService } from '../../services';
import { Recipe } from '../../models';

@Component({
  selector: 'cobo-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  photoFile: File;
  editRecipeForm: FormGroup;

  get ingredientsFormArray(): FormArray {
    return this.editRecipeForm.get('ingredients') as FormArray;
  }

  get stepsFormArray(): FormArray {
    return this.editRecipeForm.get('steps') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.recipeService.getById(params.id).subscribe(recipe => {
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
    const ingredientsArray = [];
    const stepsArray = [];

    if (this.recipe.ingredients.length) {
      for (const ingredient of this.recipe.ingredients) {
        ingredientsArray.push(this.formBuilder.group({ ingredient: [ingredient, [Validators.required]] }));
      }
    } else {
      ingredientsArray.push(this.formBuilder.group({ ingredient: ['', [Validators.required]] }));
    }

    if (this.recipe.steps.length) {
      for (const step of this.recipe.steps) {
        stepsArray.push(this.formBuilder.group({ step: [step, [Validators.required]] }));
      }
    } else {
      stepsArray.push(this.formBuilder.group({ step: ['', [Validators.required]] }));
    }

    this.editRecipeForm = this.formBuilder.group({
      title: [this.recipe.title, [Validators.required]],
      description: this.recipe.description,
      ingredients: this.formBuilder.array(ingredientsArray),
      steps: this.formBuilder.array(stepsArray)
    });
  }

  onSubmit(): void {
    if (this.photoFile) {
      this.photoService.uploadPhoto(this.photoFile).subscribe(uploadResult => {
        uploadResult.downloadURL$.subscribe(url => {
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
    this.authService.user$.subscribe(user => {
      const toSave: Recipe = {
        ...this.recipe,
        title: this.editRecipeForm.value.title,
        description: this.editRecipeForm.value.description,
        ingredients: this.editRecipeForm.value.ingredients.map(x => x.ingredient),
        steps: this.editRecipeForm.value.steps.map(x => x.step)
      };
  
  
  
      if (this.recipe.id) {
        // Existing recipe
        this.recipeService.update(toSave).subscribe(id => {
          this.snackBar.open('Recept bijgewerkt', 'Oke', { duration: 3000 });
          this.router.navigate([`recipe/${id}`]);
        });
      } else {
        // New recipe
        toSave.ownerId = user.uid;
        toSave.ownerName = user.displayName;

        this.recipeService.save(toSave).subscribe(id => {
          this.snackBar.open('Recept Opgeslagen', 'Oke', { duration: 3000 });
          this.router.navigate([`recipe/${id}`]);
        });
      }
    });
  }

  onFileInputChange(data: any): void {
    if (data.target.files) {
      this.photoFile = data.target.files[0];
    } else {
      this.photoFile = null;
    }
  }

  addIngredient(): void {
    this.ingredientsFormArray.push(this.formBuilder.group({ ingredient: ['', [Validators.required]] }));
  }

  removeIngredient(index: number): void {
    this.ingredientsFormArray.removeAt(index);
  }

  addStep(): void {
    this.stepsFormArray.push(this.formBuilder.group({ step: ['', [Validators.required]] }));
  }

  removeStep(index: number): void {
    this.stepsFormArray.removeAt(index);
  }

  canAddIngredient(): boolean {
    const lastIngredientIndex = this.editRecipeForm.value.ingredients.length - 1;
    // tslint:disable-next-line:triple-equals
    return this.editRecipeForm.value.ingredients[lastIngredientIndex].ingredient != '';
  }

  canAddStep(): boolean {
    const lastStepIndex = this.editRecipeForm.value.steps.length - 1;
    // tslint:disable-next-line:triple-equals
    return this.editRecipeForm.value.steps[lastStepIndex].step != '';
  }

}
