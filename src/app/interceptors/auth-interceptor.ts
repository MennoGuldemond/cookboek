import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { LocalStorageKeys } from '@app/models';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const idToken = localStorage.getItem(LocalStorageKeys.idToken);

  if (idToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', idToken),
    });

    return next(cloned);
  } else {
    return next(req);
  }
}
