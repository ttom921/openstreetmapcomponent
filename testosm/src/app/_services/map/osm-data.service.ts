import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class OsmDataService {
  //api = `http://www.yournavigation.org/api/1.0/gosmore.php`;
  api = `/api/1.0/gosmore.php`;

  constructor(private http: HttpClient) { }
  getInterval(): Observable<any> {
    const source$ = interval(3000);
    return source$;
  }
  getRouter(startpos: LatLng, endpos: LatLng, waypoints?: LatLng) {
    let param: any = {
      'flat': startpos.lat,
      'flon': startpos.lng,
      'tlat': endpos.lat,
      'tlon': endpos.lng,
      'v': 'motorcar',
      'fast': 1,
      'layer': 'mapnik',
      'format': 'geojson',//kml
    };
    return this.http.get<any>(this.api, { params: param });
  }
  getRouter2(startpos: LatLng, endpos: LatLng, waypoints?: LatLng) {
    let param: any = {
      'flat': startpos.lat,
      'flon': startpos.lng,
      'tlat': endpos.lat,
      'tlon': endpos.lng,
      'v': 'motorcar',
      'fast': 1,
      'layer': 'mapnik',
      'format': 'geojson',//geojson
    };
    return this.http.get<any>(this.api, { params: param });
  }
}
