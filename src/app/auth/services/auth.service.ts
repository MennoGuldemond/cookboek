import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, fromEvent, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { IUser } from '@app/models';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { setUser } from '@auth/store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.api.url;

  constructor(private http: HttpClient, private store: Store) {}

  googleSignin() {
    const temp = window.open(
      `${this.baseUrl}/auth/google`,
      'mywindow',
      'location=1,status=1,scrollbars=1, width=800,height=800'
    );
    window.addEventListener('message', (message: MessageEvent) => {
      // Message will contain google user and details
      const userData: { user: IUser; accessToken: string } = message.data.user;
      this.store.dispatch(setUser(userData));
      console.log(userData);
    });
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${id}`);
  }

  // getUser(): Observable<User> {
  //   return this.auth.authState.pipe(
  //     switchMap((user) => {
  //       if (user) {
  //         return this.firestore.doc<User>(`users/${user.uid}`).valueChanges().pipe(take(1));
  //       } else {
  //         return of(null);
  //       }
  //     })
  //   );
  // }

  // googleSignin(): Observable<firebase.auth.UserCredential> {
  //   return from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  // }

  signOut(): Observable<void> {
    return of(null);
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
