import {
  ApplicationRef,
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  themes = ['dark-theme', 'light-theme'];

  currentTheme = signal<string>('light-theme');

  private renderer: Renderer2;
  private appRef = inject(ApplicationRef);
  private rendererFactory = inject(RendererFactory2);

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // Initially check if dark mode is enabled on system
    const darkModeOn = window?.matchMedia('(prefers-color-scheme: dark)').matches;

    // If dark mode is enabled then directly switch to the dark-theme
    if (darkModeOn) {
      this.setTheme('dark-theme');
    }

    // Watch for changes of the preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      const darkMatches = e.matches;
      this.setTheme(darkMatches ? 'dark-theme' : 'light-theme');

      // Trigger refresh of UI
      this.appRef.tick();
    });
  }

  setTheme(theme: string) {
    if (this.themes.includes(theme)) {
      for (let i = 0; i < this.themes.length; i++) {
        this.renderer.removeClass(document.body, this.themes[i]);
        this.renderer.addClass(document.body, theme);
        this.currentTheme.set(theme);
      }
    }
  }
}
