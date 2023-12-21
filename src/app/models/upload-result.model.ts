import { Observable } from 'rxjs';

export class UploadResult {
  uploadPercentage$: Observable<number>;
  downloadURL$: Observable<any>;
}
