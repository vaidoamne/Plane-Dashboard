import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from "@angular/common/http";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { Airports } from "../Interfaces.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-pick-airplane',
  templateUrl: './pick-airplane.component.html',
  styleUrls: ['./pick-airplane.component.css'],
  imports: [MatGridListModule, HttpClientModule, HeaderComponent, NgIf],
  standalone: true
})
export class PickAirplaneComponent {
  airports: Airports[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  multi: any[] = [];

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.http.get<Airports[]>('http://127.0.0.1:8000/get_all_airports').subscribe({
      next: (data: Airports[]) => {
        this.airports = data;
        console.log(this.airports)
      },
      error: (error) => {
        console.log('Error fetching airport data:', error);
      }
    });
  }

  getAirportImage(airportName: string | undefined): string {

    return `/assets/airport_A.jpg`;
  }

  selectAirport(airportName: string): void {
    this.router.navigate(['/map']);
    localStorage.setItem('selectedAirport', airportName);
  }
}
