import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from '../Services/base.service';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { AddictManagePlace } from '../Models/AddictManagePlace';
import {BehaviorSubject, } from 'rxjs';
@Injectable()
export class AddictPlaceService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<AddictManagePlace[]> = new BehaviorSubject<AddictManagePlace[]>([]);
  dialogData: any;
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<AddictManagePlace[]> {
    return this.http.get<AddictManagePlace[]>(this.pathAPI + 'AddictManagePlace', super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<AddictManagePlace> {
    return this.http.get<AddictManagePlace>(this.pathAPI + `AddictManagePlace/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  getByAddictID (addictID: string): Observable<AddictManagePlace[]> {
    return this.http.get<AddictManagePlace[]>(this.pathAPI + 'AddictManagePlace/GetByAddictID?adID=' + addictID, super.header());//.pipe(catchError(super.handleError));
  }

  getPaging (sortname: string, dicrection: string, searchString: string, pageNum: number, pageSize: number) {
    const requestUrl = `${this.pathAPI}AddictManagePlace/GetPaging?sortName=${sortname}&sortDirection=${dicrection}&searchString=${  searchString}&pageNumber=${pageNum}&pageSize=${pageSize}`;
    const header1= {'Content-Type':'application/json', 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjUyMjM5MjgsImlzcyI6IkNBQkRBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkNBQkRBdXRoZW50aWNhdGlvblNlcnZlciJ9.0wj0rBgMFW33xBlwg-9CM5j6BEzbJLiDIYsTo-c8a_0'};
    
    //console.log(requestUrl);
    return this.http.get<any>(requestUrl, {
      headers: header1,
      observe: 'response'
  }).pipe(map(data=> {return data}));//.pipe(catchError(super.handleError));
  }

  getPaging2 (sortname: string, dicrection: string, searchString: string, pageNum: number, pageSize: number) {
    const requestUrl = `${this.pathAPI}AddictManagePlace/GetPaging?sortName=${sortname}&sortDirection=${dicrection}&searchString=${searchString}&pageNumber=${pageNum}&pageSize=${pageSize}`;
    
    //console.log(requestUrl);
    return this.http.get<any>(requestUrl, super.header());
    //return this.http.get<any>(requestUrl, super.header()).pipe(map(data=> {return data}));//.pipe(catchError(super.handleError));
  }
  
  get data(): AddictManagePlace[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllPlaces(): void {    
    this.http.get<AddictManagePlace[]>(this.pathAPI + 'AddictManagePlace', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addObject(issue: AddictManagePlace): void {
    this.dialogData = issue;
  }

  updateObject(issue: AddictManagePlace): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }

  public deleteRecord(value: string):  Observable<any> {    
    return this.http.delete(this.pathAPI + 'AddictManagePlace/' + value, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveAddPlace(): Observable<any> {
    return this.http.put<AddictManagePlace>(this.pathAPI + 'AddictManagePlace', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditPlace(): Observable<any> {
    console.log(this.dialogData);
    return this.http.post<AddictManagePlace>(this.pathAPI + 'AddictManagePlace', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }
}