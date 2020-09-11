import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

import { User, GoogleUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin(): Promise<any> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    // If the user was navigating somewhere before login, redirect them there.
    const urlBeforeLogin = localStorage.getItem('urlBeforeLogin');
    if (urlBeforeLogin) {
      this.router.navigate([urlBeforeLogin]);
      localStorage.removeItem('urlBeforeLogin');
    }

    this.updateUserData(credential.user).subscribe(x => x);
    return null;
  }

  private updateUserData(user: GoogleUser): Observable<Promise<void>> {
    const userRef: AngularFirestoreDocument<GoogleUser> = this.afs.doc(`users/${user.uid}`);

    return userRef.valueChanges().pipe(
      take(1),
      map((savedUser: User) => {        
        const data: any = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };

        if (savedUser == null) {
          // New user, initialize some values.
          data.recipeIds = [];
          data.createdOn = new Date();
          return userRef.set(data);
        }

        return userRef.set(data, { merge: true });
      })
    )
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

}
