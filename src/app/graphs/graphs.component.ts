import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import {HttpClientModule} from "@angular/common/http";
import {ChartModule} from "primeng/chart";
import {FlightService} from "../flight.service";
import { DOCUMENT } from '@angular/common';
import transformJavaScript from "@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker";

interface Flight {
  flight_number: number;
  flight_destination: string;
  flight_capacity: number;
  flight_population: number;
}

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  standalone: true,
  imports: [HttpClientModule, ChartModule],
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  multi: any[] = [];
  flights:Flight[] = [];
  data:any;
  capacity:any[] = [];
  names:any[] = [];
  options:any;
  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    console.log("1")
    this.fetch();
    this.capacity = this.flights.map(obj=>obj.flight_capacity);
    this.names = this.flights.map(obj=>obj.flight_number);
    console.log("2")
    console.log("3")
    console.log(...this.capacity)
    this.data = {
      labels: [...this.names],
      datasets: [
        {
          label: 'First Dataset',
          data: [...this.capacity]
        }
      ]

    }
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: ["yellow","blue","red"]
          }
        }
      }
    };
  }

  fetch():void {
      this.http.get<Flight[]>('http://127.0.0.1:8000/flights').subscribe({
      next: (data: Flight[]) => {
        this.multi = data.map(flight => {
          this.flights.push(flight)
          return flight;

        });
      },
      error: (error) => {
        console.log('Error fetching flight data:', error);
      }
    });
      console.log(this.flights);
  }
}
