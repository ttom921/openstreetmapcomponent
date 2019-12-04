import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { TestOpenStreetComponent } from './page/test-open-street/test-open-street.component';
import { OsmViewComponent } from '../_common/map/osm-view/osm-view.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    OsmViewComponent,
    TestShowPageComponent,
    TestOpenStreetComponent],
  imports: [
    SharedAngularMaterialModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    DashboardRoutingModule,
  ],
  exports: [
    SharedAngularMaterialModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
