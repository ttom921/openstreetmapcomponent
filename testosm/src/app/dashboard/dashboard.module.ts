import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { TestOpenStreetComponent } from './page/test-open-street/test-open-street.component';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent, TestShowPageComponent, TestOpenStreetComponent],
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
