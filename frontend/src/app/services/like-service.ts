import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Like } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.url}/likes`;

  getByRecipeId(recipeId: string): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.baseUrl}/recipe/${recipeId}`);
  }

  getByUserId(userId: string): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.baseUrl}/user/${userId}`);
  }

  save(recipeId: string, userId: string): Observable<Like> {
    const like = {
      recipeId,
      userId,
    };
    return this.http.post<Like>(`${this.baseUrl}`, like);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
