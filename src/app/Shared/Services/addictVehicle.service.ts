import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { AddictVehicle } from '../Models/AddictVehicle';
import { BehaviorSubject} from 'rxjs';
@Injectable()
export class AddictVehicleService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<AddictVehicle[]> = new BehaviorSubject<AddictVehicle[]>([]);
  dialogData: any;
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  getAll (): Observable<AddictVehicle[]> {
    return this.http.get<AddictVehicle[]>(this.pathAPI + 'AddictVehicle', super.header());//.pipe(catchError(super.handleError));
  }

  getByAddictID (addictID: string): Observable<AddictVehicle[]> {
    return this.http.get<AddictVehicle[]>(this.pathAPI + 'AddictVehicle/GetByAddictID?adID=' + addictID, super.header());//.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<AddictVehicle> {
    return this.http.get<AddictVehicle>(this.pathAPI + `AddictVehicle/${Oid}`, super.header());//.pipe(catchError(super.handleError));
  }

  get data(): AddictVehicle[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */
   getAllData(): void {    
    this.http.get<AddictVehicle[]>(this.pathAPI + 'AddictVehicle', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  getPaging2 (sortname: string, dicrection: string, searchString: string, pageNum: number, pageSize: number) {
    const requestUrl = `${this.pathAPI}AddictVehicle/GetPaging?sortName=${sortname}&sortDirection=${dicrection}&searchString=${searchString}&pageNumber=${pageNum}&pageSize=${pageSize}`;
    
    //console.log(requestUrl);
    return this.http.get<any>(requestUrl, super.header());
    //return this.http.get<any>(requestUrl, super.header()).pipe(map(data=> {return data}));//.pipe(catchError(super.handleError));
  }

  // DEMO ONLY, you can find working methods below
  addObject(issue: AddictVehicle): void {
    this.dialogData = issue;
  }

  updateObject(issue: AddictVehicle): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }

  public deleteRecord(value: string):  Observable<any> {    
    return this.http.delete(this.pathAPI + 'AddictVehicle/' + value, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  async remove(obj: AddictVehicle): Promise<boolean> {
    //const httpParams = new HttpParams({ fromObject: { key: change.key } });
    //const httpOptions = { withCredentials: true, body: obj };
    const data = await this.http
      .delete<boolean>(`${this.pathAPI}AddictVehicle/${obj.oid}`, super.header())
      .toPromise();
    //this.updateAddicts(obj, data);
    return data;
  }

  SaveAddDrugs(): Observable<any> {
    return this.http.put<AddictVehicle>(this.pathAPI + 'AddictVehicle', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditDrugs(): Observable<any> {
    return this.http.post<AddictVehicle>(this.pathAPI + 'AddictVehicle', this.dialogData, super.header()).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

}