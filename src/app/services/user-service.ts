import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '@app/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal<User>(undefined);

  private http = inject(HttpClient);
  private baseUrl = environment.api.url;

  getLoggedInUser() {
    this.http.get<User>(`${this.baseUrl}/users/`).subscribe((userData) => this.user.set(userData));
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }
}
