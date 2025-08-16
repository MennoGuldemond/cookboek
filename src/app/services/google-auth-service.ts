import { computed, Injectable, Signal, signal } from '@angular/core';
import { GoogleUser } from '@app/models';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  user = signal<GoogleUser>(undefined);
  isLoggedIn: Signal<boolean> = computed(() => this.user()?.bearerToken != null);

  initialize(callback?: (user: GoogleUser) => void) {
    const tryInit = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: environment.google.clientId,
          callback: (response: any) => {
            const user = this.decodeCredential(response.credential);
            this.user.set(user);
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
    // TODO: revoke token here
  }
}
