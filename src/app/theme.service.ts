// theme.service.ts

import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private overlayContainer: OverlayContainer) {}

  toggleTheme(isDark: boolean): void {
    const themeClass = isDark ? 'dark-theme' : 'light-theme';
    const container = this.overlayContainer.getContainerElement();
    container.classList.remove('dark-theme', 'light-theme');
    container.classList.add(themeClass);
  }
}
