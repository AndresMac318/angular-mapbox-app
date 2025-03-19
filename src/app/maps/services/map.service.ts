import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApiClient } from '../api';
import { DirectionResponse, Route } from '../interfaces/direction';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map; // true si map tiene algun valor sino false
  }

  constructor(private directionsApi: DirectionsApiClient) {

  }

  /* se establece el valor del mapa */
  setMap(map: Map) {
    this.map = map;
  }

  /* mover el mapa a cualquier lugar de la pantalla, recibe unas coordendas */
  flyTo(coords: LngLatLike) { //Lng tipado de tipo long y lat
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');

    //flyTo metodo de mapbox q permite moverse a cualquier otra posicion
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if (!this.map) throw Error('Mapa no inicializado')

    //se barren tds los marcadores
    this.markers.forEach(marker => marker.remove()); //se borran del mapa
    const newMarkers = [];
    for (const place of places) {
      const [lng, lat] = place.center; //extraen coords del place
      const popup = new Popup() //se crea la estructura de la ventana
        .setHTML(`
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
        `);
      const newMarker = new Marker() //se crea el marcador
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);
      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;

    if (places.length === 0) return;

    //limites del mapa
    const bounds = new LngLatBounds();

    //agregando mi ubicaion a los bounds del mapa
    bounds.extend(userLocation);

    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));

    this.map.fitBounds(bounds, {
      padding: 50
    })
  }

  /* obtener la ruta entre dos coordenadas */
  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    //peticion para obtener la ruta
    this.directionsApi.get<DirectionResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(res => this.drawPolyLine(res.routes[0]));
  }

  private drawPolyLine(route: Route) {
    //console.log({ kms: route.distance / 1000, duration: route.duration / 60 });

    if (!this.map) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {//recorren coordenadas, desestructuran propiedades lng, lat
      bounds.extend([lng, lat]);//se agregan a los limites del mapa
    });

    //acerca la ubicacion en el mapa
    this.map?.fitBounds(bounds, {
      padding: 50
    });


    //polilinea

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);

    //el source debe ser el mismo de arriba, el id no necesariamente
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        "line-color": '#333BFF',
        "line-width": 4
      }
    })


  }

}
