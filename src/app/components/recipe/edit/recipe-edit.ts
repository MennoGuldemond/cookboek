import { ChangeDetectorRef, Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataUrl, NgxImageCompressService, UploadResponse } from 'ngx-image-compress';
import { Category, CategoryRecipe, Recipe } from '@app/models';
import { CategoryService, GoogleAuthService, PhotoService, RecipeService } from '@app/services';
import { ChipAutocomplete } from '../../chip-autocomplete/chip-autocomplete';

@Component({
  selector: 'cobo-recipe-edit',
  templateUrl: './recipe-edit.html',
  styleUrls: ['./recipe-edit.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ChipAutocomplete,
  ],
})
export class RecipeEdit implements OnInit {
  recipe: Recipe;
  photoFile: File;
  editRecipeForm: FormGroup;
  imagePreviewSrc: string;

  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';

  categories: Signal<Category[]>;
  categoryNames: Signal<string[]>;

  private formBuilder = inject(FormBuilder);
  private photoService = inject(PhotoService);
  private recipeService = inject(RecipeService);
  private authService = inject(GoogleAuthService);
  private categoriesService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private imageCompress = inject(NgxImageCompressService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // TODO: find a better fix for this
    window.scrollTo(0, 0);

    this.categories = this.categoriesService.categories;
    this.categoryNames = this.categoriesService.categoryNames;

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.recipeService.getById(params['id']).subscribe((recipe) => {
          if (recipe) {
            this.recipe = recipe;
            this.buildForm();
            this.cdr.detectChanges();
          } else {
            console.error('Recipe not found');
          }
        });
      } else {
        this.recipe = new Recipe();
        this.buildForm();
      }
    });
  }

  buildForm() {
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

  getInitalCategories(): string[] {
    const initialCategories = this.categories().filter((c) =>
      this.recipe.categories?.find((rc: CategoryRecipe) => rc.categoryId === c.id)
    );
    return initialCategories.map((ic) => ic.name);
  }

  onSubmit() {
    if (this.photoFile) {
      this.photoService.upload(this.photoFile).subscribe((uploadResult) => {
        this.recipe.photoURL = uploadResult.photoURL;
        this.saveRecipe();
      });
    } else if (this.recipe?.photoURL) {
      this.saveRecipe();
    }
  }

  saveRecipe() {
    const user = this.authService.user();
    const toSave: Recipe = {
      ...this.recipe,
      title: this.editRecipeForm.value.title,
      description: this.editRecipeForm.value.description.replace(/\n/g, '<br>'),
      instructions: this.editRecipeForm.value.instructions.replace(/\n/g, '<br>'),
      ingredients: this.editRecipeForm.value.ingredients.replace(/\n/g, '<br>'),
    };

    if (this.recipe.id) {
      // Existing recipe
      this.recipeService.save(toSave).subscribe((receipeResult) => {
        if (receipeResult?.id) {
          this.snackBar.open('Recept Bijgewerkt', 'Oke', { duration: 3000 });
          this.router.navigate([`recepten/detail/${receipeResult.id}`]);
        } else {
          this.snackBar.open('Bijwerken mislukt', 'Oke', { duration: 3000 });
        }
      });
    } else {
      // New recipe
      toSave.authorId = user.id;
      this.recipeService.save(toSave).subscribe((receipeResult) => {
        if (receipeResult?.id) {
          this.snackBar.open('Recept Opgeslagen', 'Oke', { duration: 3000 });
          this.router.navigate([`recepten/detail/${receipeResult.id}`]);
        } else {
          this.snackBar.open('Opslaan mislukt', 'Oke', { duration: 3000 });
        }
      });
    }
  }

  compressImage() {
    this.imageCompress.uploadFile().then(({ image, orientation, fileName }: UploadResponse) => {
      this.imageCompress
        .compressFile(image, orientation, 50, 100, 1024, 1024)
        .then((dataUrl: DataUrl) => {
          this.imagePreviewSrc = dataUrl;

          let arr = dataUrl.split(',');
          let mimeType = arr[0].match(/:(.*?);/)[1];
          let bstr = atob(arr[1]);
          let n = bstr.length;
          let u8arr = new Uint8Array(n);

          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }

          this.photoFile = new File([u8arr], fileName, { type: mimeType });
        });
    });
  }

  // This function tries to focus on the next input
  onListEnter(event, addButton) {
    event.preventDefault();
    event.stopPropagation();

    if (addButton) {
      addButton._elementRef.nativeElement.click();
    }

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

  onCategoriesChanged(currentCategories: string[]) {
    this.recipe.categories = this.categories().filter((c) =>
      currentCategories.find((name) => name === c.name)
    );
  }
}
