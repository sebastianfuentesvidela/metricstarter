
    import { Component } from '@angular/core';
    import { environment as env } from '@env/environment';
    import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
    import { SimpleTimer } from 'ng2-simple-timer';
    import { Router } from '@angular/router';

    import { UnitService } from '../../services/unit.service';
    import { UserService } from '../../services/user.service';
    import { MetricService } from '../../services/metric.service';
    import { GLOBAL } from '../../services/global';
    import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'line-chart-demo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.scss']
})
export class GrafoComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  public titulo = 'Curvas';
      public showloading = true;
      public identity;
      public token;
      public url;
      public phpurl;
      public metricstat: Array<any>;
      public metrickeys: Array<any> = [];
      public mesesUi: Array<any> = [];
      public units: Array<any> = [];
      public currentUnit: number;
      public currentUnitName: string;
      public currentLevel: string;
      public currPeriod: string;
      public cota100 = 100;
      public cota20 = 20;
      public curAho: number;
      public curMes: number;
      public curDia: number;
      public curUnit: number;
      public p = 1;
      public showFiller = false;
      public AnimationBarOption = {};
      public AnimationBarOption2 = {};

      xAxisData = [];
      data1 = [];
      data2 = [];
      data3 = [];
      hata1 = [];
      hata2 = [];
      hata3 = [];

      // events
      constructor(
        //  private _chartsService: ChartsService,
          private _userService: UserService,
          private _metricService: MetricService,
          private _unitService: UnitService,
          private st: SimpleTimer,
          private router: Router,
          private excelService: ExcelService
        ) {
          const wWidth = window.innerWidth;
          // console.log('wWidth ' + wWidth);
              this.titulo = 'Diario Metricas';
              this.titulo = 'Metricas';
              this.identity = this._userService.getIdentity();
              this.token = this._userService.getToken();
              this.url = GLOBAL.url;
              this.phpurl = GLOBAL.phpurl;
               this._unitService.lista().subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                response => { // console.log(' UNITSSSS: ' + JSON.stringify(response));
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

        }

        exportToExcel() {
          this.excelService.exportAsExcelFile(this.metricstat, this.currentUnitName, this.currPeriod.replace('/', '-'));
        }
        pageChange(x) {
          this.p = x;
        }
        public selUnit(id: number, unitName: string) {
          this.currentUnit = id;
          this.currentUnitName = unitName;
          this.metricstat = [];
          this.xAxisData = [];
          this.data1 = [];
          this.data2 = [];
          this.data3 = [];
          this.hata1 = [];
          this.hata2 = [];
          this.hata3 = [];
          this.setBar();
          this.prendemeses(this.currentUnit);

        }

        public setUnits(arr: Array<any>) {
          this.units = arr;
          if (this.units.length > 0 ) {
            this.selUnit(+this.units[0]._id, this.units[0].name);
          }
        }

        public setStatistics(arr: Array<any>) {
          this.metricstat = arr;
          // this.xAxisData = [];
          // this.data1 = [];
          // this.data2 = [];
          // this.data3 = [];
          // this.hata1 = [];
          // this.hata2 = [];
          // this.hata3 = [];
          for ( let i = 0; i < arr.length; i++ ) {
            let leg = arr[i].FECHA;
            if ( this.currentLevel === 'dia') { leg += '\n' + arr[i].HORA + ':00'; }
            this.xAxisData.push(leg);
            this.data1.push(+arr[i].MAXT0);
            this.data2.push(+arr[i].MINT0);
            this.data3.push(+arr[i].AVGT0);
            this.hata1.push(+arr[i].MAXH0);
            this.hata2.push(+arr[i].MINH0);
            this.hata3.push(+arr[i].AVGH0);
          }
          this.setBar();
          // console.log('length:' + JSON.stringify(this.metricstat));
          this.p = 1;
        }
        public setMeses(arr: Array<any>) {
            this.mesesUi = arr;
            this.currPeriod = this.mesesUi[0].YEARMONTH;
            this.prendemetric('mes', [this.currentUnit, +this.mesesUi[0].YEAR, +this.mesesUi[0].MONTH, 0]);

        }
        public prendemeses(uid: number) {
          this.mesesUi = [];
          this.currPeriod = '';
          this._metricService.stockmensual(uid).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
              // console.log(' JSONNNN: ' + JSON.stringify(response));
                if (response.error !== undefined) {
                  if (0 < [302, 301].indexOf(+response.error.status)) {
                    this.router.navigate(['login']); }
                  return;
                }
                this.setMeses(response.result);
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    console.log(error);
                }
          });
        }
        public prendemetric(arg0: string, arpar: Array<number>) {
          this.metricstat = [];
          this.xAxisData = [];
          this.data1 = [];
          this.data2 = [];
          this.data3 = [];
          this.hata1 = [];
          this.hata2 = [];
          this.hata3 = [];
          this.currentLevel = arg0;
          this.curUnit = +arpar[0];
          this.curAho = +arpar[1];
          this.curMes = +arpar[2];
          this.curDia = +arpar[3];
          this._metricService.metricadiaria(arg0, arpar).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
              // console.log(' JSONNNN: ' + JSON.stringify(response));
                if (response.error !== undefined) {
                  if (response.error.status === 302) {
                    this.router.navigate(['login']); }
                  return;
                }
                this.setStatistics(response.result);
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    console.log(error);
                }
          });

      }

      setBar() {
        this.AnimationBarOption = {
          legend: {
              data: ['MAXT0', 'MINT0', 'AVGT0'],
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
                    pixelRatio: 4
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
              name: 'MAXT0',
              type: 'line',
              data: this.data1,
              animationDelay: function (idx) {
                  return idx * 10;
              }
            }, {
              name: 'MINT0',
              type: 'line',
              data: this.data2,
              animationDelay: function (idx) {
                  return idx * 10 + 100;
              }
            }, {
              name: 'AVGT0',
              type: 'line',
              data: this.data3,
              animationDelay: function (idx) {
                  return idx * 10 + 100;
              }
          }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
              return idx * 5;
          }
      };
      this.AnimationBarOption2 = {
        legend: {
            data: ['MAXH0', 'MINH0', 'AVGH0'],
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
                  pixelRatio: 4
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
            name: 'MAXH0',
            type: 'line',
            data: this.hata1,
            animationDelay: function (idx) {
                return idx * 10;
            }
          }, {
            name: 'MINH0',
            type: 'line',
            data: this.hata2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
          }, {
            name: 'AVGH0',
            type: 'line',
            data: this.hata3,
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
}

