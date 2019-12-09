
import * as geojson from 'geojson';
import { ColorMetaData } from './color-meta-data.model';
export class GeoJsonMetaData {
  name: string;
  lineString: geojson.LineString;
  colorMetaData: ColorMetaData;
  //polylineInstance: GeoJSON<P> ;
  constructor() {
    this.colorMetaData = new ColorMetaData();
  }
}
