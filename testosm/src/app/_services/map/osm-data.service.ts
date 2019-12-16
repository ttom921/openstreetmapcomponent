import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, of } from 'rxjs';
import { LatLng } from 'leaflet';
import { MapTestUtil } from 'src/app/_utility/map/map-test-util';

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
  getRouterORS(startpos: LatLng, endpos: LatLng) {
    let orsapi = `/ors/v2/directions/driving-car`;
    // this.api = `/ors/v2/directions/driving-car`;
    // let startlatlng
    let param: any = {
      'api_key': 'your-api-key',
      'start': `${startpos.lng},${startpos.lat}`,//startpos.toString(),//8.681495,49.41461
      'end': `${endpos.lng},${endpos.lat}`,
    };
    return this.http.get<any>(orsapi, { params: param });
  }
  getCarHisRoute() {
    let retdata = null;
    MapTestUtil.getInstance().getTestGeoJsonData2().subscribe(data => {
      //console.log(data);
      retdata = data;
    });
    return of(retdata);
  }
  PostCarHisData(data) {
    let orsapi = `/ors/v2/directions/driving-car/geojson`;
    let param: any = {
      'api_key': 'your-api-key',
    };
    return this.http.post<any>(orsapi, data, { params: param });
  }

}
