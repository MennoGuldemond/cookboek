import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { from, Observable } from 'rxjs';
import { User } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.api.url;

  constructor(private http: HttpClient, private authService: SocialAuthService) {}

  googleSignin(): Observable<SocialUser> {
    return from(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID));
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then((token) => {
      console.log(token);
    });
  }

  refreshToken(): void {
    this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  signOut(): Observable<void> {
    return from(this.authService.signOut());
  }
}
