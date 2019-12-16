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
import { GeoJsonMetaData } from 'src/app/_common/map/model/geojson-meta-data.model';
import { Observable, of } from 'rxjs';
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

  //測式的車子的資料
  carslatlngdatas: {
    car_uid: string,
    startpos: LatLngExpression,
    endpos: LatLngExpression,
  }[] = [
      {
        car_uid: "8888",
        startpos: [24.943096, 121.378939],
        endpos: [24.933905008646, 121.26541912091],
      },
      {
        car_uid: "666",
        startpos: [24.933905008646, 121.26541912091],
        endpos: [24.943096, 121.378939],
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
  TestGeoRouteAPI() {
    this.carslatlngdatas.forEach(element => {
      this.osmDataService.getRouter(latLng(element.startpos), latLng(element.endpos)).subscribe(data => {
        let geoJsonMetaData: GeoJsonMetaData = new GeoJsonMetaData();
        geoJsonMetaData.name = element.car_uid;
        geoJsonMetaData.colorMetaData.getRandomColor();
        geoJsonMetaData.lineString = {
          type: data.type,
          coordinates: data.coordinates
        };
        this.osmap.AddOverGeojsonLayer(geoJsonMetaData);
      });
    });
    //
    // let startpos: LatLngExpression = [24.943096, 121.378939];
    // let endpos: LatLngExpression = [24.933905008646, 121.26541912091];
    // this.osmDataService.getRouter(latLng(startpos), latLng(endpos)).subscribe(data => {
    //   let geoJsonMetaData: GeoJsonMetaData = new GeoJsonMetaData();
    //   geoJsonMetaData.name = "8888";
    //   geoJsonMetaData.colorMetaData.getRandomColor();
    //   console.log(data);
    //   //geoJsonMetaData.type = data.type;
    //   geoJsonMetaData.lineString = {
    //     type: data.type,
    //     coordinates: data.coordinates
    //   };
    //   this.osmap.AddOverGeojsonLayer(geoJsonMetaData);
    // });
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
  TestGeoRouteORSAPI() {
    // let startpos: LatLngExpression = [24.934851, 121.280228];
    // let endpos: LatLngExpression = [24.931144, 121.280014];
    // this.osmDataService.getRouterORS(latLng(startpos), latLng(endpos)).subscribe(data => {
    //   console.log(data);
    // });
    this.carslatlngdatas.forEach(element => {
      this.osmDataService.getRouterORS(latLng(element.startpos), latLng(element.endpos)).subscribe(data => {
        //console.log(data);
        let features = data.features;
        //console.log(features);
        let geometry = features[0].geometry;
        //console.log(geometry);
        let geoJsonMetaData: GeoJsonMetaData = new GeoJsonMetaData();
        geoJsonMetaData.name = element.car_uid;
        geoJsonMetaData.colorMetaData.getRandomColor();
        geoJsonMetaData.lineString = {
          type: geometry.type,
          coordinates: geometry.coordinates
        };
        this.osmap.AddOverGeojsonLayer(geoJsonMetaData);

      });
    });


  }
  TestCarRouteMap() {
    this.osmDataService.getCarHisRoute().subscribe(geometrydata => {
      // console.log(geometrydata);
      // let geoJsonMetaData: GeoJsonMetaData = new GeoJsonMetaData();
      // geoJsonMetaData.name = "mycar";
      // geoJsonMetaData.colorMetaData.SetDefatulFGColor();
      // geoJsonMetaData.lineString = {
      //   type: geometrydata.type,
      //   coordinates: geometrydata.coordinates
      // };
      // this.osmap.AddOverGeojsonLayer(geoJsonMetaData);

      let postgeodata = null;
      let geodata = this.getGeometrydata(geometrydata.coordinates);
      this.osmDataService.PostCarHisData(geodata).subscribe(data => {
        let features = data.features;
        console.log(features);
        let geometry = features[0].geometry;
        let coordinates = geometry.coordinates;

        let porcgeodata = {
          "type": "LineString",
          "coordinates": coordinates,
        };

        // let features = data.features;
        // console.log(features);
        // let geometry = features[0].geometry;
        // let coordinates = geometry.coordinates;
        // let properties = features[0].properties;
        // //console.log(properties);
        // let way_points = properties.way_points;
        // let mycordata = [];
        // way_points.forEach(element => {
        //   mycordata.push(coordinates[element]);
        // });
        // //console.log(mycordata);
        // let porcgeodata = {
        //   "type": "LineString",
        //   "coordinates": mycordata,
        // };
        // //console.log(porcgeodata);
        this.AddOverGeojsonLayer(porcgeodata);
      });
      //this.AddOverGeojsonLayer(postdata);
      //console.log(postdata);
      // this.osmDataService.PostCarHisData(postdata).subscribe(data => {
      //   //console.log(data);
      //   //postgeodata = data;
      //   //this.AddOverGeojsonLayer(data);
      // });


    });

  }
  getCarmapdata(geodata) {
    this.osmDataService.PostCarHisData(geodata).subscribe(data => {
      //console.log(data);
      //postgeodata = data;
      //this.AddOverGeojsonLayer(data);
      let features = data.features;
      //console.log(features);
      let geometry = features[0].geometry;
      let coordinates = geometry.coordinates;
      let properties = features[0].properties;
      //console.log(properties);
      let way_points = properties.way_points;
      let mycordata = [];
      way_points.forEach(element => {
        mycordata.push(coordinates[element]);
      });
      //console.log(mycordata);
      let porcgeodata = {
        "type": "LineString",
        "coordinates": mycordata,
      }
      return of(porcgeodata);
    });
  }
  getGeometrydata(geometrydata) {
    let maxpoint = 50;
    let start = geometrydata.splice(0, 1)[0];
    let end = geometrydata.splice(geometrydata.length - 1, 1)[0];
    //console.log(start);
    //console.log(end);
    let step = Math.ceil(geometrydata.length / maxpoint);
    let porcgeodata = {};
    let cordatas = [];
    cordatas.push(start);
    for (let index = 0; index < geometrydata.length; index += step) {
      const element = geometrydata[index];
      //console.log(element);
      cordatas.push(element);
    }
    cordatas.push(end);
    porcgeodata = {
      "coordinates": cordatas,
    }

    return porcgeodata;
  }
  AddOverGeojsonLayer(geometrydata) {
    let geoJsonMetaData: GeoJsonMetaData = new GeoJsonMetaData();
    geoJsonMetaData.name = "mycar";
    geoJsonMetaData.colorMetaData.SetDefatulFGColor();
    geoJsonMetaData.lineString = {
      type: geometrydata.type,
      coordinates: geometrydata.coordinates
    };
    this.osmap.AddOverGeojsonLayer(geoJsonMetaData);
  }
  // AddOverGeojsonLayer(geometrydata) {
  //   let features = geometrydata.features;
  //   //console.log(features);
  //   let geometry = features[0].geometry;
  //   let geoJsonMetaData: GeoJsonMetaData = new GeoJsonMetaData();
  //   geoJsonMetaData.name = "mycar";
  //   geoJsonMetaData.colorMetaData.SetDefatulFGColor();
  //   geoJsonMetaData.lineString = {
  //     type: geometry.type,
  //     coordinates: geometry.coordinates
  //   };
  //   this.osmap.AddOverGeojsonLayer(geoJsonMetaData);
  // }
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
