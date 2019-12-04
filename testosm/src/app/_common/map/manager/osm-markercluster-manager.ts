import * as L from 'leaflet';
import { ColorMetaData } from '../model/color-meta-data.model';
import { OSMColorManager } from './osm-color-manager';
import { DivIcon } from 'leaflet';

export class OSMMarkerclusterManager {
  private static _instance: OSMMarkerclusterManager = null;
  private constructor() { };
  public static getInstance(): OSMMarkerclusterManager {
    if (this._instance == null) {
      this._instance = new OSMMarkerclusterManager();
    }
    return this._instance;
  }
  getMarkclusterOptions(bgcolor: ColorMetaData): L.MarkerClusterGroupOptions {
    let bgColour = bgcolor.RGBAToHexA();
    let markerHtmlStyles = `
    background-color: ${bgColour};
    `;
    let markerClusterOptions = {
      singleMarkerMode: true,
      iconCreateFunction: function (cluster) {
        //console.log(cluster);
        var childCount = cluster.getChildCount();
        // { html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) })

        var html = `<div style="${markerHtmlStyles}">
        <span>${childCount}</span>
        <div>`;
        let icon;
        if (childCount == 1) {
          //剩下一個時的顯示
          let fgcolor = OSMColorManager.getInstance().getDefaultFGColor();
          let caption = `${childCount}`
          icon = OSMMarkerclusterManager.getInstance().makeMarkerIcon(bgcolor, fgcolor, caption)
        } else {
          icon = L.divIcon({
            iconSize: [40, 40],
            className: 'marker-cluster',
            html: html
          });
        }
        return icon;
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
      width: ${size * 3}px;
      text-align: center;
      line-height: ${size * 3}px;
      color:${colorText};
      `;
    let icon = L.divIcon({
      className: 'color-pin-' + mybgColour.replace('#', ''),
      iconAnchor: [border, size * 2 + border * 2],
      popupAnchor: [0, -(size * 3 + border)],
      html: `<span style="${markerHtmlStyles}"><span style="${captionStyles}">${caption || ''}</span></span>`
    });

    return icon;
  }
}
