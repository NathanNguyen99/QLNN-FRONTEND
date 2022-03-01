import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Helpers } from '../../Helpers/helpers';
import { Observable } from 'rxjs';
@Injectable()
export class baseService {
  constructor(private helper: Helpers) {}
  public extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  public handleError(error: Response | any) {
    // In a real-world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    //return Observable.throw(errMsg);
  }

  public headerFormdata() {
    let oheader = new HttpHeaders({ 'Content-Disposition': 'multipart/form-data' });
    oheader.append('Accept', 'application/json');
    if (this.helper.isAuthenticated()) {
      oheader = oheader.append(
        'Authorization',
        'Bearer ' + this.helper.getToken()
      );
      // .append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      // .append('Access-Control-Allow-Origin', '*');
    }
    return { headers: oheader };
  }


  public headerExport() {
    //let oheader = new HttpHeaders({ 'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    let oheader = new HttpHeaders({ 'Content-Type': 'application/json' });
    oheader.append('responseType', 'blob');

    if (this.helper.isAuthenticated()) {
      oheader = oheader.append(
        'Authorization',
        'Bearer ' + this.helper.getToken()
      );
    }
    const httpOptions : Object = {
      headers: oheader,
      responseType: 'blob'
    }
    
    return httpOptions
  }


  public header() {
    let oheader = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    if (this.helper.isAuthenticated()) {
      oheader = oheader.append(
        'Authorization',
        'Bearer ' + this.helper.getToken()
      );
      // .append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      // .append('Access-Control-Allow-Origin', '*');
    }
    return { headers: oheader };
  }

  public header2() {
    //{'headers' : new HttpHeaders ({'Content-Type' : 'application/json'}), 'responseType': 'text', observe:'response'})

    let oheader = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (this.helper.isAuthenticated()) {
      oheader = oheader.append(
        'Authorization',
        'Bearer ' + this.helper.getToken()
      );
      // .append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      // .append('Access-Control-Allow-Origin', '*');
    }
    return { headers: oheader, responseType: 'json', observe: 'response' };
  }

  public header3() {
    //   const options = {
    //     headers: new HttpHeaders().set('Authorization', this.loopBackAuth.accessTokenId),
    //     params: params,
    //     reportProgress: true,
    //     withCredentials: true,
    // }

    let oheader = new HttpHeaders();
    if (this.helper.isAuthenticated()) {
      oheader = oheader.append(
        'Authorization',
        'Bearer ' + this.helper.getToken()
      );
    }
    return { headers: oheader };
  }

  public setToken(data: any) {
    this.helper.setToken(data);
  }

  public failToken(error: Response | any) {
    this.helper.failToken();
    return this.handleError(Response);
  }
}
