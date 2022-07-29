import { ApplicationRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTheme } from '@store/app.actions';
import { AppState } from '@store/app.selectors';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  themes = ['dark-theme', 'light-theme'];

  private renderer: Renderer2;

  constructor(
    private appRef: ApplicationRef,
    private rendererFactory: RendererFactory2,
    private store: Store<AppState>
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // Initially check if dark mode is enabled on system
    const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // If dark mode is enabled then directly switch to the dark-theme
    if (darkModeOn) {
      this.store.dispatch(setTheme({ theme: 'dark-theme' }));
    }

    // Watch for changes of the preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      const turnOn = e.matches;
      this.store.dispatch(setTheme({ theme: turnOn ? 'dark-theme' : 'light-theme' }));

      // Trigger refresh of UI
      this.appRef.tick();
    });
  }

  applyTheme(theme: string): void {
    if (this.themes.includes(theme)) {
      for (let i = 0; i < this.themes.length; i++) {
        this.renderer.removeClass(document.body, this.themes[i]);
        this.renderer.addClass(document.body, theme);
      }
    }
  }
}
