import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  map: mapboxgl.Map | undefined;
  lat: number = 30.2672;
  lng: number = -97.7431;
  ngOnInit() {
    this.map = new mapboxgl.Map({
      // access TOKEN radu NU MODIFICA
      accessToken: 'pk.eyJ1IjoiYnVnZ3lndXlzIiwiYSI6ImNsdmNqemEzYjAzcnMybG12czFzbm1kajYifQ.MevK2otmGEUaLenDZLoBfg',
      container: 'map',
      // STYLE URL POTI MODIFICA, MERGI https://studio.mapbox.com si te duci la styles dai pe alea 3 puncte si ai style url
      // INAINTE SA IL PUI AI O OPTIUNE DE MAKE PUBLIC
      style: 'mapbox://styles/vaidoamne/clvdvuq69012u01quea8rgupi',
      zoom: 13,
      center: [this.lng, this.lat]
    });
  }
}
