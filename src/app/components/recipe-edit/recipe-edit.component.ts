import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { PhotoService, RecipeService } from '../../services';
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
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    if (this.recipe == null) {
      this.recipe = new Recipe();
    }

    this.editRecipeForm = this.formBuilder.group({
      title: '',
      description: '',
      ingredients: this.formBuilder.array([
        this.formBuilder.group({ ingredient: '' })
      ]),
      steps: this.formBuilder.array([
        this.formBuilder.group({ step: '' })
      ])
    });
  }

  onSubmit(): void {
    if (this.photoFile) {
      this.photoService.uploadPhoto(this.photoFile).subscribe(uploadResult => {
        uploadResult.downloadURL$.subscribe(url => {
          this.recipe.photoURL = url;
          console.log(this.recipe.photoURL);
          this.saveRecipe();
        });
      });
    } else {
      // TODO: Do we want to let users save without a photo?
      this.saveRecipe();
    }
  }

  saveRecipe(): void {
    const toSave: Recipe = {
      ...this.recipe,
      title: this.editRecipeForm.value.title,
      description: this.editRecipeForm.value.description,
      ingredients: this.editRecipeForm.value.ingredients.map(x => x.ingredient),
      steps: this.editRecipeForm.value.steps.map(x => x.step)
    };

    this.recipeService.save(toSave);
  }

  onFileInputChange(data: any): void {
    if (data.target.files) {
      this.photoFile = data.target.files[0];
    } else {
      this.photoFile = null;
    }
  }

  addIngredient(): void {
    this.ingredientsFormArray.push(this.formBuilder.group({ ingredient: '' }));
  }

  addStep(): void {
    this.stepsFormArray.push(this.formBuilder.group({ step: '' }));
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
