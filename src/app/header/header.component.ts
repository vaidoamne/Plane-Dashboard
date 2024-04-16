import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  username: string | null = null;

  constructor() { }

  ngOnInit(): void {
    // Check if localStorage is available (for browser environment)
    if (typeof localStorage !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const { first_name } = JSON.parse(currentUser);
        this.username = first_name;
      }
    }
  }
}
