import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(private _mapS: MapService, private _placesS: PlacesService) { }

  goToMyLocation() {
    if (!this._placesS.isUserLocation) throw Error('no hay ubicacion de usuario');
    if (!this._mapS.isMapReady) throw Error('no hay un mapa disponible');

    this._mapS.flyTo(this._placesS.useLocation!); //el signo es para indicar que estara hay siempre no sera null o undeefined
  }

}
