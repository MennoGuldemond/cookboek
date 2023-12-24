import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Recipe } from '@app/models';
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

  get(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  getNewest(): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/newest`);
  }

  save(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}`, recipe);
  }

  delete(recipeId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${recipeId}`);
  }

  // addLike(recipe: Recipe, userUid: string): void {
  //   let recipeRef = this.afs.collection<Recipe>('recipes').doc(recipe.id);
  //   recipeRef.get().subscribe((doc) => {
  //     // Only save the like, if this user hasn't liked it already.
  //     if (doc.data().likes.includes(userUid) === false) {
  //       recipe.likes = [...doc.data().likes, userUid];
  //       recipeRef.update({ likes: recipe.likes });
  //     }
  //   });
  // }

  // removeLike(recipe: Recipe, userUid: string): void {
  //   let recipeRef = this.afs.collection<Recipe>('recipes').doc(recipe.id);
  //   recipeRef.get().subscribe((doc) => {
  //     recipe.likes = doc.data().likes;
  //     const index = recipe.likes.indexOf(userUid);
  //     if (index > -1) {
  //       recipe.likes.splice(index, 1);
  //       recipeRef.update({ likes: recipe.likes });
  //     }
  //   });
  // }
}
