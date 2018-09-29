import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';

import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class UnitService {
    public url: string;
    public phpurl: string;
    public phpcmd: string;
    public identity;
    public token;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.phpurl = GLOBAL.phpurl;
    }
    lista() {
        const json  = '{ "name":"getAllUnits", "param":{ "locationId": 1 } }';
        const headers = new Headers({'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()});
            console.log(this.getToken());
            console.log(json);
            const salida = this._http
            .post(this.phpurl + 'index.php', json, {headers: headers})
            .pipe(map(res => res.json()));
        return salida;
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
