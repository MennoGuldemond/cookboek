import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // save first document in snapshot of items received
  firstInResponse: any = [];
  // save last document in snapshot of items received
  lastInResponse: any = [];

  constructor(private afs: AngularFirestore) {}

  get(): Observable<Recipe[]> {
    return this.afs
      .collection<Recipe>('recipes', (ref) =>
        ref.limit(10).orderBy('createdOn', 'desc').startAfter(this.lastInResponse)
      )
      .snapshotChanges()
      .pipe(
        map((response) => {
          if (!response.length) {
            console.warn('no recipes found');
          }
          this.firstInResponse = response[0].payload.doc;
          this.lastInResponse = response[response.length - 1].payload.doc;
          return response.map((r) => {
            const data = r.payload.doc.data() as Recipe;
            const id = r.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getById(id: string): Observable<Recipe> {
    return from(
      this.afs
        .collection<Recipe>('recipes')
        .doc(id)
        .ref.get()
        .then((doc) => {
          if (doc.exists) {
            return { id, ...(doc.data() as any) };
          } else {
            console.error(`no document found with id: ${id}`);
            return null;
          }
        })
        .catch((error) => {
          console.error(`There was an error getting the document: ${error}`);
          return null;
        })
    );
  }

  getNewest(): Observable<Recipe> {
    return this.afs
      .collection<Recipe>('recipes', (ref) => {
        return ref.orderBy('createdOn', 'desc').limit(1);
      })
      .valueChanges()
      .pipe(
        map((arrayWithOneRecipe) => {
          return arrayWithOneRecipe[0];
        })
      );
  }

  save(recipe: Recipe): Observable<string> {
    return from(
      this.afs
        .collection('recipes')
        .add(recipe)
        .catch((err) => {
          console.error(err);
          return null;
        })
        .then((docRef) => {
          return docRef.id;
        })
    );
  }

  update(recipe: Recipe): Observable<string> {
    return from(
      this.afs
        .collection('recipes')
        .doc(recipe.id)
        .set(recipe)
        .catch((err) => {
          console.error(err);
          recipe.id = null;
        })
        .then(() => {
          return recipe.id;
        })
    );
  }

  delete(recipe: Recipe): Observable<boolean> {
    return from(
      this.afs
        .collection('recipes')
        .doc(recipe.id)
        .delete()
        .catch((err) => {
          console.error(err);
          return false;
        })
        .then(() => {
          return true;
        })
    );
  }

  addLike(recipe: Recipe, userUid: string): void {
    let recipeRef = this.afs.collection<Recipe>('recipes').doc(recipe.id);
    recipeRef.get().subscribe((doc) => {
      // Only save the like, if this user hasn't liked it already.
      if (doc.data().likes.includes(userUid) === false) {
        recipe.likes = [...doc.data().likes, userUid];
        recipeRef.update({ likes: recipe.likes });
      }
    });
  }

  removeLike(recipe: Recipe, userUid: string): void {
    let recipeRef = this.afs.collection<Recipe>('recipes').doc(recipe.id);
    recipeRef.get().subscribe((doc) => {
      recipe.likes = doc.data().likes;
      const index = recipe.likes.indexOf(userUid);
      if (index > -1) {
        recipe.likes.splice(index, 1);
        recipeRef.update({ likes: recipe.likes });
      }
    });
  }
}
