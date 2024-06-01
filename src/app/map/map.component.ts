import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import mapboxgl from 'mapbox-gl';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { Airports } from "../Interfaces.interface";
import { isPlatformBrowser } from "@angular/common";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {types} from "sass";
import Color = types.Color;
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";

interface LineFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: number[][];
  };
  properties: {};
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    HeaderComponent, HttpClientModule, MatSlideToggle, MatButtonToggle, MatButton
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  color: string = '#FFA500'
  airports: Airports[] = [];
  map: mapboxgl.Map | undefined;
  airportX: number = 0;
  airportY: number = 0;
  selectedAirportName : string = "";
  toggled : boolean = false;
  containerVisible:boolean = false;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ToggleViewFlights($event: MatSlideToggleChange) {
    this.toggled = $event.checked; // Toggle the value

    if (this.toggled) {
      // Turned on
      this.http.get<Airports[]>('http://127.0.0.1:8000/get_all_airports').subscribe(data => {
        this.airports = data;
        const selectedAirport = data.find(airport => airport.airport_name === this.selectedAirportName);
        if (selectedAirport) {
          // Clear the counts
          // Draw flight lines
          this.drawFlightLine(selectedAirport);
        }
      });
    } else {
      // Turned off
      this.removeFlightLines();
    }
  }

  private removeFlightLines() {
    this.airports.forEach((airport, index) => {
      this.airports.forEach((otherAirport, otherIndex) => {
        if (otherAirport !== airport) {
          const sourceId = `flight-line-${airport.airport_name}-${otherAirport.airport_name}-${otherIndex}`;
          const markerSourceId = `marker-${airport.airport_name}-${otherAirport.airport_name}-${otherIndex}`;
          if (this.map instanceof mapboxgl.Map) {
            if (this.map.getLayer(sourceId)) {
              this.map.removeLayer(sourceId);
            }
            if (this.map.getSource(sourceId)) {
              this.map.removeSource(sourceId);
            }
          }
        }
      });
    });
  }
  private removeMarkers() {
    this.airports.forEach((airport, index) => {
      const markerSourceId = `marker-${airport.airport_name}-${index}`;
      if (this.map instanceof mapboxgl.Map) {
        if (this.map.getLayer(markerSourceId)) {
          this.map.removeLayer(markerSourceId);
        }
        if (this.map.getSource(markerSourceId)) {
          this.map.removeSource(markerSourceId);
        }
      }
    });
  }


  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnVnZ3lndXlzIiwiYSI6ImNsdmNqemEzYjAzcnMybG12czFzbm1kajYifQ.MevK2otmGEUaLenDZLoBfg';

    this.http.get<Airports[]>('http://127.0.0.1:8000/get_all_airports').subscribe(data => {
      this.airports = data;

      if (isPlatformBrowser(this.platformId)) {
        this.selectedAirportName = localStorage.getItem('selectedAirport') || '';
      }

      const selectedAirport = data.find(airport => airport.airport_name === this.selectedAirportName);

      if (selectedAirport) {
        this.airportX = selectedAirport.airportX || 0;
        this.airportY = selectedAirport.airportY || 0;

        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/vaidoamne/clvdvuq69012u01quea8rgupi',
          zoom: 13,
          center: [this.airportY, this.airportX]
        });
        this.map.on('load', () => {

          this.airports.forEach(airport => {
            if (airport !== selectedAirport && airport.airportX !== undefined && airport.airportY !== undefined) {
              // @ts-ignore
              this.drawMarkers(selectedAirport);
            }
          });
        });
      }
    });
  }
  toggleContainer() {
    this.containerVisible = !this.containerVisible;
  }
  private drawMarkers(selectedAirport: Airports ) {

    let domestic_flights: number =0;
    let international_flights: number =0;
    this.removeMarkers();
    this.airports.forEach((airport, index) => {
      if(airport.airport_name != selectedAirport.airport_name) {
        if (airport.country == selectedAirport.country && airport.city != selectedAirport.city)
          domestic_flights += 1;
        else
          international_flights += 1;
      }
      if (airport.airportX && airport.airportY) {
        if (this.map instanceof mapboxgl.Map) {
          const markerSourceId = `marker-${airport.airport_name}-${index}`;



          if(airport.airport_name != selectedAirport.airport_name){
            new mapboxgl.Marker({color: '#2DD2C2'})
              .setLngLat([airport.airportY, airport.airportX])
              .addTo(this.map);
          }
          else{
            new mapboxgl.Marker({color: '#ee9411'})
              .setLngLat([this.airportY, this.airportX])
              .addTo(this.map);

          }
          this.map.addSource(markerSourceId, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [airport.airportY, airport.airportX],
                },
                properties: {
                  airport_name: airport.airport_name,
                  country: airport.country,
                  city: airport.city,
                  busyness: airport.busyness,
                  airport_age: airport.airport_age,
                },
              }],
            },
          });

          this.map.addLayer({
            id: markerSourceId,
            type: 'circle',
            source: markerSourceId,
            paint: {
              'circle-radius': 6,
              'circle-color': '#FFA500',
            },
          });

          this.map.on('click', markerSourceId, (e) => {
            // @ts-ignore
            const features = this.map.queryRenderedFeatures(e.point, { layers: [markerSourceId] });
            if (!features || !features.length) {
              return;
            }

            const feature = features[0];
            if (!feature || !feature.properties || !feature.geometry || !('type' in feature.geometry) || !('coordinates' in feature.geometry)) {
              return;
            }

            let coordinates: [number, number];
            if (feature.geometry.type === 'Point') {
              coordinates = feature.geometry.coordinates as [number, number];
            } else if (feature.geometry.type === 'LineString') {
              coordinates = (feature.geometry.coordinates as [number, number][])[0];
            } else {
              return;
            }

            const airportName = feature.properties['airport_name'];
            const country = feature.properties['country'];
            const city = feature.properties['city'];
            const busyness = feature.properties['busyness'];
            const age = feature.properties['airport_age'];
            //add info when clicked other airport
            if(airport.airport_name != selectedAirport.airport_name) {
              if (this.map instanceof mapboxgl.Map) {
                const popupContent = `
                <h3>${airportName}</h3>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Business:</strong>
                  <span class="busyness ${busyness.toLowerCase()}">${busyness}</span>
                </p>
                <p><strong>Age:</strong> ${age}</p>
              `;

                const popup = new mapboxgl.Popup({
                  closeOnClick: true,
                })
                  .setLngLat(coordinates)
                  .setHTML(popupContent)
                  .addTo(this.map);
              }
            }
            else{//domestic airport
              if (this.map instanceof mapboxgl.Map) {
                const popupContent = `
                <h3>${airportName}</h3>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Business:</strong>
                  <span class="busyness ${busyness.toLowerCase()}">${busyness}</span>
                </p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Domestic:</strong> ${domestic_flights}</p>
                <p><strong>International:</strong> ${international_flights}</p>
              `;

                const popup = new mapboxgl.Popup({
                  closeOnClick: true,
                })
                  .setLngLat(coordinates)
                  .setHTML(popupContent)
                  .addTo(this.map);
              }

            }
          });
        }
      }
    });
  }

  private drawFlightLine(selectedAirport: Airports ) {
    this.airports.forEach((airport, index) => {
      if (airport !== selectedAirport && airport.airportX && airport.airportY) {
        const lineCoordinates = [
          [selectedAirport.airportY, selectedAirport.airportX],
          [airport.airportY, airport.airportX],
        ];
        const sourceId = `flight-line-${selectedAirport.airport_name}-${airport.airport_name}-${index}`;

        const geoJsonLine: LineFeature = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: lineCoordinates,
          },
          properties: {},
        };

        if (this.map instanceof mapboxgl.Map) {
          if (!this.map.getSource(sourceId)) {
            this.map.addSource(sourceId, {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [geoJsonLine],
              },
            });

            this.map.addLayer({
              id: sourceId,
              type: 'line',
              source: sourceId,
              layout: {},
              paint: {
                'line-color': '#FFA500',
                'line-width': 2,
              },
            });
          }
        }
      }
    });
  }

}
