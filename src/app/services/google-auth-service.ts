import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleUser } from '@app/models';
import { environment } from '@env/environment';
import { UserService } from './user-service';

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  user = signal<GoogleUser>(undefined);
  isLoggedIn: Signal<boolean> = computed(() => this.user()?.bearerToken != null);

  private router = inject(Router);
  private userService = inject(UserService);

  initialize(callback?: (user: GoogleUser) => void) {
    const tryInit = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: environment.google.clientId,
          callback: (response: any) => {
            const user = this.decodeCredential(response.credential);
            this.user.set(user);

            const routeBeforeLogin = localStorage.getItem('urlBeforeLogin');
            if (routeBeforeLogin) {
              this.router.navigate([routeBeforeLogin]);
              localStorage.removeItem('urlBeforeLogin');
            } else {
              this.router.navigate(['home']);
            }

            this.userService.getLoggedInUser();

            if (callback) callback(user);
          },
        });
      } else {
        setTimeout(tryInit, 100);
      }
    };
    tryInit();
  }

  renderButton(elementId: string) {
    window.google.accounts.id.renderButton(document.getElementById(elementId), {
      theme: 'outline',
      size: 'large',
    });
  }

  decodeCredential(credential: string): GoogleUser {
    const payload = JSON.parse(atob(credential.split('.')[1]));
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      imageURL: payload.picture,
      bearerToken: credential,
    };
  }

  signOut() {
    this.user.set(null);
    this.router.navigate(['home']);
    // TODO: revoke token here
  }
}
