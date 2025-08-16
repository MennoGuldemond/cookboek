import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { UploadResult } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.url}/images`;

  upload(image: File): Observable<UploadResult> {
    let formData = new FormData();
    formData.append('file', image);

    return this.http.post<UploadResult>(`${this.baseUrl}/upload`, formData);
  }
}
