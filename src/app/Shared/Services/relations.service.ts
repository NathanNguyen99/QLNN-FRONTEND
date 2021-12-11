import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { Relations } from '../Models/Relations';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class RelationsService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<Relations[]> = new BehaviorSubject<Relations[]>([]);
  dialogData: any;

  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<Relations[]> {
    return this.http.get<Relations[]>(this.pathAPI + 'relations', super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<Relations> {
    return this.http.get<Relations>(this.pathAPI + `/relations/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  
  get data(): Relations[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllRelations(): void {    
    this.http.get<Relations[]>(this.pathAPI + 'relations', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addRelations(issue: Relations): void {
    this.dialogData = issue;
  }

  SaveAddObject(): Observable<any> {
    return this.http.put<Relations>(this.pathAPI + 'relations', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditObject(): Observable<any> {
    // console.log(this.dialogData);
    // console.log(this.pathAPI + 'drugs');
    //console.log(JSON.stringify(this.dialogData));
    return this.http.post<Relations>(this.pathAPI + 'drugs', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  updateRelations(issue: Relations): void {
    this.dialogData = issue;
  }

  deleteRelations(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }
  
  public deleteRecord(value: number):  Observable<any> {    
    return this.http.delete(this.pathAPI + 'relations/' + value, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }
}