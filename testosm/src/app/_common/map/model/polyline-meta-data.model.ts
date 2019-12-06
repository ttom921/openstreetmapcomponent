import { Polyline, LatLngExpression } from 'leaflet';

export interface PolylineData {
  name: string;
  description: string;
  polylineInstance: Polyline;
  latlngs: LatLngExpression[];
}

export class PolylineMetaData implements PolylineData {
  name: string;
  description: string;
  latlngs: LatLngExpression[];
  polylineInstance: Polyline;
}
