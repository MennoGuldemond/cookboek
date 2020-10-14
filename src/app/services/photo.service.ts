import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { last, map } from 'rxjs/operators';

import { Recipe, UploadResult } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private readonly FILE_PATH = 'photos';

  constructor(private storage: AngularFireStorage) {}

  upload(photo: File): Observable<UploadResult> {
    // Remove spaces from name
    const photoName = photo.name.replace(/\s/g, '');
    
    const result = new UploadResult();
    result.fileRef = this.storage.ref(`${this.FILE_PATH}/${photoName}`);
    result.uploadTask = this.storage.upload(
      `${this.FILE_PATH}/${photoName}`,
      photo
    );
    result.uploadPercentage$ = result.uploadTask.percentageChanges();

    // Get the downloadURL when the upload is finilized.
    return result.uploadTask.snapshotChanges().pipe(
      last(),
      map(() => {
        result.downloadURL$ = result.fileRef.getDownloadURL();
        return result;
      })
    );
  }

  delete(recipe: Recipe): Observable<void> {
    const fileName = recipe.photoURL.substring(
      recipe.photoURL.lastIndexOf('%2F') + 3,
      recipe.photoURL.indexOf('?')
    );
    return this.storage.ref(`photos/${fileName}`).delete();
  }
}
