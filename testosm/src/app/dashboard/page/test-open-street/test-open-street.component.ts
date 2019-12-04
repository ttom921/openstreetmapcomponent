import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import { MarkerMetaData } from 'src/app/_common/map/model/marker-meta-data.model';
import { MapTestUtil } from 'src/app/_utility/map/map-test-util';
import { OsmViewComponent } from 'src/app/_common/map/osm-view/osm-view.component';

@Component({
  selector: 'app-test-open-street',
  templateUrl: './test-open-street.component.html',
  styleUrls: ['./test-open-street.component.scss']
})
export class TestOpenStreetComponent implements OnInit, AfterViewInit {


  @ViewChild('osmmap', { static: true }) osmap: OsmViewComponent;
  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.createMakerClusterData();
  }
  Testmakercluster() {

  }
  createMakerClusterData() {
    let companysata: {
      name: string,
      center: LatLngExpression,
      carnum: number
    }[] = [
        {
          name: "hisharp",
          center: [24.932903, 121.267986],
          carnum: 10
        },
        {
          name: "asa",
          center: [23.098943, 120.217322],
          carnum: 5
        }
      ];
    companysata.forEach(element => {
      let markerMetaData: MarkerMetaData = new MarkerMetaData();
      for (let index = 0; index < element.carnum; index++) {
        //公司
        let compname = `${element.name}`;
        //車牌
        let car_uid = `${element.name}-${index}`;
        //位置
        let pos = MapTestUtil.getInstance().getCenterRandom(element.center);
        markerMetaData.car_uid = car_uid;
        markerMetaData.name = compname;
        markerMetaData.position = pos;
        markerMetaData.description = `desc--${car_uid}`;
        this.osmap.AddOverMakerClusterLayer(markerMetaData);
      }

    });
  }
}
