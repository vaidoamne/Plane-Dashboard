import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from "@angular/common/http";
import { ChartModule } from "primeng/chart";
import { FlightService } from "../flight.service";
import { DOCUMENT } from '@angular/common';
import {HeaderComponent} from "../header/header.component";

interface Flight {
  id:string;
  flight_number: number;
  timestamp : string;
  destination: string;
  altitude:number;
  airspeed : number;
  temperature :number;
  pressure:number;
  passengers:number;
  capacity: number;
}

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
  }

  generateChartData(): void {
    this.capacity = this.flights.map(obj => obj.capacity);
    this.names = this.flights.map(obj => obj.flight_number);
    console.log("2")
    console.log("3")
    console.log(this.capacity)
    this.data = {
      labels: [...this.names],
      datasets: [
        {
          label: 'Flight Capacity',
          data: [...this.capacity],
          backgroundColor: ['#6829C4', '#D22D3D', '#2DD2C2', '#ee9411', '#68e965'],
          fill: true,
          borderColor: '#FFA726',
          tension: .4,
        }
      ]
    };

    this.options = {
      plugins: {
        subtitle: {
          display: false,
          text: ''
        },
        title:{
          display:true,
          text:"Flight capacity by plane",
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
    const destinations = this.flights.map(obj => obj.destination);
    const passengers = this.flights.map(obj => obj.passengers);

    this.lineChartData = {
      labels: [...destinations],
      datasets: [
        {
          label: 'Number of Passengers',
          data: [...passengers],
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
          text:"Number of Passengers by Destination",
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
    const altitudes = this.flights.map(obj => obj.altitude);
    const speeds = this.flights.map(obj => obj.airspeed);

    this.barChartData = {
      labels: [...this.names],
      datasets: [
        {
          label: 'Altitude',
          data: [...altitudes],
          backgroundColor: '#D22D3D',
        },
        {
          label: 'Speed',
          data: [...speeds],
          backgroundColor: '#2DD2C2',
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
          text:"Altitude and Speed",
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
