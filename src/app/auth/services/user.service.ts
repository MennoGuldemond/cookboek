import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, fromEvent, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { IUser } from '@app/models';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { setUser } from '@auth/store/auth.actions';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
