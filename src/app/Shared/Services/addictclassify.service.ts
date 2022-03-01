import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { AddictClassify } from '../Models/AddictClassify';
import { BehaviorSubject} from 'rxjs';
@Injectable()
export class AddictClassifyService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<AddictClassify[]> = new BehaviorSubject<AddictClassify[]>([]);
  dialogData: any;
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<AddictClassify[]> {
    return this.http.get<AddictClassify[]>(this.pathAPI + 'AddictClassify', super.header());//.pipe(catchError(super.handleError));
  }

  getByAddictID (addictID: string): Observable<AddictClassify[]> {
    return this.http.get<AddictClassify[]>(this.pathAPI + 'AddictClassify/GetByAddictID?adID=' + addictID, super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<AddictClassify> {
    return this.http.get<AddictClassify>(this.pathAPI + `AddictClassify/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  get data(): AddictClassify[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllData(): void {    
    this.http.get<AddictClassify[]>(this.pathAPI + 'AddictClassify', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  getPaging2 (sortname: string, dicrection: string, searchString: string, pageNum: number, pageSize: number) {
    const requestUrl = `${this.pathAPI}AddictClassify/GetPaging?sortName=${sortname}&sortDirection=${dicrection}&searchString=${searchString}&pageNumber=${pageNum}&pageSize=${pageSize}`;
    
    //console.log(requestUrl);
    return this.http.get<any>(requestUrl, super.header());
    //return this.http.get<any>(requestUrl, super.header()).pipe(map(data=> {return data}));//.pipe(catchError(super.handleError));
  }

  // DEMO ONLY, you can find working methods below
  addObject(issue: AddictClassify): void {
    this.dialogData = issue;
  }

  updateObject(issue: AddictClassify): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }

  public deleteRecord(value: string):  Observable<any> {    
    return this.http.delete(this.pathAPI + 'AddictClassify/' + value, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  async remove(obj: AddictClassify): Promise<boolean> {
    //const httpParams = new HttpParams({ fromObject: { key: change.key } });
    //const httpOptions = { withCredentials: true, body: obj };
    const data = await this.http
      .delete<boolean>(`${this.pathAPI}AddictClassify/${obj.oid}`, super.header())
      .toPromise();
    //this.updateAddicts(obj, data);
    return data;
  }

  SaveAddDrugs(): Observable<any> {
    return this.http.put<AddictClassify>(this.pathAPI + 'AddictClassify', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditDrugs(): Observable<any> {
    return this.http.post<AddictClassify>(this.pathAPI + 'AddictClassify', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

}