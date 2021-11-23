import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
//import { User } from '../Models/user';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { EducationLevel } from '../Models/EducationLevel';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class EduLevelService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<EducationLevel[]> = new BehaviorSubject<EducationLevel[]>([]);
  dialogData: any;
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<EducationLevel[]> {
    return this.http.get<EducationLevel[]>(this.pathAPI + 'EducationLevel', super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<EducationLevel> {
    return this.http.get<EducationLevel>(this.pathAPI + `EducationLevel/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  get data(): EducationLevel[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllEducationLevels(): void {    
    this.http.get<EducationLevel[]>(this.pathAPI + 'EducationLevel', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: EducationLevel): void {
    this.dialogData = issue;
  }

  updateIssue(issue: EducationLevel): void {
    this.dialogData = issue;
  }

  deleteIssue(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }
  SaveAddObject(): Observable<any> {
    return this.http.put<EducationLevel>(this.pathAPI + 'EducationLevel', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditObject(): Observable<any> {    
    //console.log(JSON.stringify(this.dialogData));
    return this.http.post<EducationLevel>(this.pathAPI + 'EducationLevel', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }
}