import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';

import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class MetricService {
    public url: string;
    public phpurl: string;
    public phpcmd: string;
    public identity;
    public token;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.phpurl = GLOBAL.phpurl;
    }
    retrieve(unitId?: number) {
      const idd = (unitId === undefined) ? 1 : unitId;
      const json  = '{ "name":"getMetrics", "param":{ "unitId": ' + idd + ' } }';
        const headers = new Headers({'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()});
        const salida = this._http
            .post(this.phpurl + 'index.php', json, {headers: headers})
            .pipe(map(res => res.json()));
            //  console.log(salida);
        return salida;
    }
    stockmensual(unitId) {
        const json  = '{ "name":"getMetricsMonths", "param":{ "unitId": ' + unitId + ' } }';
        const headers = new Headers({'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()});
        const salida = this._http
            .post(this.phpurl + 'index.php', json, {headers: headers})
            .pipe(map(res => res.json()));
            //  console.log(salida);
        return salida;
    }
    metricadiaria(level: string, arr: Array<number>) {
      let json: string;
          json  = '{ "name":"getMetricsDayResume", "param": '
          + '{ "nivel": "' + level + '"'
          + ', "unitId": ' + arr[0]
          + ', "aho": ' + arr[1]
          + ', "mes": ' + arr[2]
          + ', "dia": ' + arr[3]
          + ' }'
          + '}';
      console.log(json);
      console.log('Bearer ' + this.getToken());
      const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getToken()});
      const salida = this._http
          .post(this.phpurl + 'index.php', json, {headers: headers})
          .pipe(map(res => res.json()));
          console.log(salida);
      return salida;
    }

    genera(unitId?: number) {
        const T0: number = this.random(-20, -15);
        const H0: number = this.random(1, 8);
        const idd = (unitId === undefined) ? 1 : unitId;
        const json  = '{"name":"addMetric","param":{"unitId":' + idd + ',"metric":{"t0":' + T0 + ',"h0":' + H0 + '}}}';
        const headers = new Headers({'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()});
        const salida = this._http
            .post(this.phpurl + 'index.php', json, {headers: headers})
            .pipe(map(res => res.json()));
            //  console.log(salida);
        return salida;
    }
    public random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    getToken() {
        // let token = JSON.parse(localStorage.getItem('token'));
        const token = localStorage.getItem('token');
            if (token !== 'undefined') {
                this.token = token;

            } else {this.token = null; }
            return this.token;
    }

}
