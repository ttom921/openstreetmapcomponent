import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OsmDataService {

  constructor() { }
  getInterval(): Observable<any> {
    const source$ = interval(3000);
    return source$;
  }
}
