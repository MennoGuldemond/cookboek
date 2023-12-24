import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Category } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = `${environment.api.url}/categories`;

  constructor(private http: HttpClient) {}

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }
}
