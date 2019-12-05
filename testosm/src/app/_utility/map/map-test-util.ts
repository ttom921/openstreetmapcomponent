import { LatLngExpression } from 'leaflet';

export class MapTestUtil {
  private static _instance: MapTestUtil = null;
  private constructor() { };
  public static getInstance(): MapTestUtil {
    if (this._instance == null) {
      this._instance = new MapTestUtil();
    }
    return this._instance;
  }
  getCenterRandom(center: LatLngExpression): LatLngExpression {
    let data: LatLngExpression;
    let lat = center[0] + this.generateRandomNumber();
    let lng = center[1] + this.generateRandomNumber();
    data = [lat, lng];
    return data;
  }
  generateRandomNumber() {
    // let min = 0.002;
    // let max = 0.008;
    let min = 0.02;
    let max = 0.08;
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let highlightedNumber = Math.random() * (max - min) + min;

    //alert(highlightedNumber);
    return highlightedNumber * plusOrMinus;
  }
  getneratelatlng() {
    let min = 0.002;
    let max = 0.008;
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let highlightedNumber = Math.random() * (max - min) + min;

    //alert(highlightedNumber);
    return highlightedNumber * plusOrMinus;
  }
}
