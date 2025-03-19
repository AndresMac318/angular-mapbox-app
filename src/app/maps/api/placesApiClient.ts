import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PlacesApiClient extends HttpClient {

    public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

    constructor(handler: HttpHandler) {//permite realizar el .get .post etc
        super(handler);
    }

    /* se sobreescribe el http.get */
    public override get<T>(url: string, options: {
        params?: HttpParams | {
            [params: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
    }) {

        url = this.baseUrl + url;

        /* cumple la fincion del http.get() normal */
        return super.get<T>(url, {
            params: {
                limit: 5,
                language: 'es',
                access_token: environment.api_key,
                ...options.params
            }
        });
    }
}