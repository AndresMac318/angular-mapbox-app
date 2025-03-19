import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number]; // o tmbn: public userLocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocation(): boolean {
    return !!this.useLocation; // !: no hay un valor  !! : no hay valor y lo niego = true
  }

  constructor(private placesApi: PlacesApiClient,
    private mapS_: MapService) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    /* para convertir en promesa a navigator get current position */
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion')
          console.log(err);
          reject()
        }
      );
    });
  }


  getPlacesByQuery(query: string = '') {

    // @TODO: cuando el query es un string vacio /
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.useLocation) throw Error('no hay una ubicacion del usuario!');
    this.isLoadingPlaces = true;//se esta buscando


    //una peticion http get no se dispara hasta que no este alguien subscrito
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
      .subscribe(res => {
        //console.log(res.features);
        this.isLoadingPlaces = false;
        this.places = res.features;

        /* se crean los marcadores en el mapa */
        this.mapS_.createMarkersFromPlaces(this.places, this.useLocation!);
      });

  }

  deletePlaces() {
    this.places = [];
  }

}
