import { LayerGroup, geoJSON, GeoJSONOptions } from 'leaflet';
import { GeojsonGroupMetaData } from '../model/geojson-group-meta-data.model';
import { GeoJsonMetaData } from '../model/geojson-meta-data.model';
import { ColorMetaData } from '../model/color-meta-data.model';
import * as L from 'leaflet';
import { LineString } from 'geojson';

export class OSMGeojsongroupManager {
  //#region Singleton
  private static _instance: OSMGeojsongroupManager = null;
  private constructor() { };
  public static getInstance(): OSMGeojsongroupManager {
    if (this._instance == null) {
      this._instance = new OSMGeojsongroupManager();
    }
    return this._instance;
  }
  //#endregion Singleton
  geojsonGroups = {};
  CreateGeojsonGroup(gpname: string) {
    let layergroup: LayerGroup;
    if (this.HasGeojsonGroup(gpname) == false) {
      //建立layergroup
      layergroup = new LayerGroup();
      //color
      let obj: GeojsonGroupMetaData = {
        name: gpname,
        group: layergroup,
      };
      this.geojsonGroups[gpname] = obj;
    } else {
      layergroup = this.geojsonGroups[gpname].group;
    }
  }
  GetGeojsonGroup(gpname: string): GeojsonGroupMetaData {
    return this.geojsonGroups[gpname];
  }
  private HasGeojsonGroup(name: string): boolean {
    let ret = true;
    //console.log(this.geojsonGroups.hasOwnProperty(name));
    ret = this.geojsonGroups.hasOwnProperty(name);
    return ret;
  }
  AddGeojsonMetaDataToGroup(gpname: string, geoJsonMetaData: GeoJsonMetaData) {
    let geojsonGroupMetaData: GeojsonGroupMetaData = this.GetGeojsonGroup(gpname);
    //color
    // var myLines: LineString = {
    //   "type": "LineString",
    //   "coordinates": [[121.266465, 24.933165], [121.264675, 24.933277]]
    // };
    // var myStyle = {
    //   "color": "#ff7800",
    //   "weight": 5,
    //   "opacity": 0.65
    // };
    // let layer = L.geoJSON(myLines, {
    //   style: myStyle
    // });
    let layer = L.geoJSON(geoJsonMetaData.lineString, {
      style: this.getGeojsonStyle(geoJsonMetaData.colorMetaData),
    });
    //console.log(geoJsonMetaData.lineString);

    //let geojsondata = geoJSON(geoJsonMetaData.geoobj, this.getGeojsonStyle());// polyline(polylineMetaData.latlngs, this.getPolylineOptions());
    //geojsonGroupMetaData.group.addLayer(geojsondata);
    geojsonGroupMetaData.group.addLayer(layer);
  }
  getGeojsonStyle(colorMetaData: ColorMetaData): any {
    // let colorMetaData: ColorMetaData = new ColorMetaData();
    // colorMetaData.SetDefatulFGColor();
    let geojsonStyle = {
      "color": colorMetaData.RGBAToHexA(),//"#ff7800",
      "weight": 5,
      "opacity": 0.65
    };


    return geojsonStyle;
  }
}
