import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Recipe, RecipeInfo } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  baseUrl = `${environment.api.url}/recipes`;

  // save first document in snapshot of items received
  firstInResponse: any = [];
  // save last document in snapshot of items received
  lastInResponse: any = [];

  constructor(private http: HttpClient) {}

  get(): Observable<RecipeInfo[]> {
    return this.http.get<RecipeInfo[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  getNewest(): Observable<RecipeInfo> {
    return this.http.get<RecipeInfo>(`${this.baseUrl}/newest`);
  }

  save(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}`, recipe);
  }

  delete(recipeId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${recipeId}`);
  }
}
