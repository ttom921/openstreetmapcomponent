import * as L from 'leaflet';
import * as _ from 'lodash';
import { ColorMetaData } from '../model/color-meta-data.model';
import { OSMColorManager } from './osm-color-manager';
import { DivIcon } from 'leaflet';
import { MarkerMetaData } from '../model/marker-meta-data.model';
import { MakerClusterGroupMetaData } from '../model/maker-cluster-group-meta-data';

export class OSMMarkerclusterManager {
  //#region Singleton
  private static _instance: OSMMarkerclusterManager = null;
  private constructor() { };
  public static getInstance(): OSMMarkerclusterManager {
    if (this._instance == null) {
      this._instance = new OSMMarkerclusterManager();
    }
    return this._instance;
  }
  //#endregion Singleton
  markerClusterGroups = {};

  CreateMarkerClusterGroup(gpname: string) {
    let mkclgroup: L.MarkerClusterGroup;
    if (this.HasMarkerClusterGroup(gpname) == false) {
      //建立MarkerClusterGroup

      let bgcolor = OSMColorManager.getInstance().getColorByCompany(gpname);
      let markerClusterOptions = OSMMarkerclusterManager.getInstance().getMarkclusterOptions(bgcolor);
      mkclgroup = L.markerClusterGroup(markerClusterOptions);
      let markermetadatas: MarkerMetaData[] = [];
      let obj: MakerClusterGroupMetaData = {
        name: gpname,
        group: mkclgroup,
        markermetadatas: markermetadatas
      };
      this.markerClusterGroups[gpname] = obj;
    } else {
      mkclgroup = this.markerClusterGroups[gpname].group;
    }
  }
  GetMarkerClusterGroup(gpname: string): MakerClusterGroupMetaData {
    return this.markerClusterGroups[gpname];
  }
  private HasMarkerClusterGroup(name: string): boolean {
    let ret = true;
    //console.log(this.markerClusterGroups.hasOwnProperty(name));
    ret = this.markerClusterGroups.hasOwnProperty(name);
    return ret;
  }
  AddMarkMetaDataToGroup(gpname: string, markerMetaData: MarkerMetaData) {
    let mkclGroupMetaData: MakerClusterGroupMetaData = this.GetMarkerClusterGroup(gpname);
    let bgcolor = OSMColorManager.getInstance().getColorByCompany(gpname);
    let fgcolor = OSMColorManager.getInstance().getDefaultFGColor();
    let caption = `${markerMetaData.car_uid}`
    let myicon = OSMMarkerclusterManager.getInstance().makeMarkerIcon(bgcolor, fgcolor, caption);
    let markdata = L.marker(markerMetaData.position, { icon: myicon });
    markerMetaData.markerInstance = markdata;
    mkclGroupMetaData.markermetadatas.push(markerMetaData);
    mkclGroupMetaData.group.addLayer(markdata);
  }
  getMarkclusterOptions(bgcolor: ColorMetaData): L.MarkerClusterGroupOptions {
    let bgColour = bgcolor.RGBAToHexA();
    let markerHtmlStyles = `
    background-color: ${bgColour};
    `;
    let markerClusterOptions = {
      singleMarkerMode: false,
      iconCreateFunction: function (cluster) {
        //console.log(cluster);
        let childCount = cluster.getChildCount();
        let html = `<div style="${markerHtmlStyles}">
        <span>${childCount}</span>
        <div>`;
        let icon = L.divIcon({
          iconSize: [40, 40],
          className: 'marker-cluster',
          html: html
        });
        return icon;

        //var markers = cluster.getAllChildMarkers();
        // { html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) })

        // var html = `<div style="${markerHtmlStyles}">
        // <span>${childCount}</span>
        // <div>`;
        // let icon;
        // if (childCount == 1) {
        //   //_.
        //   //剩下一個時的顯示
        //   let fgcolor = OSMColorManager.getInstance().getDefaultFGColor();
        //   let caption = `${childCount}`
        //   icon = OSMMarkerclusterManager.getInstance().makeMarkerIcon(bgcolor, fgcolor, caption);
        // } else {
        //   icon = L.divIcon({
        //     iconSize: [40, 40],
        //     className: 'marker-cluster',
        //     html: html
        //   });
        // }
        // return icon;
      }
    };
    return markerClusterOptions;
  }
  makeMarkerIcon(bgcolor: ColorMetaData, fgcolor: ColorMetaData, caption): DivIcon {
    //let isFa = false
    //let myCustomColour = color + 'd0';
    let mybgColour = bgcolor.RGBAToHexA();

    let size = 10,// size of the marker
      border = 2; // border thckness
    let markerHtmlStyles = `
    background-color: ${mybgColour};
  	width: ${size * 3}px;
  	height: ${size * 3}px;
  	display: block;
  	left: ${size * -1.5}px;
  	top: ${size * -1.5}px;
  	position: relative;
  	border-radius: ${size * 3}px ${size * 3}px 0;
  	transform: rotate(45deg);
  	border: ${border}px solid #FFFFFF;
    `;
    let captionStyles;
    let colorText = fgcolor.RGBAToHexA();
    captionStyles = `
      transform: rotate(-45deg);
      display:block;
      width: ${size * 9}px;
      text-align: center;
      line-height: ${size * 9}px;
      color: ${colorText};
      margin-top: -${size * 9 / 3}px;
      margin-left: -${size * 9 / 3}px;
      font-size: 14px;
      `;
    let icon = L.divIcon({
      className: 'color-pin-' + mybgColour.replace('#', ''),
      iconAnchor: [border, size * 2 + border * 2],
      popupAnchor: [0, -(size * 3 + border)],
      html: `<div style="${markerHtmlStyles}"><span style="${captionStyles}">${caption || ''}</span></div>`
    });

    return icon;
  }
}
