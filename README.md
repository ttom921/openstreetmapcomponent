# openstreetmapcomponent
openstreetmap的元件

## 建立基本測試環境

## 加入AngularMateial

```
ng add @angular/material
```

加入theme設定
在’styles.scss’中,有四種,會在angular.json中設定

```scss
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
//@import "~@angular/material/prebuilt-themes/purple-green.css";
```

加入SharedAngularMaterial <https://ithelp.ithome.com.tw/articles/10209937

```
ng g m share\SharedAngularMaterial
```

## 在MatIcon中使用Icon Font

```bash
npm install --save @fortawesome/fontawesome-free
```

接下來在src\styles.scss中

```scss
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
//@import "~@angular/material/prebuilt-themes/purple-green.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
```

## 加人dashboard的模組

```
ng g m dashboard --routing
```

### 加人dashboard的元件

```
ng g component dashboard
```



### 加入頭和側邊框

```
ng g component dashboard/Header
ng g component dashboard/Sidebar
```

## 加入404頁

```
ng g c error-pages/PathNotFound
```

## 設定module

在`src\app\app.module.ts`

```typescript
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathNotFoundComponent } from './error-pages/path-not-found/path-not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    PathNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

在`src\app\dashboard\dashboard.module.ts`

```typescript
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent],
  imports: [
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  exports: [
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

```

## 設定路由

在`src\app\app-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathNotFoundComponent } from './error-pages/path-not-found/path-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '404', component: PathNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

在`src\app\dashboard\dashboard-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      // {
      //   path:'',compont:xxxxComponent
      // }
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
```

## 設定SCSS

### 設定全域的SCSS

```scss
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
//@import "~@angular/material/prebuilt-themes/purple-green.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
//使mat-car有作用
mat-card{
  margin:4px;
}
//寬度為填滿
.full-width{
  width: 100%;
}
html, body, app-root, mat-sidenav-container, .site {
  margin: 0;
  width: 100%;
  height: 100%;

}
.site {
  display: flex;
  flex-direction: column;

}
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:64px;
}
.fill-remaining-space {
  // 使用 flexbox 填充剩余空间
  // @angular/material 中的很多控件使用了 flex 布局
  flex: 1 1 auto;
}
//#region 以下是自定義字型大小
.mat-raised-button {
  font-size: 18px;
}
// .mat-list-base .mat-list-item .mat-line:nth-child(n+2) {
//   font-size: 18px;
// }
.mat-line {
  font-size: 18px !important;
}
.mat-list-base .mat-list-option {
  font-size: 18px;
}
.mat-header-cell{
  font-size: 14px;
}
.mat-cell{
  font-size: 18px;
}

//#endregion 以下是自定義字型大小
```

## 設定DashboardComponent

設定`src\app\dashboard\dashboard.component.html`

```html
<header>
  <app-header (toggle)="sidenav.toggle()"></app-header>
</header>
<mat-sidenav-container>
  <mat-sidenav #sidenav mode="over" [autoFocus]="false">
    <app-sidebar (navClicked)="sidenav.close()"></app-sidebar>
  </mat-sidenav>

  <mat-sidenav-content #benji>
    <div class="site">

      <main>
        <router-outlet #cite (activate)="onActivate($event)"></router-outlet>
      </main>

    </div>
  </mat-sidenav-content>


</mat-sidenav-container>

```

在`src\app\dashboard\dashboard.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('benji', { static: false }) el !: MatSidenavContent;
  constructor() { }

  ngOnInit() {
  }
  onActivate(event) {
    //讓內容移到最上面
    if (this.el && this.el.getElementRef().nativeElement) {
      this.el.getElementRef().nativeElement.scrollTop = 0;
    }
  }
}

```

##  設定HeaderComponent

在`src\app\dashboard\header\header.component.html`

```html
<mat-toolbar color="primary">
  <button mat-icon-button (click)="onClick()">
    <mat-icon>menu</mat-icon>
  </button>
  <span></span>
  <!-- 在這之後的都會被推到右邊去 -->
  <span class="fill-remaining-space"></span>

  <mat-icon matPrefix style="margin-right: 10px;font-size: 24px;">account_circle</mat-icon>
  <span style="margin-right: 32px;">{{user_id}}</span>

  <button mat-icon-button>
    <mat-icon>exit_to_app</mat-icon>
  </button>

</mat-toolbar>
```



在`src\app\dashboard\header\header.component.ts`

```typescript
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  user_id: string = "測試用"
  constructor() { }

  ngOnInit() {
  }
  onClick() {
    this.toggle.emit();
  }
}
```
在`src\app\dashboard\header\header.component.scss`

```scss
.mat-toolbar {
  position: fixed;
  height: 64px;
  top: 0;
  z-index: 2;
}
```

## 建立測試頁面

```
ng g component dashboard/page/testShowPage
```

在`src\app\dashboard\page\test-show-page\test-show-page.component.html`

```html
<p>test-show-page works!</p>
<div style="width: 80vw;height: 70vh;background-color: aqua;">

</div>
```

## 設定SidebarComponent

在`src\app\dashboard\sidebar\sidebar.component.html`

```html
<mat-nav-list style="margin-top: 64px;width:192px;" color="primary">
  <!-- <h3 matSubheader>示範用頁面</h3> -->
  <mat-list-item [routerLink]="['/','dashboard','testshowpage']" (click)="handleClicked($event)">
    <mat-icon md-list-icon>dns</mat-icon>OpenTestShow <span style="width: 100%;"></span>
    <mat-icon matSuffix class="SufficIcon">keyboard_arrow_right</mat-icon>
  </mat-list-item>


  <mat-divider></mat-divider>
  <!-- 另外一組選單 -->
  <!-- <h3 matSubheader>其他頁面</h3> -->
  <!-- <a [routerLink]="['/']" mat-list-item>首頁</a>
        <a [routerLink]="['/']" mat-list-item>Google</a>
        <a [routerLink]="['/']" mat-list-item>Facebook</a> -->
</mat-nav-list>

```

在`src\app\dashboard\sidebar\sidebar.component.ts`

```typescript
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navClicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  handleClicked(ev: Event) {
    ev.preventDefault();
    this.navClicked.emit();
  }
}
```
在`src\app\dashboard\sidebar\sidebar.component.scss`

```scss
.mat-icon{
  margin-right: 12px;
}
.SufficIcon{
  margin:0px;
}
```

## 設定DashboardRoutingModule

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'testshowpage', pathMatch: 'full' },
      { path: 'testshowpage', component: TestShowPageComponent, }
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

```

## 建立測試頁面

```
ng g component dashboard/page/TestOpenStreet
```

在`src\app\dashboard\dashboard-routing.module.ts`修改路由

```typescript
const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'testshowpage', pathMatch: 'full' },
      { path: 'testopenstreet', component: TestOpenStreetComponent },
      { path: 'testshowpage', component: TestShowPageComponent, },
    ]
  },
  { path: '**', redirectTo: '404' }
];
```

在`src\app\dashboard\sidebar\sidebar.component.html`側邊欄加入

```html
<mat-list-item [routerLink]="['/','dashboard','testopenstreet']" (click)="handleClicked($event)">
    <mat-icon md-list-icon>dns</mat-icon>OpenStreet <span style="width: 100%;"></span>
    <mat-icon matSuffix class="SufficIcon">keyboard_arrow_right</mat-icon>
  </mat-list-item>
```


### 使用ngx-leaflet

先來安裝相關的組件

```
npm install leaflet
npm install -–save-dev @types/leaflet
npm install @asymmetrik/ngx-leaflet
```

加入`markercluster`的元件

```
npm install leaflet.markercluster 
npm install -–save-dev @types/leaflet.markercluster
npm install @asymmetrik/ngx-leaflet-markercluster
```

加入CSS檔在`angular.json`，不然顯示會有問題

```json
"styles": [
              "./node_modules/leaflet/dist/leaflet.css",
    		 "./node_modules/dist/MarkerCluster.Default.css",
              "src/styles.scss"
            ],
```

加入模組在 app.module.ts 

```typescript
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

...
imports: [
    ...
    LeafletModule.forRoot()
]
...
```

在`DashboardModule`

```typescript
imports: [
    //...
    LeafletModule,
    DashboardRoutingModule,
    LeafletMarkerClusterModule,
  ],
  exports: [
    //...
    LeafletModule,
    DashboardRoutingModule,
    LeafletMarkerClusterModule,
  ]
```
### 安裝lodash

```
npm install --save lodash 
npm install --save-dev @types/lodash 
```

```typescript
import * as _ from 'lodash'; 
```

## 建立地圖元件

因為測試了大概的功能，所以來整理一下建立一個元件，將有用的功能來封裝一下，以更之後可以來重複利用。

先來建立元件

```
ng g component _common/map/OsmView
```

基本的地圖顯示

在`src\app\_common\map\osm-view\osm-view.component.html`

```html
<div class="map" #osmmap leaflet [leafletOptions]="options" [leafletLayersControl]="layersControl" [leafletLayers]="layers" (leafletMapReady)="onMapReady($event)">
</div>
```

在`src\app\_common\map\osm-view\osm-view.component.scss`

```scss
.map{
  width: 100vw;
  height: 100vh;
  padding: 0;
 }
```

在`src\app\_common\map\osm-view\osm-view.component.ts`

```typescript
import { Component, OnInit, Input, ViewChild, HostBinding, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Layer, tileLayer, latLng } from 'leaflet';
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
  @Input() center = { lat: 24.941422, lng: 121.311301 };

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
```

