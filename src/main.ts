import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzbWFjZWEiLCJhIjoiY2wwdHg3eWZnMDBmeTNqcG1wamEybG1nbSJ9.ezAFYbvHS3dk3fZBIIBY1g';


if (!navigator.geolocation) {
  alert('El navegador no soporta la Geolocalización');
  throw new Error('Navegador no soporta la geolocalización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
