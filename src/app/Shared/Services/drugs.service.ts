import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { Drugs } from '../Models/Drugs';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class DrugsService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<Drugs[]> = new BehaviorSubject<Drugs[]>([]);
  dialogData: any;

  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<Drugs[]> {
    return this.http.get<Drugs[]>(this.pathAPI + 'drugs', super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<Drugs> {
    return this.http.get<Drugs>(this.pathAPI + `/drug/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  
  get data(): Drugs[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllDrugs(): void {    
    this.http.get<Drugs[]>(this.pathAPI + 'drugs', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addDrugs(issue: Drugs): void {
    this.dialogData = issue;
  }

  SaveAddObject(): Observable<any> {
    return this.http.put<Drugs>(this.pathAPI + 'drugs', this.dialogData, super.header()).pipe(
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
    return this.http.post<Drugs>(this.pathAPI + 'drugs', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  updateDrugs(issue: Drugs): void {
    this.dialogData = issue;
  }

  deleteDrugs(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }
  
  public deleteRecord(value: number):  Observable<any> {    
    return this.http.delete(this.pathAPI + 'drugs/' + value, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }
}