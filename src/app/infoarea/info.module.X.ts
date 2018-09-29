// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { SharedModule } from '@app/shared';
// // import { NgxEchartsModule } from 'ngx-echarts';

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';

import { INFO_FEATURE_NAME, reducers } from './info.state';
// import { ExamplesRoutingModule } from './examples-routing.module';
// import { ExamplesComponent } from '../examples/examples/examples.component';
// import { ComandasContainerComponent } from './todos/components/todos-container.component';
// import { ComandasEffects } from './todos/todos.effects';
// import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
// import { StockMarketEffects } from './stock-market/stock-market.effects';
// import { StockMarketService } from './stock-market/stock-market.service';
// import { ParentComponent } from './theming/parent/parent.component';
// import { ChildComponent } from './theming/child/child.component';
// import { AuthenticatedComponent } from './authenticated/authenticated.component';
// import { EChartsComponent } from './charts/echarts/echarts.component';
import { init, ECharts, EChartOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import { NgxPaginationModule} from 'ngx-pagination';
import { SimpleTimer } from 'ng2-simple-timer';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';


import { InfoRoutingModule } from './info-routing';
// import { InfometricsComponent } from './infometrics/infometrics.component';
import { InfoComponent } from './info.component';
import { TechstartComponent } from './techstart/techstart.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { GrafoComponent } from './grafo/grafo.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MetricService } from '@app/services/metric.service';
import { UnitService } from '@app/services/unit.service';
import { ExcelService } from '@app/services/excel.service';
import { MainchartComponent } from './mainchart/mainchart.component';
import { DinchartComponent } from './dinchart/dinchart.component';

// import { routing,  appRoutingProvider} from './info-routing';
// import { InfometricsComponent } from './infometrics/infometrics.component';
// import { PiezasdeteComponent } from '../piezasdete/piezasdete.component';


@NgModule({
  imports: [
    SharedModule, ChartsModule, NgxEchartsModule,
    NgxPaginationModule, // EChartsComponent,
    InfoRoutingModule, HttpModule, HttpClientModule,
    StoreModule.forFeature(INFO_FEATURE_NAME, reducers),
         // StoreModule.forFeature('metric', appReducer), // {appReducer, routerReducer}),

    StoreRouterConnectingModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    // EffectsModule.forFeature([ComandasEffects, StockMarketEffects])
  ],
  declarations: [
     InfoComponent,
     TechstartComponent,
     GrafoComponent,
     MainchartComponent,
     DinchartComponent,
    // PiezasdeteComponent
  ],
  providers: [SimpleTimer, MetricService, UnitService, ExcelService],
  exports: [
    MainchartComponent,
    DinchartComponent]
})
export class InfoModule {
  p = 1;
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}


export function appReducer(s, a) {
  console.log('ACTION:', s, a);
  if (a.type === 'Increment') {
    const ss = Object.assign({}, s, {app : s.app ? s.app + 1 : 0})
  console.log('s:', ss);
      return ss;

  }

  return s || {};
}
