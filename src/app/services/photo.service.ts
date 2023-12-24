import { Injectable } from '@angular/core';
import { last, map } from 'rxjs/operators';

import { Recipe, UploadResult } from '../models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl = `${environment.api.url}/images`;

  constructor(private http: HttpClient) {}

  upload(image: File): Observable<UploadResult> {
    // TODO: Remove spaces from name
    // const photoName = image.name.replace(/\s/g, '');

    let formData = new FormData();
    formData.append('file', image);

    return this.http.post<UploadResult>(`${this.baseUrl}/upload`, formData);
  }
}
