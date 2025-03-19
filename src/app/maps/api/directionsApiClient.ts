import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {

    public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

    constructor(handler: HttpHandler) {//permite realizar el .get .post etc
        super(handler);
    }

    /* se sobreescribe el http.get */
    public override get<T>(url: string) {

        url = this.baseUrl + url;

        /* cumple la fincion del http.get() normal */
        return super.get<T>(url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                language: 'en',
                overview: 'simplified',
                steps: false,
                access_token: environment.api_key,
            }
        });
    }
}