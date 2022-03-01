import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { AppConfig } from '../../Config/config';    
import { Helpers } from '../../Helpers/helpers';
import { AddictRelations } from '../Models/AddictRelations';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class AddictRelationsService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<AddictRelations[]> = new BehaviorSubject<AddictRelations[]>([]);
  dialogData: any;
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<AddictRelations[]> {
    return this.http.get<AddictRelations[]>(this.pathAPI + 'AddictRelations', super.header());//.pipe(catchError(super.handleError));
  }

  getByAddictID (addictID: string): Observable<AddictRelations[]> {
    return this.http.get<AddictRelations[]>(this.pathAPI + 'AddictRelations/GetByAddictID?adID=' + addictID, super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<AddictRelations> {
    return this.http.get<AddictRelations>(this.pathAPI + `AddictRelations/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  get data(): AddictRelations[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllData(): void {    
    this.http.get<AddictRelations[]>(this.pathAPI + 'AddictRelations', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  getPaging2 (sortname: string, dicrection: string, searchString: string, pageNum: number, pageSize: number) {
    const requestUrl = `${this.pathAPI}AddictRelations/GetPaging?sortName=${sortname}&sortDirection=${dicrection}&searchString=${searchString}&pageNumber=${pageNum}&pageSize=${pageSize}`;
    
    //console.log(requestUrl);
    return this.http.get<any>(requestUrl, super.header());
    //return this.http.get<any>(requestUrl, super.header()).pipe(map(data=> {return data}));//.pipe(catchError(super.handleError));
  }

  getPaging22 () {
    const requestUrl = `${this.pathAPI}AddictRelations/GetPaging2`;
    
    console.log(requestUrl);
    return this.http.get<any>(requestUrl, super.header());
  }

  // DEMO ONLY, you can find working methods below
  addObject(issue: AddictRelations): void {
    this.dialogData = issue;
  }

  updateObject(issue: AddictRelations): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }

  async remove(obj: AddictRelations): Promise<boolean> {
    //const httpParams = new HttpParams({ fromObject: { key: change.key } });
    //const httpOptions = { withCredentials: true, body: obj };
    const data = await this.http
      .delete<boolean>(`${this.pathAPI}AddictRelations/${obj.oid}`, super.header())
      .toPromise();
    //this.updateAddicts(obj, data);
    return data;
  }

  SaveAddDrugs(): Observable<any> {
    return this.http.put<AddictRelations>(this.pathAPI + 'AddictRelations', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditDrugs(): Observable<any> {
    return this.http.post<AddictRelations>(this.pathAPI + 'AddictRelations', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

}