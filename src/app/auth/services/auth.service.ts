import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { User, GoogleUser } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  getUser(): Observable<User> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleSignin(): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  updateUserData(user: GoogleUser): Observable<any> {
    const userRef: AngularFirestoreDocument<GoogleUser> = this.firestore.doc(`users/${user.uid}`);

    return userRef.valueChanges().pipe(
      take(1),
      switchMap((savedUser: User) => {
        const data: any = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        if (savedUser == null) {
          // New user, initialize some values.
          data.recipeIds = [];
          data.createdOn = new Date();
          return userRef.set(data);
        }

        return userRef.set(data, { merge: true });
      })
    );
  }
}
