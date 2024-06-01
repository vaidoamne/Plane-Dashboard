  import { Component, OnInit } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { ColDef } from 'ag-grid-community';
  import { Flight } from '../Interfaces.interface';
  import { AgGridAngular } from 'ag-grid-angular';
  import { HttpClientModule } from "@angular/common/http";
  import { AgGridModule } from 'ag-grid-angular';

  @Component({
    selector: 'app-graphs',
    templateUrl: './graphs.component.html',
    standalone: true,
    imports: [
      AgGridAngular,
      HttpClientModule,
      AgGridModule
    ],
    styleUrls: ['./graphs.component.css']
  })
  export class GraphsComponent implements OnInit {
    columnDefs: ColDef[] = [
      { field: 'flight_number', headerName: 'Flight Number', sortable: true, filter: true, width: 300 },
      { field: 'company_name', headerName: 'Company Name', sortable: true, filter: true, width: 175 },

      { field: 'starting_airport_name', headerName: 'Starting Airport', sortable: true, filter: true, width: 300 },
      { field: 'end_airport_name', headerName: 'End Airport', sortable: true, filter: true, width: 300 },
      {
        field: 'departure_time', headerName: 'Departure Time', sortable: true, filter: true, width: 155,
        valueFormatter: (params: any) => {
          const date = new Date(params.value);
          return date.toISOString().substr(11, 5);  // Extracts HH:mm from the date string
        }
      },
      {
        field: 'arrival_time', headerName: 'Arrival Time', sortable: true, filter: true, width: 150,
        valueFormatter: (params: any) => {
          const date = new Date(params.value);
          return date.toISOString().substr(11, 5);  // Extracts HH:mm from the date string
        }
      },
      {
        field: 'inbound_outbound',
        headerName: 'Inbound/Outbound',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params: any) => {
          return params.data.starting_airport_name === 'Timisoara International Airport' ? 'Outbound' : 'Inbound';
        }
      },
      {
        field: 'delay',
        headerName: 'Delay (min)',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params: any) => {
          const arrival = new Date(params.data.arrival_time).getTime();
          const estimatedArrivalTime = new Date(params.data.estimated_arrival_time).getTime();
          const delay = ((estimatedArrivalTime - arrival) / (1000 * 60)) /100;
          return Math.round(delay);
        }
      }
    ];

    rowData: Flight[] = [];
    paginationPageSize = 20;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      this.fetchFlights();
    }

    fetchFlights(): void {
      this.http.get<Flight[]>('http://127.0.0.1:8000/flights').subscribe(data => {
        this.rowData = data;
      });
    }
  }
