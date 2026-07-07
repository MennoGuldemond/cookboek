import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Category } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = signal<Category[]>([]);
  categoryNames: Signal<string[]> = computed(() => this.categories()?.map((c) => c.name) || []);

  private http = inject(HttpClient);
  private baseUrl = `${environment.api.url}/categories`;

  get() {
    this.http.get<Category[]>(`${this.baseUrl}`).subscribe((categories) => {
      this.categories.set(categories);
    });
  }

  add(category: Category) {
    this.http.post<Category>(`${this.baseUrl}`, category).subscribe((newCategory) => {
      this.categories.update((categories) => {
        const index = categories.findIndex((c) => c.id === newCategory.id);
        if (index !== -1) {
          // Update existing category
          categories[index] = newCategory;
        } else {
          // Add new category
          categories.push(newCategory);
        }
        return [...categories];
      });
    });
  }

  delete(categoryId: string) {
    this.http.delete(`${this.baseUrl}/${categoryId}`).subscribe(() => {
      this.categories.update((categories) => {
        return categories.filter((c) => c.id !== categoryId);
      });
    });
  }
}
