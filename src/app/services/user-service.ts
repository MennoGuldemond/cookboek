import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserInfo } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userInfo = signal<UserInfo>(undefined);

  private http = inject(HttpClient);
  private baseUrl = environment.api.url;

  getInfo(id: string) {
    this.http
      .get<UserInfo>(`${this.baseUrl}/users/info/${id}`)
      .subscribe((info) => this.userInfo.set(info));
  }
}
