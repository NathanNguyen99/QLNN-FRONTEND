import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { Uses } from '../Models/Uses';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import {BehaviorSubject} from 'rxjs';
//import { User } from '../models/user';
@Injectable()
export class UsesService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  dataChange: BehaviorSubject<Uses[]> = new BehaviorSubject<Uses[]>([]);
  
  dialogData: any;

 

  getUses (): Observable<Uses[]> {
    return this.http.get<Uses[]>(this.pathAPI + 'uses', super.header());//.pipe(catchError(super.handleError));
  }

  findByID(userID: string): Observable<Uses> {
    return this.http.get<Uses>(this.pathAPI + `/Uses/${userID}`, super.header());//.pipe(catchError(super.handleError));
  }

  ChangePw(userID: string, pw: string): boolean {
    //return this.http.post(this.pathAPI + `/User/${userID}`, super.header()).pipe(catchError(super.handleError));
    return true;
  }

  SaveAddObject(): Observable<any> {
    return this.http.put<Uses>(this.pathAPI + 'Uses', this.dialogData, super.header())
    .pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditObject(): Observable<any> {
    //console.log(this.dialogData);
    return this.http.post<Uses>(this.pathAPI + 'Uses', this.dialogData, super.header())
    .pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  addObject(issue: Uses): void {
    this.dialogData = issue;
  }

  updateObject(issue: Uses): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }
}