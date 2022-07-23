import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export class UploadResult {
  uploadTask: AngularFireUploadTask;
  fileRef: AngularFireStorageReference;
  uploadPercentage$: Observable<number>;
  downloadURL$: Observable<any>;
}
