import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from '../Services/base.service';
import { AppConfig } from '../../Config/config';    
import { Helpers } from '../../Helpers/helpers';
import { AddictDrugs } from '../Models/AddictDrugs';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class AddictDrugsService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<AddictDrugs[]> = new BehaviorSubject<AddictDrugs[]>([]);
  dialogData: any;
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<AddictDrugs[]> {
    return this.http.get<AddictDrugs[]>(this.pathAPI + 'AddictDrugs', super.header());//.pipe(catchError(super.handleError));
  }

  getByAddictID (addictID: string): Observable<AddictDrugs[]> {
    return this.http.get<AddictDrugs[]>(this.pathAPI + 'AddictDrugs/GetByAddictID?adID=' + addictID, super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<AddictDrugs> {
    return this.http.get<AddictDrugs>(this.pathAPI + `AddictDrugs/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  get data(): AddictDrugs[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllData(): void {    
    this.http.get<AddictDrugs[]>(this.pathAPI + 'AddictDrugs', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  getPaging2 (sortname: string, dicrection: string, searchString: string, pageNum: number, pageSize: number) {
    const requestUrl = `${this.pathAPI}AddictDrugs/GetPaging?sortName=${sortname}&sortDirection=${dicrection}&searchString=${searchString}&pageNumber=${pageNum}&pageSize=${pageSize}`;
    
    //console.log(requestUrl);
    return this.http.get<any>(requestUrl, super.header());
    //return this.http.get<any>(requestUrl, super.header()).pipe(map(data=> {return data}));//.pipe(catchError(super.handleError));
  }

  async remove(obj: AddictDrugs): Promise<boolean> {
    //const httpParams = new HttpParams({ fromObject: { key: change.key } });
    //const httpOptions = { withCredentials: true, body: obj };
    const data = await this.http
      .delete<boolean>(`${this.pathAPI}AddictDrugs/${obj.oid}`, super.header())
      .toPromise();
    //this.updateAddicts(obj, data);
    return data;
  }

  // DEMO ONLY, you can find working methods below
  addObject(issue: AddictDrugs): void {
    this.dialogData = issue;
  }

  updateObject(issue: AddictDrugs): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }

  public deleteRecord(value: string):  Observable<any> {    
    return this.http.delete(this.pathAPI + 'AddictDrugs/' + value, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveAddDrugs(): Observable<any> {
    return this.http.put<AddictDrugs>(this.pathAPI + 'AddictDrugs', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditDrugs(): Observable<any> {
    return this.http.post<AddictDrugs>(this.pathAPI + 'AddictDrugs', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

}