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

  /** Initializes the Google Sign-In API and sets up the callback for sign-in. */
  initialize(callback?: (user: GoogleUser) => void) {
    const tryInit = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: environment.google.clientId,
          callback: (response: any) => {
            const user = this.decodeCredential(response.credential);
            this.user.set(user);

            // Store the bearer token in localStorage
            localStorage.setItem('bearerToken', user.bearerToken);

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

    // Restore user from localStorage if token exists and is not expired
    const storedToken = localStorage.getItem('bearerToken');
    if (storedToken) {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (!isExpired) {
        const user = this.decodeCredential(storedToken);
        this.user.set(user);

        // Fetch and update the user data
        this.userService.getLoggedInUser();
      } else {
        localStorage.removeItem('bearerToken');
      }
    }

    tryInit();
  }

  /** Renders the Google Sign-In button in the specified element. */
  renderButton(elementId: string) {
    window.google.accounts.id.renderButton(document.getElementById(elementId), {
      theme: 'outline',
      size: 'large',
    });
  }

  /** Decodes the JWT credential to extract user information. */
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

  /** Signs out the user and clears the session. */
  signOut() {
    this.user.set(null);
    localStorage.removeItem('bearerToken');
    this.router.navigate(['home']);
  }
}
