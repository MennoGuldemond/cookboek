import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { GoogleAuthService } from '@app/services';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(GoogleAuthService);

  if (authService.isLoggedIn()) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', authService.user().bearerToken),
    });

    return next(cloned);
  } else {
    return next(req);
  }
}
