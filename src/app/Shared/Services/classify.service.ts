import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { Classify } from '../Models/Classify';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class ClassifyService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<Classify[]> = new BehaviorSubject<Classify[]>([]);
  dialogData: any;

  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<Classify[]> {
    return this.http.get<Classify[]>(this.pathAPI + 'classify', super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<Classify> {
    return this.http.get<Classify>(this.pathAPI + `/Classify/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  
  get data(): Classify[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllClassifys(): void {    
    this.http.get<Classify[]>(this.pathAPI + 'Classify', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addDrugs(issue: Classify): void {
    this.dialogData = issue;
  }

  SaveAddObject(): Observable<any> {
    return this.http.put<Classify>(this.pathAPI + 'Classify', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditObject(): Observable<any> {
    return this.http.post<Classify>(this.pathAPI + 'Classify', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  updateDrugs(issue: Classify): void {
    this.dialogData = issue;
  }

  deleteDrugs(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }
  
  public deleteRecord(value: number):  Observable<any> {    
    return this.http.delete(this.pathAPI + 'Classify/' + value, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }
}