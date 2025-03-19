import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  //se toma la referencia del div que contendra el mapa
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(private _placesS: PlacesService, private _mapS: MapService) { }

  ngAfterViewInit(): void {
    if (!this._placesS.useLocation) throw Error('No hay PlacesService.userLocation');

    const map = new Map({
      //container: 'map', // container ID SI SE REFERENVCIA POR ID, SINO:
      container: this.mapDivElement.nativeElement, // se le manda el elemento html dnd se renderizara el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this._placesS.useLocation, // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo ;V</span>
      `);

    new Marker({ color: 'red' })
      .setLngLat(this._placesS.useLocation)
      .setPopup(popup)
      .addTo(map)

    /* se inicializa el mapa y se tiene acceso a el desde el servicio map service */
    this._mapS.setMap(map);

  }

}
