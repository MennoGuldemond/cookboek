import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users`);
  }
}
