import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from "@angular/common/http";
import { ChartModule } from "primeng/chart";
import { TableModule } from "primeng/table";
import { HeaderComponent } from "../header/header.component";
import { Flight } from '../Interfaces.interface';
import { Airports } from "../Interfaces.interface";
import {SlicePipe} from "@angular/common";

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  imports: [HttpClientModule, ChartModule, TableModule, HeaderComponent, SlicePipe],
  standalone: true,
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  flights: Flight[] = [];
  airports: Airports[] = [];
  data: any;
  options: any;
  lineChartData: any;
  lineChartOptions: any;
  barChartData: any;
  barChartOptions: any;

  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.http.get<Flight[]>('http://127.0.0.1:8000/flights').subscribe({
      next: (data: Flight[]) => {
        this.flights = data;
        //this.geknerateChartData();
        //this.generateLineChartData();
        //this.generateBarChartData();
      },
      error: (error) => {
        console.error('Error fetching flight data:', error);
      }
    });
    this.http.get<Airports[]>('http://127.0.0.1:8000/get_all_airports').subscribe({
      next: (data: Airports[]) => {
        this.airports = data;
      },
      error: (error) => {
        console.error('Error fetching airport data:', error);
      }
    });
  }

  generateChartData(): void {
    const companyCounts: { [key: string]: number } = {};

    this.flights.forEach(flight => {
      if (companyCounts[flight.company_name]) {
        companyCounts[flight.company_name]++;
      } else {
        companyCounts[flight.company_name] = 1;
      }
    });

    const totalFlights = this.flights.length;
    const companyLabels = Object.keys(companyCounts);
    const companyData = companyLabels.map(company => (companyCounts[company] / totalFlights) * 100);

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
        title: {
          display: true,
          text: "",
          color: "white"
        },
        legend: {
          labels: {
            color: "white",
            usePointStyle: true,
          }
        }
      },
    };
  }

  generateLineChartData(): void {
    const flightCounts: { [date: string]: number } = {};

    this.flights.forEach(flight => {
      const date = flight.timestamp.split('T')[0];
      if (flightCounts[date]) {
        flightCounts[date]++;
      } else {
        flightCounts[date] = 1;
      }
    });

    const dates = Object.keys(flightCounts);
    const counts = Object.values(flightCounts);

    this.lineChartData = {
      labels: dates,
      datasets: [{
        label: 'Number of Flights',
        data: counts,
        fill: false,
        borderColor: '#6829C4',
        tension: 0.4,
      }]
    };

    this.lineChartOptions = {
      plugins: {
        subtitle: {
          display: false,
          text: ''
        },
        title: {
          display: true,
          text: "Number of flights by date",
          color: "white"
        },
        legend: {
          labels: {
            color: "white",
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
      const delayInSeconds = (estimatedArrival.getTime() - actualArrival.getTime()) / 1000;
      return delayInSeconds / 60;
    });

    this.barChartData = {
      labels: this.flights.map(flight => flight.company_name),
      datasets: [{
        label: 'Arrival Delay (minutes)',
        data: arrivalDelays,
        backgroundColor: '#D22D3D',
      }]
    };

    this.barChartOptions = {
      plugins: {
        subtitle: {
          display: false,
          text: ''
        },
        title: {
          display: true,
          text: "Delay by airline",
          color: "white"
        },
        legend: {
          labels: {
            color: "white",
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
