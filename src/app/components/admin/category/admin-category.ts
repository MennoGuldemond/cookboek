import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditableTable } from '@app/components';
import { Category } from '@app/models';
import { CategoryService } from '@app/services';

@Component({
  selector: 'cobo-admin-category',
  imports: [CommonModule, EditableTable],
  templateUrl: './admin-category.html',
  styleUrl: './admin-category.scss',
})
export class AdminCategory implements OnInit {
  categories: Signal<Category[]>;
  newCategoryForm: FormGroup;

  categoryService = inject(CategoryService);

  ngOnInit() {
    this.categories = this.categoryService.categories;

    this.newCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  addCategory() {
    if (this.newCategoryForm.valid) {
      this.categoryService.add(this.newCategoryForm.value as Category);
      this.newCategoryForm.reset();
    }
  }

  updateCategory(edited) {
    this.categoryService.add(edited as Category);
  }

  deleteCategory($event: any) {
    this.categoryService.delete($event.id);
  }
}
