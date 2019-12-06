import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LatLngExpression, latLng, LatLng } from 'leaflet';
import { MarkerMetaData } from 'src/app/_common/map/model/marker-meta-data.model';
import { MapTestUtil } from 'src/app/_utility/map/map-test-util';
import { OsmViewComponent } from 'src/app/_common/map/osm-view/osm-view.component';
import { OSMMarkerclusterManager } from 'src/app/_common/map/manager/osm-markercluster-manager';
import { MakerClusterGroupMetaData } from 'src/app/_common/map/model/maker-cluster-group-meta-data';
import { OsmDataService } from 'src/app/_services/map/osm-data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PolylineMetaData } from 'src/app/_common/map/model/polyline-meta-data.model';
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
    private osmDataService: OsmDataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log("ngOnInit------------------");
    // //let url = 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=0b544701-fb47-4fa9-90f1-15b1987da0f5';
    // let url = '/opendata/datalist/apiAccess?scope=resourceAquire&rid=0b544701-fb47-4fa9-90f1-15b1987da0f5';
    // let data$ = this.http.get(url).pipe(map(x => x));
    // data$.subscribe(data => {
    //   console.log(data);
    // });

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
  TestRouterAPI() {
    //flat=24.933165613697&flon=121.26646518242&
    //tlat=24.933905008646&tlon=121.26541912091
    let startpos: LatLngExpression = [24.933165613697, 121.26646518242];
    let endpos: LatLngExpression = [24.933905008646, 121.26541912091];
    // this.osmDataService.getRouter(latLng(startpos), latLng(endpos)).subscribe(data => {
    //   console.log(data);
    // });

    // let latlngs: LatLngExpression[] = [];
    // latlngs.push(startpos);
    // latlngs.push(endpos);
    // let polylineMetaData: PolylineMetaData = new PolylineMetaData();
    // polylineMetaData.description = "this a test";
    // polylineMetaData.name = "hi-8888";
    // polylineMetaData.latlngs = latlngs;
    // this.osmap.AddOverPolylineLayer(polylineMetaData);

    this.osmDataService.getRouter2(latLng(startpos), latLng(endpos)).subscribe(data => {
      //console.log(data);

      //console.log(data.coordinates);
      let polylineMetaData: PolylineMetaData = new PolylineMetaData();
      polylineMetaData.description = "this a test";
      polylineMetaData.name = "hi-8888";
      let latlngs: LatLngExpression[] = [];
      latlngs.push([24.933165, 121.266465]);
      latlngs.push([24.933277, 121.264675]);
      // data.coordinates.forEach(element => {
      //   let lat = element[0];
      //   let lng = element[1];
      //   // console.log(element.lat);
      //   // console.log(element.lng);
      //   latlngs.push([lat, lng]);
      // });
      polylineMetaData.latlngs = latlngs;
      this.osmap.AddOverPolylineLayer(polylineMetaData);
      console.log(latlngs);
    });



  }
  TestUpdateMarkClusterPosition() {
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
  Testmakercluster() {


  }
}
