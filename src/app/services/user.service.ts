import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
// import {map} from 'rxjs/operators';
// .pipe(map(res => res.json()));
// tslint:disable-next-line:class-name
interface comandophp {
  name: string;
  param: any;
  userId?: number;
}
@Injectable()
export class UserService {
  public url: string;
  public phpurl: string;
  public phpcmd: string;
  public identity;
  public token;
  constructor(private _http: Http) {
    this.url = GLOBAL.url;
    this.phpurl = GLOBAL.phpurl;
  }
    signup (user_to_login, gethash = null) {
      if ( gethash != null) {
        user_to_login.gethash = gethash;
      }
      const phpcmd: comandophp = {
        name: 'generateToken',
        param: user_to_login
      };

      const json = JSON.stringify(phpcmd);
      const params = json;
      console.log(params);

      const headers = new Headers({'Content-Type': 'application/json'});
      const salida = this._http
        .post(this.phpurl + 'index.php', params, {headers: headers})
        .pipe(map( res => res.json()));
        // console.log(JSON.stringify(salida));
        return salida;
    }
    register(user_to_register) {
      const params = JSON.stringify({
        name: 'addUser',
        param: user_to_register
      });

      console.log(params);

      const headers = new Headers({'Content-Type': 'application/json'});
      const salida = this._http
        .post(this.phpurl + 'index.php', params, {headers: headers})
        .pipe(map( res => res.json()));
         console.log(JSON.stringify(salida));
        return salida;
   }

   updateUser(user_to_update) {

      const phpcmd: comandophp = {
        name: 'updateUser',
        param: user_to_update,
        userId: user_to_update._id
      };

      const json = JSON.stringify(phpcmd);
      const params = json;
      console.log(params);

      const headers = new Headers({'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getToken()});
      const salida = this._http
        .post(this.phpurl + 'index.php', params, {headers: headers})
          .pipe(map(res => res.json()));

      return salida;

    }

    getIdentity() {
      // let identity = JSON.parse(localStorage.getItem('identity'));
      const identity = localStorage.getItem('identity');
        // console.log(identity);
      if ( identity !== 'undefined') {
          this.identity = JSON.parse(identity);
      } else { this.identity = null; }
      return this.identity;
    }

    getToken() {
    // let token = JSON.parse(localStorage.getItem('token'));
      const token = localStorage.getItem('token');
      if ( token !== 'undefined' ) {
        this.token = token;
      } else {this.token = null; }
      return this.token;
    }
}
