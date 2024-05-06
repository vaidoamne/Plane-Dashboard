import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {HeaderComponent} from "../header/header.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  isSidebarOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToGraphs() {
    this.router.navigate(['/graphs']);
  }
  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const userLevel = localStorage.getItem('AccessLevel');
      return userLevel === 'admin';
    } else {
      // Fallback value when localStorage is not available
      return false;
    }
  }
  redirectToMaps() {
    this.router.navigate(['/pick-airplane']);
  }
  redirectToTasks() {
    this.router.navigate(['/tasks']);
  }
  redirectToSettings() {
    this.router.navigate(['/settings']);
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
