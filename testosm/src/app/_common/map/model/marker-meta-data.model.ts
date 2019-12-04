import { LatLngExpression } from 'leaflet';

export interface MarkerData {
  id: string;//保留
  car_uid: string;// Example: ABC-123 車牌.
  car_group_name: string;// Example: XXXXXXXX Car Group 名稱.
  name: string;//公司名稱
  description: string;
  position: LatLngExpression;
}
/**
 * Mark的中繼資料
 * @export
 * @class MarkerMetaData
 * @implements {MarkerData}
 */
export class MarkerMetaData implements MarkerData {
  id: string; car_uid: string;
  car_group_name: string;
  name: string;
  description: string;
  position: LatLngExpression;


}
