import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
//import { catchError, map, tap } from 'rxjs/operators';
import { AppConfig } from './../../Config/config';
import { baseService } from '../Services/base.service';
//import { Token } from './../models/token';
import { Helpers } from '../../Helpers/helpers';
@Injectable()
export class TokenService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];
  public errorMessage: string | undefined;
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  auth(data: any): any {
    let body = JSON.stringify(data);
    //console.log(body);
    return this.getToken(body);    
  }
  private getToken (body: any): Observable<any> {
    return this.http.post<any>(this.pathAPI + 'token', body, super.header());
    // .pipe(
    //     catchError(super.handleError)
    //   );
  }
}