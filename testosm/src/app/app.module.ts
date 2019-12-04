import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathNotFoundComponent } from './error-pages/path-not-found/path-not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    PathNotFoundComponent,
  ],
  imports: [
    LeafletModule.forRoot(),
    AppRoutingModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
