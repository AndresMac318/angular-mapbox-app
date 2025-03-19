import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(private _placesS: PlacesService, private _mapsS: MapService) { }

  get isLoadingPlaces(): boolean {
    return this._placesS.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this._placesS.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this._mapsS.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {

    if (!this._placesS.useLocation) throw Error('No hay userLocation')

    /* borrando el arreglo de lugares "oculta el searchcomponent" */
    this._placesS.deletePlaces();

    const start = this._placesS.useLocation;
    const end = place.center as [number, number];
    this._mapsS.getRouteBetweenPoints(start, end);
  }

}
