import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { TestOpenStreetComponent } from './page/test-open-street/test-open-street.component';


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
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
