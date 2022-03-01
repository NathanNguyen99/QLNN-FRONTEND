import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
//import { User } from '../models/user';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { Addict } from '../Models/Addict';
import { BehaviorSubject } from 'rxjs';
import { AddictDrugsService } from './addictdrug.service';

@Injectable()
export class addictService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];
  constructor(
    private http: HttpClient,
    private config: AppConfig,
    helper: Helpers
  ) {
    super(helper);
  }
  //dataChange: BehaviorSubject<Addict[]> = new BehaviorSubject<Addict[]>([]);
  private addict$ = new BehaviorSubject<Addict[]>([]);
  /** GET heroes from the server */
  getAll(): Observable<Addict[]> {
    return this.http.get<Addict[]>(this.pathAPI + 'Addict', super.header()); //.pipe(catchError(super.handleError));
  }

  getByPlace(PlaceID: string): Observable<Addict[]> {
    return this.http.get<Addict[]>(
      this.pathAPI + 'Addict/GetByPlaceID?placeID=' + PlaceID,
      super.header()
    ); ////pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<Addict> {
    return this.http.get<Addict>(
      this.pathAPI + `/Addict/${Oid}`,
      super.header()
    ); //.pipe(catchError(super.handleError));
  }

  UploadExcel(formData: FormData) {   
    //, httpOptions
    return this.http.post(this.pathAPI + 'Addict/UploadExcel', formData, super.headerFormdata());
  } 

  // get data(): Addict[] {
  //   return this.dataChange.value;
  // }

  getAllData(): void {
    this.http.get<Addict[]>(this.pathAPI + 'Addict', super.header()).subscribe(
      (data) => {
        //console.log(data);
        this.addict$.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  ExportExcel():Observable<any> {
    // this.http.get(this.pathAPI + 'ManagePlace/ExportExcel',
    // super.headerExport()) 
    return this.http.get(this.pathAPI + 'Addict/ExportExcel', super.headerExport());
  }

  getPlaceOfBirth(): any {
    return this.http.get(this.pathAPI + 'Province', super.header()); //.pipe(catchError(super.handleError));
  }

  getWard(): any {
    return this.http.get(
      this.pathAPI + 'ManagePlace/GetByType?typeid=1',
      super.header()
    ); //.pipe(catchError(super.handleError));
  }

  SaveAddObject(data: any): Observable<any> {
    return this.http
      .put<Addict>(this.pathAPI + 'AddictDrugs', data, super.header())
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return of();
        })
      );
  }

  SaveEditObject(data: any): Observable<any> {
    return this.http
      .post<Addict>(this.pathAPI + 'AddictDrugs', data, super.header())
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return of();
        })
      );
  }

  //   updateAddicts(change: Change<Addict>, data: Addict) {
  //     change.data = data;
  //     const orders = applyChanges(this.addict$.getValue(), [change], { keyExpr: "oid" });
  //     console.log(orders);
  //     this.addict$.next(orders);
  // }

  getAddicts(): Observable<Addict[]> {
    this.http
      .get(`${this.pathAPI}Addict`, super.header())
      .toPromise()
      .then((data: any) => {
        this.addict$.next(data);
      });

    return this.addict$.asObservable();
  }

  getBaseFieldAddicts(): any {
    return this.http.get(this.pathAPI + 'Addict/Getbasefields', super.header()); //.pipe(catchError(super.handleError));
  }

  async insert(obj: Addict): Promise<boolean> {
    // const httpParams = new HttpParams({ fromObject: { values: JSON.stringify(obj) } });
    // const httpOptions = { withCredentials: true, body: httpParams };
    const data = await this.http
      .post<boolean>(`${this.pathAPI}addict`, obj, super.header())
      .toPromise();

    //this.updateAddicts(change, data);
    return data;
  }

  async update(obj: Addict): Promise<boolean> {
    const data = await this.http
      .put<boolean>(`${this.pathAPI}addict`, obj, super.header())
      .toPromise();
    //this.updateAddicts(change, data);
    return data;
  }

  async update2(obj: Addict): Promise<boolean> {
    return await this.http
      .put<boolean>(`${this.pathAPI}addict`, obj, super.header())
      .toPromise(); //.pipe(catchError(super.handleError)).toPromise();
  }

  async remove(obj: Addict): Promise<boolean> {
    //const httpParams = new HttpParams({ fromObject: { key: change.key } });
    //const httpOptions = { withCredentials: true, body: obj };
    const data = await this.http
      .delete<boolean>(`${this.pathAPI}addict/${obj.oid}`, super.header())
      .toPromise();
    //this.updateAddicts(obj, data);
    return data;
  }

  //   async saveChange(change: Change<Addict>): Promise<Addict> {
  //     //console.log(change.type);
  //     switch (change.type) {
  //         case "insert":
  //             return this.insert(change.data);
  //         case "update":
  //             return this.update(change);
  //         case "remove":
  //             return this.remove(change);
  //     }
  // }

  async saveChange(obj: Addict, type: string): Promise<boolean> {
    //var returnValue : Promise<boolean>;
    switch (type) {
      case 'insert':
        return this.insert(obj);
      case 'update':
        return this.update2(obj);
      case 'remove':
        return this.remove(obj);
    }
    return false;
  }

  async saveObjChange(obj: Addict, type: string): Promise<Addict> {
    if (type === 'insert') return this.insert3(obj);

    if (type === 'update') return this.update3(obj);
    else return this.remove3(obj);
  }

  async insert3(obj: Addict): Promise<Addict> {
    // const httpParams = new HttpParams({ fromObject: { values: JSON.stringify(obj) } });
    // const httpOptions = { withCredentials: true, body: httpParams };
    const data = await this.http
      .post<boolean>(`${this.pathAPI}addict`, obj, super.header())
      .toPromise();

    return obj;
  }

  async update3(obj: Addict): Promise<Addict> {
    const data = await this.http.put<boolean>(
      `${this.pathAPI}addict`,
      obj,
      super.header()
    ); //.pipe(catchError(super.handleError)).toPromise();
    return obj;
  }

  async remove3(obj: Addict): Promise<Addict> {
    const data = await this.http
      .delete<boolean>(`${this.pathAPI}addict/${obj.oid}`, super.header())
      .toPromise();
    //this.updateAddicts(obj, data);

    return obj;
  }

  UploadImage(formdata: any): Observable<Addict[]> {
    const data = this.http.post(
      `${this.pathAPI}addict/CheckFace`,
      formdata,
      super.header3()
    );

    return data as Observable<Addict[]>;
  }
}
