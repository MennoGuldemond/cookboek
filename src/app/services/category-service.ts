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
}
