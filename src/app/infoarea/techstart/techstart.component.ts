import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';

import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Router } from '@angular/router';

import { UnitService } from '../../services/unit.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
// import { Ubicacion } from '../models/ubicacion';
// import { SimpleTimer } from 'ng2-simple-timer';

// import { Metric } from '../models/metric';
// import { ChartsService } from './charts/echarts/charts.service';
// import { MetricService } from '../services/metric.service';
// import { EChartsComponent } from './charts/echarts/echarts.component';
// import { EChartOption } from 'echarts';
import * as echarts from 'echarts';

import { Metric } from '../../model/metric';
// import { ChartsService } from '../../services//echarts/charts.service';
import { MetricService } from '../../services/metric.service';

@Component({
  selector: 'anms-TechstartComponent',
  templateUrl: './techstart.component.html',
  styleUrls: ['./techstart.component.scss'],
  providers: [
      MetricService
      // , ChartsService
    ]
})
export class TechstartComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;
  public titulo: string;
  // public user: User;
  public identity;
  public token;
  public url;
  public metrics: any[];
  public phpurl;
  public showloading = false;
  public AnimationBarOption;
  public options;
  public loading;

  public counter1 = 0;
  public timer1Id: string;
  public timer1button = 'time';

  public counter2 = 0;
  public timer2Id: string;
  public timer2button = 'time';

  public p: number = 1;
  xAxisData = [];
  data1 = [];
  data2 = [];

  public units: Array<any> = [];
  public currentUnit: number;
  public currentUnitName: string;

  constructor(
    //  private _chartsService: ChartsService,
      private _userService: UserService,
      private _metricService: MetricService,
      private _unitService: UnitService,
      private st: SimpleTimer,
      private router: Router
    ) {
      this.titulo = 'Metricas';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.phpurl = GLOBAL.phpurl;

      this._unitService.lista().subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        response => { console.log(' UNITSSSS: ' + JSON.stringify(response));
            if (response.error !== undefined) {
              if (response.error.status === 302 || response.error.status === 301 ) {
                this.router.navigate(['login']); }
              return;
            }
            this.setUnits(response.result);
          },
        error => {
            const errorMessage = <any>error;
            if (errorMessage != null) { console.log(error); }
      });

      for (let i = 0; i < 100; i++) {
        this.xAxisData.push('Type ' + i);
        this.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        this.data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }
    }

  ngOnInit() {

    this.st.newTimer('5sec', 3, true);
    this.st.newTimer('10sec', 4, true);

    //  this.AnimationBarOption = this._chartsService.getAnimationBarOption();
      console.log('ubic-list componente cargado');
     this.setBar();
     this.subscribeTimer1();
  }

  public setUnits(arr: Array<any>) {
    this.units = arr;
    if (this.units.length > 0 ) {
      this.selUnit(+this.units[0]._id, this.units[0].name);
    }
  }
  public selUnit(id: number, unitName: string) {
    this.currentUnit = id;
    this.currentUnitName = unitName;
    // this.xAxisData = [];
    // this.data1 = [];
    // this.data2 = [];
    // this.setBar();

  }


  pageChange(x) {
    this.p = x;
  }
  setBar() {
    this.AnimationBarOption = {
        legend: {
            data: ['Example data1', 'Example data2'],
            align: 'left'
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled'],
                    title: ['stack', 'tiled']
                },
                saveAsImage: {
                  title: 'Save',
                  pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            data: this.xAxisData,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
        },
        series: [{
            name: 'Example data1',
            type: 'bar',
            data: this.data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: 'Example data2',
            type: 'bar',
            data: this.data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.st.unsubscribe(this.timer1Id);
    this.timer1Id = undefined;
    this.timer1button = 'off';
    this.st.unsubscribe(this.timer2Id);
    this.timer2Id = undefined;
    this.timer2button = 'off';
  }
 // delAllTimer() {
// 	this.st.delTimer('5sec');
  // }
  subscribeTimer1() {
      if (this.timer1Id) {
    // Unsubscribe if timer Id is defined
        this.st.unsubscribe(this.timer1Id);
          this.timer1Id = undefined;
        this.timer1button = 'time';
        this.counter1 = 0;
        this.metrics = undefined;
      console.log('timer 1 Unsubscribed.');
      } else {
      // Subscribe if timer Id is undefined
        this.timer1Id = this.st.subscribe('5sec', () => this.timer1callback());
        this.timer1button = 'off';
        this.counter1++;
        this.prendemetric();
        console.log('timer 1 Subscribed.');
      }
   // console.log(this.st.getSubscription());
}
  timer1callback(): void {
    this.counter1++;
    this.prendemetric();
    this.p = 1;
  }
  subscribeTimer2() {
    if (this.timer2Id) {
  // Unsubscribe if timer Id is defined
      this.st.unsubscribe(this.timer2Id);
        this.timer2Id = undefined;
      this.timer2button = 'time';
      this.counter2 = 0;
      console.log('timer 2 Unsubscribed.');
    } else {
    // Subscribe if timer Id is undefined
      this.timer2Id = this.st.subscribe('10sec', () => this.timer2callback());
      this.timer2button = 'off';
      this.counter2++;
      this.genermetric();
      console.log('timer 2 Subscribed.');
    }
 // console.log(this.st.getSubscription());
}
timer2callback(): void {
  this.counter2++;
  this.genermetric();
}

  public prendemetric() {
    this._metricService.retrieve(this.currentUnit).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      response => {
        // console.log(' JSONNNN: ' + JSON.stringify(response));
          this.metrics = response.result;
          this.xAxisData = [];
          this.data1 = [];
          this.data2 = [];
        for (let i = 0; i < this.metrics.length; i++) {
            this.xAxisData.push(this.metrics[i].metricDate);
            this.data1.push(this.metrics[i].metricT0);
            this.data2.push(this.metrics[i].metricH0);
          }
          this.setBar();
        },
      error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
              console.log(error);
          }
    });
  }
  public genermetric() {
    this._metricService.genera(this.currentUnit).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      response => {
        // console.log(' JSONNNN: ' + JSON.stringify(response));
         // this.metrics = response.result;
      },
      error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
              console.log(error);
          }
    });
  }

}
