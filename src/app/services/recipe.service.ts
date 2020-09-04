import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<Recipe[]> {
    return this.afs.collection<Recipe>('recipes').snapshotChanges().pipe(map(recipes => {
      return recipes.map(r => {
        const data = r.payload.doc.data() as Recipe;
        const id = r.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getById(id: string): Observable<Recipe> {
    return from(this.afs.collection('recipes').doc(id).ref.get().then(doc => {
      if (doc.exists) {
        return { id, ...doc.data() } as Recipe;
      } else {
        console.error(`no document found with id: ${id}`);
        return null;
      }
    }).catch(error => {
      console.error(`There was an error getting the document: ${error}`);
      return null;
    }));
  }

  save(recipe: Recipe): Observable<DocumentReference> {
    return from(this.afs.collection('recipes').add(recipe).then(docRef => {
      return docRef;
    }));
  }

  update(recipe: Recipe): void {
    // let temp = this.afs.collection('recipes').doc(recipe.id).set(recipe).then();
  }

}
