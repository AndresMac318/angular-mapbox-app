import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

  constructor(private _placesS: PlacesService) { }

  ngOnInit(): void {
  }

  get isUserLocationReady() {
    return this._placesS.isUserLocation;
  }

}
