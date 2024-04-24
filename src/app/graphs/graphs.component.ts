import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from "@angular/common/http";
import { ChartModule } from "primeng/chart";
import { FlightService } from "../flight.service";
import { DOCUMENT } from '@angular/common';
import {HeaderComponent} from "../header/header.component";
import {Flight} from './Interfaces.interface';
import{Airports} from "./Interfaces.interface";

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  standalone: true,
  imports: [HttpClientModule, ChartModule, HeaderComponent],
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  multi: any[] = [];
  flights: Flight[] = [];
  airports : Airports[] = [];
  data: any;
  capacity: any[] = [];
  names: any[] = [];
  options: any;
  lineChartData: any;
  lineChartOptions: any;
  barChartData: any;
  barChartOptions: any;

  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    console.log("1")
    this.fetch();
  }

  fetch(): void {
    this.http.get<Flight[]>('http://127.0.0.1:8000/flights').subscribe({
      next: (data: Flight[]) => {
        this.multi = data.map(flight => {
          this.flights.push(flight)
          return flight;
        });
        this.generateChartData();
        this.generateLineChartData();
        this.generateBarChartData();
      },
      error: (error) => {
        console.log('Error fetching flight data:', error);
      }
    });
    this.http.get<Airports[]>('http://127.0.0.1:8000/get_all_airports').subscribe({
      next: (data: Airports[]) => {
        this.multi = data.map(airport => {
          this.airports.push(airport)
        });
      },
      error: (error) => {
        console.log('Error fetching flight data:', error);
      }
    });
  }

  generateChartData(): void {
    let companyCounts: {[key: string]: number} = {}; // Type annotation for companyCounts

    this.flights.forEach((flight: { company_name: string }) => { // Type annotation for flight and company_name
      if (companyCounts.hasOwnProperty(flight.company_name)) {
        companyCounts[flight.company_name]++;
      } else {
        companyCounts[flight.company_name] = 1;
      }
    });

    let totalFlights: number = this.flights.length; // Type annotation for totalFlights

    let companyLabels: string[] = Object.keys(companyCounts); // Type annotation for companyLabels
    let companyData: number[] = companyLabels.map(company => {
      return (companyCounts[company] / totalFlights) * 100;
    });

    this.data = {
      labels: companyLabels,
      datasets: [{
        label: 'Company Distribution',
        data: companyData,
        backgroundColor: ['#6829C4', '#D22D3D', '#2DD2C2', '#ee9411', '#68e965'],
        borderColor: '#FFA726',
        borderWidth: 1
      }]
    };


    this.options = {
      plugins: {
        subtitle: {
          display: false,
          text: ''
        },
        title:{
          display:true,
          text:"",
          color:"white"
        },
        legend: {
          labels: {
            color:"white",
            usePointStyle: true,
          }
        }
      },
    };
  }

  generateLineChartData(): void {
    const flightCounts: {[date: string]: number} = {};

    for (const flight of this.flights) {
      const date = flight.timestamp.split('T')[0];
      if (flightCounts[date]) {
        flightCounts[date]++;
      } else {
        flightCounts[date] = 1;
      }
    }

    const dates = Object.keys(flightCounts);
    const counts = Object.values(flightCounts);

    console.log("Flight Counts by Date:");
    dates.forEach((date, index) => {
      console.log(`${date}: ${counts[index]} flights`);
    });
    this.lineChartData = {
      labels: [...dates],
      datasets: [
        {
          label: 'Number of Flights',
          data: [...counts],
          fill: false,
          borderColor: '#6829C4',
          tension: .4,
        }
      ]

    };

    this.lineChartOptions = {

      plugins: {
        subtitle: {
          display: false,
          text: ''
        },
        title:{
          display:true,
          text:"Number of flights by date",
          color:"white"
        },
        legend: {
          labels: {
            color:"white",
            usePointStyle: true,
          }
        }
      },
    };
  }

  generateBarChartData(): void {
    const arrivalDelays = this.flights.map(flight => {
      const estimatedArrival = new Date(flight.estimated_arrival_time);
      const actualArrival = new Date(flight.arrival_time);
      const delayInSeconds = (estimatedArrival.getTime() - actualArrival.getTime()) / 1000; // Convert milliseconds to seconds
      return delayInSeconds / 60; // Convert seconds to minutes
    });

    this.barChartData = {
      labels: this.flights.map(flight => flight.company_name), // Use company names as labels
      datasets: [
        {
          label: 'Arrival Delay (minutes)',
          data: arrivalDelays,
          backgroundColor: '#D22D3D',
        }
      ]
    };

    this.barChartOptions = {
      plugins: {
        subtitle: {
          display: false,
          text: ''
        },
        title:{
          display:true,
          text:"Delay by airline",
          color:"white"
        },
        legend: {
          labels: {
            color:"white",
            usePointStyle: true,
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            color: 'white'
          }
        }],
        xAxes: [{
          ticks: {
            color: 'white'
          }
        }]
      }
    };
  }
}
