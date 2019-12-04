import { MarkerClusterGroup } from 'leaflet';
import { MarkerMetaData } from './marker-meta-data.model';

export interface MakerClusterGroupMetaData {
  name: string,
  group: MarkerClusterGroup,
  markermetadatas: MarkerMetaData[];
}
