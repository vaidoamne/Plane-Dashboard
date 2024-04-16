import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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

  redirectToMaps() {
    this.router.navigate(['/map']);
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
