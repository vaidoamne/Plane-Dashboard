import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { Flight } from '../Interfaces.interface'; // Ensure this path is correct
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-my-flight',
  templateUrl: './find-my-flight.component.html',
  styleUrls: ['./find-my-flight.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    HttpClientModule
  ]
})
export class FindMyFlightComponent implements OnInit {
  columnDefs: ColDef[] = [{ field: 'flight_number', headerName: 'Flight Number', sortable: true, filter: true, width: 200 },
    { field: 'company_name', headerName: 'Company Name', sortable: true, filter: true, width: 175 },

    { field: 'starting_airport_name', headerName: 'Starting Airport', sortable: true, filter: true, width: 300 },
    { field: 'end_airport_name', headerName: 'End Airport', sortable: true, filter: true, width: 320 },
    {
      field: 'departure_time', headerName: 'Departure Time', sortable: true, filter: true, width: 155,
      valueFormatter: (params: any) => {
        const date = new Date(params.value);
        return date.toISOString().substr(11, 5);  //
      }
    },
    {
      field: 'arrival_time', headerName: 'Arrival Time', sortable: true, filter: true, width: 150,
      valueFormatter: (params: any) => {
        const date = new Date(params.value);
        return date.toISOString().substr(11, 5);  //
      }
    },
    {
      field: 'inbound_outbound',
      headerName: 'Inbound/Outbound',
      sortable: true,
      filter: true,
      width: 215,
      valueGetter: (params: any) => {
        return params.data.starting_airport_name === 'Timisoara International Airport' ? 'Outbound' : 'Inbound';
      }
    },
    {
      field: 'delay',
      headerName: 'Delay (min)',
      sortable: true,
      filter: true,
      width: 170,
      valueGetter: (params: any) => {
        const departureTime = new Date(params.data.departure_time).getTime();
        const estimatedArrivalTime = new Date(params.data.estimated_arrival_time).getTime();
        const delay = ((estimatedArrivalTime - departureTime) / (1000 * 60)) / 100;
        return Math.round(delay);
      }
    }
  ];

  rowData: Flight[] = [];
  filteredData: Flight[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  fetchFlights(): void {
    this.http.get<Flight[]>('http://127.0.0.1:8000/flights').subscribe(data => {
      this.rowData = data;
      this.filteredData = data;
    });
  }

  onSearch(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredData = this.rowData.filter(flight =>
      flight.starting_airport_name.toLowerCase().includes(searchTermLower) ||
      flight.end_airport_name.toLowerCase().includes(searchTermLower) ||
      flight.company_name.toLowerCase().includes(searchTermLower)
    );
  }
}
