import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {HeaderComponent} from "../header/header.component";
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Airports } from "../Interfaces.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pick-airplane',
  standalone: true,
  imports: [MatGridListModule, HeaderComponent, MatIcon, NgForOf, HttpClientModule, NgOptimizedImage,],
  templateUrl: './pick-airplane.component.html',
  styleUrl: './pick-airplane.component.css'
})
export class PickAirplaneComponent {
  airports: Airports[] = [];

  constructor(private http: HttpClient,private router: Router) {
  }

  multi: any[] = [];
  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.http.get<Airports[]>('http://127.0.0.1:8000/get_all_airports').subscribe({
      next: (data: Airports[]) => {
        this.multi = data.map(flight => {
          this.airports.push(flight)
        });
      },
      error: (error) => {
        console.log('Error fetching flight data:', error);
      }
    });
  }

  getAirportImage(airportName: string): string {
    return `assets/airport_A.jpg`;
  }

  selectAirport(airportName: string): void {
    this.router.navigate(['/map']);
    localStorage.setItem('selectedAirport', airportName);
  }
}
