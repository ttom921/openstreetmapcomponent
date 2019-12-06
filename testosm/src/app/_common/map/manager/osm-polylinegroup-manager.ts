import { PolylineGroupMetaData } from '../model/polyline-group-meta-data.model';
import { LayerGroup, PolylineOptions, polyline } from 'leaflet';
import { PolylineMetaData } from '../model/polyline-meta-data.model';
import { ColorMetaData } from '../model/color-meta-data.model';


export class OSMPolylinegroupManager {
  //#region Singleton
  private static _instance: OSMPolylinegroupManager = null;
  private constructor() { };
  public static getInstance(): OSMPolylinegroupManager {
    if (this._instance == null) {
      this._instance = new OSMPolylinegroupManager();
    }
    return this._instance;
  }
  //#endregion Singleton
  polylineGroups = {};

  CreatePolylineGroup(gpname: string) {
    let layergroup: LayerGroup;
    if (this.HasPolylinerGroup(gpname) == false) {
      //建立layygroup
      layergroup = new LayerGroup();
      //color
      let obj: PolylineGroupMetaData = {
        name: gpname,
        group: layergroup,
      };
      this.polylineGroups[gpname] = obj;
    } else {
      layergroup = this.polylineGroups[gpname].group;
    }
  }
  GetPolylineGroup(gpname: string): PolylineGroupMetaData {
    return this.polylineGroups[gpname];
  }
  private HasPolylinerGroup(name: string): boolean {
    let ret = true;
    //console.log(this.polylineGroups.hasOwnProperty(name));
    ret = this.polylineGroups.hasOwnProperty(name);
    return ret;
  }
  AddPolyMetaDataToGroup(gpname: string, polylineMetaData: PolylineMetaData) {
    let polylineGroupMetaData: PolylineGroupMetaData = this.GetPolylineGroup(gpname);
    //color
    // let colorMetaData:ColorMetaData= new ColorMetaData();
    // colorMetaData.getRandomColor();

    // {
    //   color: this.getRandcolor(),
    //   weight: 5,
    //   smoothFactor: 1
    // }
    let polylinedata = polyline(polylineMetaData.latlngs, this.getPolylineOptions());
    polylineMetaData.polylineInstance = polylinedata;
    polylineGroupMetaData.group.addLayer(polylinedata);
    // let mkclGroupMetaData: MakerClusterGroupMetaData = this.GetMarkerClusterGroup(gpname);
    // let bgcolor = OSMColorManager.getInstance().getColorByCompany(gpname);
    // let fgcolor = OSMColorManager.getInstance().getDefaultFGColor();
    // let caption = `${markerMetaData.car_uid}`
    // let myicon = OSMMarkerclusterManager.getInstance().makeMarkerIcon(bgcolor, fgcolor, caption);
    // let markdata = L.marker(markerMetaData.position, { icon: myicon });
    // markerMetaData.markerInstance = markdata;
    // mkclGroupMetaData.markermetadatas.push(markerMetaData);
    // mkclGroupMetaData.group.addLayer(markdata);
  }
  getPolylineOptions(): PolylineOptions {
    let polylineOptions: PolylineOptions = {
      color: this.getRandcolor(),
      weight: 5,
      smoothFactor: 1
    }
    return polylineOptions;
  }
  getRandcolor() {
    //隨機顏色
    let r = 254;// Math.floor(Math.random() * 255);
    let g = 10;//Math.floor(Math.random() * 255);
    let b = 10;//Math.floor(Math.random() * 255);
    return "rgb(" + r + " ," + g + "," + b + ")";
  }
}
