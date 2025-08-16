import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { UploadResult } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl = `${environment.api.url}/images`;

  private http = inject(HttpClient);

  upload(image: File): Observable<UploadResult> {
    let formData = new FormData();
    formData.append('file', image);

    return this.http.post<UploadResult>(`${this.baseUrl}/upload`, formData);
  }
}
