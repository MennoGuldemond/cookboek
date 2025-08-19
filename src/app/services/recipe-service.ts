import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationSettings, Recipe, RecipeInfo } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // save first document in snapshot of items received
  firstInResponse: any = [];
  // save last document in snapshot of items received
  lastInResponse: any = [];

  private http = inject(HttpClient);
  private baseUrl = `${environment.api.url}/recipes`;

  get(paginationSettings: PaginationSettings = null): Observable<RecipeInfo[]> {
    const skip = paginationSettings?.skip || 0;
    const take = paginationSettings?.take || 30;
    let uri = `${this.baseUrl}?skip=${skip}&take=${take}`;

    if (paginationSettings?.name) {
      uri += `&name=${paginationSettings.name}`;
    }
    if (paginationSettings?.authorId) {
      uri += `&authorId=${paginationSettings.authorId}`;
    }

    return this.http.get<RecipeInfo[]>(uri);
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  getNewest(): Observable<RecipeInfo> {
    return this.http.get<RecipeInfo>(`${this.baseUrl}/newest`);
  }

  getLiked(): Observable<RecipeInfo[]> {
    return this.http.get<RecipeInfo[]>(`${this.baseUrl}/liked`);
  }

  save(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}`, recipe);
  }

  delete(recipeId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${recipeId}`);
  }
}
