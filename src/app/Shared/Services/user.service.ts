import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { baseService } from './base.service';
import { User } from '../Models/user';
import { AppConfig } from '../../Config/config';
import { Helpers } from '../../Helpers/helpers';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class UserService extends baseService {
  private pathAPI = this.config.setting['PathAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }
  /** GET heroes from the server */
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  dialogData: any;

  get data(): User[] {
    return this.dataChange.value;
  }
  
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.pathAPI + 'user', super.header());//.pipe(catchError(super.handleError));
  }

  findByID(userID: string): Observable<User> {
    return this.http.get<User>(this.pathAPI + `User/${userID}`, super.header());//.pipe(catchError(super.handleError));
  }

  ChangePw(opw: string, npw: string) {
    const objParam = { userid : window.localStorage['userid'],
                        oldPassword: opw,
                        newPassword: npw
                      }

    return this.http.post(this.pathAPI + 'User/changePassword', objParam, 
    super.header());//.pipe(catchError(super.handleError));    
  }

  getAllUsers(): void {    
    this.http.get<User[]>(this.pathAPI + 'User', super.header()).subscribe(data => {
       //console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        
      console.log (error.name + ' ' + error.message);
      });
  }

  SaveAddObject(): Observable<any> {
    return this.http.put<User>(this.pathAPI + 'User', this.dialogData, super.header())
    .pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  SaveEditObject(): Observable<any> {
    //console.log(this.dialogData);
    return this.http.post<User>(this.pathAPI + 'User', this.dialogData, super.header())
    .pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  addObject(issue: User): void {
    this.dialogData = issue;
  }

  updateObject(issue: User): void {
    this.dialogData = issue;
  }

  deleteObject(Oid: string): void {
    console.log(Oid);
  }
  getDialogData() {
    return this.dialogData;
  }
}