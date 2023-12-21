import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { from, Observable } from 'rxjs';
import { IUser } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.api.url;

  constructor(private http: HttpClient, private authService: SocialAuthService, private store: Store) {}

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

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${id}`);
  }

  signOut(): Observable<void> {
    return from(this.authService.signOut());
  }

  // updateUserData(user: GoogleUser): Observable<any> {
  //   const userRef: AngularFirestoreDocument<GoogleUser> = this.firestore.doc(`users/${user.uid}`);

  //   return userRef.valueChanges().pipe(
  //     take(1),
  //     switchMap((savedUser: User) => {
  //       const data: any = {
  //         uid: user.uid,
  //         email: user.email,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //       };

  //       if (savedUser == null) {
  //         // New user, initialize some values.
  //         data.recipeIds = [];
  //         data.createdOn = new Date();
  //         return userRef.set(data);
  //       }

  //       return userRef.set(data, { merge: true });
  //     })
  //   );
  // }
}
