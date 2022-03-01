import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';  
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import { ManagePlace } from '../Models/ManagePlace';
import { BehaviorSubject } from 'rxjs';
import { ManageCity } from '../Models/ManageCity';
@Injectable()
export class ManagePlaceService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];

  dataChange: BehaviorSubject<ManagePlace[]> = new BehaviorSubject<
    ManagePlace[]
  >([]);
  dialogData: any;
  constructor(
    private http: HttpClient,
    private config: AppConfig,
    helper: Helpers
  ) {
    super(helper);
  }
  /** GET heroes from the server */
  getAll(): Observable<ManagePlace[]> {
    return this.http.get<ManagePlace[]>(
      this.pathAPI + 'ManagePlace',
      super.header()
    ); //.pipe(catchError(super.handleError));
  }

  getAllManageCity(): Observable<ManageCity[]> {
    return this.http.get<ManageCity[]>(
      this.pathAPI + 'ManageCity',
      super.header()
    ); //.pipe(catchError(super.handleError));
  }

  getByID(Oid: string): Observable<ManagePlace> {
    return this.http.get<ManagePlace>(
      this.pathAPI + `ManagePlace/${Oid}`,
      super.header()
    ); //.pipe(catchError(super.handleError));
  }

  get data(): ManagePlace[] {
    return this.dataChange.value;
  }

  /** CRUD METHODS */
  getAllPlaces(): void {
    this.http
      .get<ManagePlace[]>(this.pathAPI + 'ManagePlace', super.header())
      .subscribe(
        (data) => {
          //console.log(data);
          data = data.filter((i:any) => i.placeName != "Admin")
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
  }

  UploadExcel(formData: FormData) {   
    //, httpOptions
    return this.http.post(this.pathAPI + 'ManagePlace/UploadExcel', formData, super.headerFormdata());
  }

  ExportExcel():Observable<any> {
    // this.http.get(this.pathAPI + 'ManagePlace/ExportExcel',
    // super.headerExport()) 
    return this.http.get(this.pathAPI + 'ManagePlace/ExportExcel2', super.headerExport());
  }
  manageCityID: any

  getWards(): Observable<ManagePlace[]> {
    this.manageCityID = localStorage.getItem('manageCityID');

    return this.http.get<ManagePlace[]>(
      this.pathAPI + 'ManagePlace/GetByType?citytyp=' + this.manageCityID + '&typeid=1',
      super.header()
    ); //.pipe(catchError(super.handleError));
  }

  // DEMO ONLY, you can find working methods below
  addObject(issue: ManagePlace): void {
    this.dialogData = issue;
  }

  updateObject(issue: ManagePlace): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }

  public deleteRecord(value: string): Observable<any> {
    return this.http
      .delete(this.pathAPI + 'manageplace/' + value, super.header())
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return of();
        })
      );
  }

  SaveAddObject(): Observable<any> {
    return this.http
      .put<ManagePlace>(
        this.pathAPI + 'manageplace',
        this.dialogData,
        super.header()
      )
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return of();
        })
      );
  }

  SaveEditObject(): Observable<any> {
    return this.http
      .post<ManagePlace>(
        this.pathAPI + 'manageplace',
        this.dialogData,
        super.header()
      )
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return of();
        })
      );
  }
}
