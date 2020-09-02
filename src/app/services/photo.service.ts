import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { last, map } from 'rxjs/operators';

import { UploadResult } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly FILE_PATH = 'photos';

  constructor(private storage: AngularFireStorage) { }

  uploadPhoto(photo: File): Observable<UploadResult> {
    const result = new UploadResult();
    result.fileRef = this.storage.ref(`${this.FILE_PATH}/${photo.name}`);
    result.uploadTask = this.storage.upload(`${this.FILE_PATH}/${photo.name}`, photo);
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

}
