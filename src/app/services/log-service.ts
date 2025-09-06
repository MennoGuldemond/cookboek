import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Log } from '@app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.url}/logs`;

  get(take?: number, skip?: number): Observable<Log[]> {
    skip = skip || 0;
    take = take || 30;
    let uri = `${this.baseUrl}?skip=${skip}&take=${take}`;
    return this.http.get<Log[]>(uri);
  }
}
