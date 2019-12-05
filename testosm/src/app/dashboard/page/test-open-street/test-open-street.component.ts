import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LatLngExpression, latLng } from 'leaflet';
import { MarkerMetaData } from 'src/app/_common/map/model/marker-meta-data.model';
import { MapTestUtil } from 'src/app/_utility/map/map-test-util';
import { OsmViewComponent } from 'src/app/_common/map/osm-view/osm-view.component';
import { element } from 'protractor';
import { OSMMarkerclusterManager } from 'src/app/_common/map/manager/osm-markercluster-manager';
import { MakerClusterGroupMetaData } from 'src/app/_common/map/model/maker-cluster-group-meta-data';
import { OsmDataService } from 'src/app/_services/map/osm-data.service';

@Component({
  selector: 'app-test-open-street',
  templateUrl: './test-open-street.component.html',
  styleUrls: ['./test-open-street.component.scss']
})
export class TestOpenStreetComponent implements OnInit, AfterViewInit {
  companysata: {
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

  @ViewChild('osmmap', { static: true }) osmap: OsmViewComponent;
  constructor(
    private osmDataService: OsmDataService
  ) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.createMakerClusterData();
  }

  createMakerClusterData() {

    this.companysata.forEach(element => {
      for (let index = 0; index < element.carnum; index++) {
        let markerMetaData: MarkerMetaData = new MarkerMetaData();
        //公司
        let compname = `${element.name}`;
        //車牌
        let car_uid = `${element.name}-${index}`;
        //位置
        let pos: LatLngExpression = MapTestUtil.getInstance().getCenterRandom(element.center);
        markerMetaData.car_uid = car_uid;
        markerMetaData.name = compname;
        markerMetaData.position = latLng(pos);
        markerMetaData.description = `desc--${car_uid}`;
        this.osmap.AddOverMakerClusterLayer(markerMetaData);
      }

    });
  }
  Testmakercluster() {
    this.osmDataService.getInterval().subscribe(data => {
      let mkclgroupmetadata: MakerClusterGroupMetaData;
      this.companysata.forEach(element => {
        mkclgroupmetadata = OSMMarkerclusterManager.getInstance().GetMarkerClusterGroup(element.name);
        //console.log(mkclgroupmetadata.name);

        //let latlng = [diff, diff];
        mkclgroupmetadata.markermetadatas.forEach(item => {
          let rdnum = MapTestUtil.getInstance().getneratelatlng();
          let lat = item.position.lat + rdnum;
          let lng = item.position.lng + rdnum;
          //item.position[0] = item.position[0] + rdnum;
          //item.position[1] = item.position[1] + rdnum;
          let fmt = `${item.name}-${item.car_uid}-[${lat},${lng}]`
          //console.log(fmt);
          item.UpdatePos(latLng(lat, lng));
        });

      });
    });

  }
}
