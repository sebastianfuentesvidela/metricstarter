


import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { MetricService } from '../../services/metric.service';
import * as echarts from 'echarts';

@Component({
  selector: 'anms-mainchart',
  templateUrl: './mainchart.component.html',
  styleUrls: ['./mainchart.component.css']
})
export class MainchartComponent implements OnInit {
  echarts: any = require('echarts');
  // mainChart

  public mainChartLegend = false;
  public mainChartType = 'line';
  public titulo = 'Curva 1';
  constructor(
    private _userService: UserService,
    private _metricService: MetricService,

  ) { }

  ngOnInit(){
    // //set options;
    // var options= {...};
    // var chartView = this.echarts.init(this._chartElement.nativeElement);
    // chartView.setOption(options);
 }

  OldngOnInit() {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];
    const data3 = [];

    this._metricService.metricadiaria('dia', [1, 8, 25]).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      response => {
        console.log(' JSONNNN: ' + JSON.stringify(response));
        //   this.metrics = response.result;
        //   this.data2 = [];
    //    this.mainChartElements = response.result.length;
        for (let i = 0; i < response.result.length; i++) {
          data1.push(Number(response.result[i].MAXT0));
          data2.push(Number(response.result[i].MINT0));
          data3.push(Number(response.result[i].AVGT0));
          xAxisData.push(response.result[i].HORA);
        }
        this.tragametrics(data1, data2, data3, xAxisData);

        },
      error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
              console.log(error);
          }
    });

  }
  public tragametrics(arr1: Array<number>, arr2: Array<number>
    , arr3: Array<number>, arrx: Array<string>) {
  //     this.mainChartData1 = arr1;  //.push(Number(response.result[i].MAXT0));
  //     this.mainChartData2 = arr2; //.push(Number(response.result[i].MINT0));
  //     this.mainChartData3 = arr3;  //.push(Number(response.result[i].AVGT0));
  //     this.mainChartLabels = arrx; // .push(response.result[i].HORA);
  }
  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public prendemetric() {
    this._metricService.metricadiaria('dia', [1, 8, 25]).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      response => {
        console.log(' JSONNNN: ' + JSON.stringify(response));
        //   this.metrics = response.result;
        const xAxisData = [];
        const data1 = [];
        const data2 = [];
        const data3 = [];
        //   this.data2 = [];
        // this.mainChartElements = response.result.length;
        for (let i = 0; i < response.result.length; i++) {
          data1.push(Number(response.result[i].MAXT0));
          data2.push(Number(response.result[i].MINT0));
          data3.push(Number(response.result[i].AVGT0));
          xAxisData.push(response.result[i].HORA);
        }
        // this.mainChartData1 = data1;  // .push(Number(response.result[i].MAXT0));
        // this.mainChartData2 = data2; // .push(Number(response.result[i].MINT0));
        // this.mainChartData3 = data3;  // .push(Number(response.result[i].AVGT0));
        // this.mainChartLabels = xAxisData; // .push(response.result[i].HORA);

        },
      error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
              console.log(error);
          }
    });
  }

}
