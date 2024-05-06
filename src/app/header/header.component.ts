import {Component, OnInit, Output, ViewEncapsulation} from '@angular/core';
import EventEmitter from "node:events";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    MatSlideToggle,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  constructor() { }
  alertsEnabled: boolean = false;
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      console.log(currentUser);
      if (currentUser) {
        this.username = currentUser; // No need for JSON.parse since it's just a string
      }
    }

  }
  onToggleChange() {
    // Change the background color based on the alertsEnabled status
    if (this.alertsEnabled) {
      document.body.classList.add('alerts-enabled-background'); // Add a CSS class
    } else {
      document.body.classList.remove('alerts-enabled-background'); // Remove a CSS class
    }
  }


}
