import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core'
import {StorageServiceModule} from 'angular-webstorage-service';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout/layout.module';
import {PagesModule} from './pages/pages.module';
import {PrincipalService} from './shared/service/principal.service';

import {UserRouteAccessService} from './shared/auth/user-route-access-service';

import * as $ from "jquery";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    AppRoutingModule,
    PagesModule,
    StorageServiceModule
  ],
  providers: [
    PrincipalService,
    UserRouteAccessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
