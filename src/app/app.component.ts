import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {ThemePalette} from "@angular/material/core";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  theme: ThemePalette = 'primary'; // Default theme

  toggleTheme(event: MatSlideToggleChange): void {
    this.theme = event.checked ? 'accent' : 'primary';
  }
    title = 'Airplane_Dashboard';
}
