import { Component, OnInit, Input, ViewChild, HostBinding, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Layer, tileLayer, latLng, LatLngExpression } from 'leaflet';
import * as L from 'leaflet';

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
}
