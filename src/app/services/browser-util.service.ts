import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowserUtilService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  isSafari(): boolean {
    return navigator.userAgent.indexOf('Chrome') > -1 === false && navigator.userAgent.indexOf('Safari') > -1;
  }

  isIframe(): boolean {
    return window !== window.parent && !window.opener;
  }
}
