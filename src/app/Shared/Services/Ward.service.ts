import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
//import { User } from '../models/user';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { Ward } from '../Models/Ward';
@Injectable()
export class UsesService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<Ward[]> {
    return this.http.get<Ward[]>(this.pathAPI + 'Ward', super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<Ward> {
    return this.http.get<Ward>(this.pathAPI + `/Ward/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  

}