import { Component, OnInit, Input, ViewChild, HostBinding, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Layer, tileLayer, latLng, LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { MarkerMetaData } from '../model/marker-meta-data.model';
import { OSMMarkerclusterManager } from '../manager/osm-markercluster-manager';
import { ColorMetaData } from '../model/color-meta-data.model';
import { OSMColorManager } from '../manager/osm-color-manager';
import { MakerClusterGroupMetaData } from '../model/maker-cluster-group-meta-data';
import { PolylineMetaData } from '../model/polyline-meta-data.model';
import { PolylineGroupMetaData } from '../model/polyline-group-meta-data.model';
import { OSMPolylinegroupManager } from '../manager/osm-polylinegroup-manager';
import { GeoJsonMetaData } from '../model/geojson-meta-data.model';
import { GeojsonGroupMetaData } from '../model/geojson-group-meta-data.model';
import { OSMGeojsongroupManager } from '../manager/osm-geojsongroup-manager';
import { LineString } from 'geojson';

@Component({
  selector: 'osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OsmViewComponent implements OnInit, AfterViewInit {

  @ViewChild('osmmap', { static: true }) osmap: ElementRef;
  @HostBinding('style.width') @Input() width = '20vw';
  @HostBinding('style.height') @Input() height = '20vh';
  /**
    * 設定中心的經緯度
    * @memberof OsmViewComponent
    */
  @Input() center: LatLngExpression = [24.941422, 121.311301];

  /**
   * 目前的zoom的大小
   * @memberof OsmViewComponent
   */
  @Input() zoom = 14;

  map: L.Map;// Values to bind to Leaflet Directive
  //公用的顯示layer
  layers: Layer[] = [];
  options = {};
  layersControl: {};
  //基礎的layer
  LAYER_OSM: any;
  //#region Marker cluster stuff
  // markerClusterGroups: {
  //   name: string,
  //   group: L.MarkerClusterGroup,
  // }[] = [];
  //markerClusterGroups = {};
  //#endregion Marker cluster stuff

  constructor() {
    this.CreateLayer();
  }

  ngOnInit() {
    this.initMapLayer();
  }
  ngAfterViewInit(): void {
    this.osmap.nativeElement.style.width = this.width;
    this.osmap.nativeElement.style.height = this.height;
    //let fmt = `width:${this.width} height:${this.height}`;
    //console.log(fmt);
  }
  //#region 建立layer
  /**
   * 建立基本的layer
   * @memberof OsmViewComponent
   */
  CreateLayer() {
    console.log("CreateLayer----------------------");
    this.CreateBaseLayer();

  }
  CreateBaseLayer() {
    console.log("CreateBaseLayer----------------------");
    //定義baseLayers
    this.LAYER_OSM = {
      id: 'openstreetmap',
      name: 'Open Street Map',
      enable: true,
      layer: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,//設定最大的Zoom
        attribution: 'Open Street Map'
      })
    }
  }
  //#endregion 建立layer
  initMapLayer() {
    console.log("initMapLayer----------------------");
    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.LAYER_OSM.layer,
      },
      overlays: {
        //Square: this.square.layer,
        //Polygon: this.polygon.layer,
        //Marker: this.marker.layer,
        //GeoJSON: this.geoJSON.layer
      }
    };
    this.options = {
      layers: [
        this.LAYER_OSM.layer,
        //markgrp.layerGroup,
        //polylinegrp.layerGroup,
      ],//有設定預設才會選到
      zoom: this.zoom,
      //zoomControl: true,//移除預設的
      center: latLng(this.center)//latLng(24.9345812, 121.2728323)
    }
  }
  onMapReady(ev) {
    console.log("onMapReady----------------------");
    this.map = ev;
  }
  private HasOverlay(name: string): boolean {
    let ret = true;
    let overlays = this.layersControl["overlays"];
    //console.log(overlays.hasOwnProperty(name));
    ret = overlays.hasOwnProperty(name);
    return ret;
  }
  /**
   * 加入marker到maker cluster
   *
   * @param {MarkerMetaData} markerMetaData
   * @memberof OsmViewComponent
   */
  AddOverMakerClusterLayer(markerMetaData: MarkerMetaData) {
    let gpname = markerMetaData.name;
    let mkclgroupmetadata: MakerClusterGroupMetaData;
    //檢查是否已經有此OverLayer
    if (this.HasOverlay(gpname) == false) {
      // //取得markcluster options
      // let bgcolor = OSMColorManager.getInstance().getColorByCompany(gpname);
      // let markerClusterOptions = OSMMarkerclusterManager.getInstance().getMarkclusterOptions(bgcolor);
      // mkclgoup = L.markerClusterGroup(markerClusterOptions);
      // //加入到markerClusterGroups裏面
      // this.markerClusterGroups[gpname] = mkclgoup;
      //建立markergroupcluster
      OSMMarkerclusterManager.getInstance().CreateMarkerClusterGroup(gpname);
      mkclgroupmetadata = OSMMarkerclusterManager.getInstance().GetMarkerClusterGroup(gpname);
      //加入overlays
      let overlays = this.layersControl["overlays"];
      overlays[gpname] = mkclgroupmetadata.group;
    } else {
      //mkclgoup = this.markerClusterGroups[gpname];
      mkclgroupmetadata = OSMMarkerclusterManager.getInstance().GetMarkerClusterGroup(gpname);
    }

    // const myicon = L.icon({
    //   iconUrl: 'assets/marker-icon.png',
    //   shadowUrl: 'assets/markery-shadow.png'
    // });
    // let bgcolor = OSMColorManager.getInstance().getColorByCompany(gpname);
    // let fgcolor = OSMColorManager.getInstance().getDefaultFGColor();
    // let caption = `${markerMetaData.car_uid}`
    // let myicon = OSMMarkerclusterManager.getInstance().makeMarkerIcon(bgcolor, fgcolor, caption);
    // let markdata = L.marker(markerMetaData.position, { icon: myicon });
    // mkclgroupmetadata.group.addLayer(markdata);
    OSMMarkerclusterManager.getInstance().AddMarkMetaDataToGroup(gpname, markerMetaData);
  }
  /**
   * 加入Polyline到layer的group
   * @param {PolylineMetaData} polylineMetaData
   * @memberof OsmViewComponent
   */
  AddOverPolylineLayer(polylineMetaData: PolylineMetaData) {
    let gpname = polylineMetaData.name;
    let polylineGroupMetaData: PolylineGroupMetaData;
    //檢查是否已經有此OverLayer
    if (this.HasOverlay(gpname) == false) {
      //建立polylinegroup
      OSMPolylinegroupManager.getInstance().CreatePolylineGroup(gpname);
      polylineGroupMetaData = OSMPolylinegroupManager.getInstance().GetPolylineGroup(gpname);
      //加入overlays
      let overlays = this.layersControl["overlays"];
      overlays[gpname] = polylineGroupMetaData.group;
    } else {
      polylineGroupMetaData = OSMPolylinegroupManager.getInstance().GetPolylineGroup(gpname);
    }
    OSMPolylinegroupManager.getInstance().AddPolyMetaDataToGroup(gpname, polylineMetaData);
  }
  AddOverGeojsonLayer(geoJsonMetaData: GeoJsonMetaData) {
    let gpname = geoJsonMetaData.name;
    let geojsonGroupMetaData: GeojsonGroupMetaData;
    //檢查是否已經有此OverLayer
    if (this.HasOverlay(gpname) == false) {
      //建立geojsongroup
      OSMGeojsongroupManager.getInstance().CreateGeojsonGroup(gpname);
      geojsonGroupMetaData = OSMGeojsongroupManager.getInstance().GetGeojsonGroup(gpname);

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
      // let overlays = this.layersControl["overlays"];
      // overlays[gpname] = layer;

      //加入overlays
      let overlays = this.layersControl["overlays"];
      overlays[gpname] = geojsonGroupMetaData.group;

    } else {
      geojsonGroupMetaData = OSMGeojsongroupManager.getInstance().GetGeojsonGroup(gpname);
    }
    OSMGeojsongroupManager.getInstance().AddGeojsonMetaDataToGroup(gpname, geoJsonMetaData);
  }
}
