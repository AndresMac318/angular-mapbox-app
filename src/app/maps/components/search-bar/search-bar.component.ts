import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  //
  private debounceTimer?: NodeJS.Timeout;

  constructor(private _placesS: PlacesService) { }

  onQueryChanged(query: string = '') {

    /* si el debouncetimer tiene un valor se limpia */
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      //console.log('mandar esta query:', query);
      this._placesS.getPlacesByQuery(query);
    }, 500);
  }


}
