import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '@app/shared';
// import './shared/rxjs.operators';
import { CoreModule } from '@app/core';
// import {Http, ConnectionBackend } from '@angular/http';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';


import { SettingsModule } from './settings';
import { StaticModule } from './static';
// import { LoginDialogComponent } from './logindialog/login-dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserService } from './services/user.service';

import { InfoModule } from '@app/infoarea/info.module';
// import { BodegonModule } from './bodegon/bodegon.module';
// import { MetricsModule } from './store/metricstore/metric.module';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // forms
    FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule,
    // core & shared
    CoreModule,
    SharedModule,
    ChartsModule,
//    MetricsModule,

    // features
    StaticModule,
    SettingsModule,
    InfoModule,
   // BodegonModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent // , InfometricsComponent // , LoginDialogComponent
  ],
  providers: [ UserService, HttpClientModule],
  bootstrap: [AppComponent]

})
export class AppModule {}
