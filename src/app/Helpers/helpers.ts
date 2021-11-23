import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class Helpers  {
    private authenticationChanged = new Subject<boolean>();
    constructor(private router: Router) {
    }
    public isAuthenticated(): boolean {
        
        return (!(window.localStorage['token'] === undefined || 
            window.localStorage['token'] === null ||
            window.localStorage['token'] === 'null' ||
            window.localStorage['token'] === 'undefined' ||
            window.localStorage['token'] === ''));
            
    }
    public isAuthenticationChanged(): any  {
        return this.authenticationChanged.asObservable();
    }
    public getToken():any {
        
        if( window.localStorage['token'] === undefined || 
            window.localStorage['token'] === null ||
            window.localStorage['token'] === 'null' ||
            window.localStorage['token'] === 'undefined' ||
            window.localStorage['token'] === '') {
            return '';
        }
        // let obj = JSON.parse(window.localStorage['token']);
        // return obj.token;
        
        return window.localStorage['token'];
    }

    public getUserFullName(): string {
                       
        return window.localStorage['fullname'];
    }
    public setToken(data:any):void {
        // console.log(data);
        // console.log(JSON.stringify(data));
        // this.setStorageToken(JSON.stringify(data));
        this.setStorageToken(data);
    }
    public failToken():void {
        this.setStorageToken(undefined);
    }
    public logout():void {
        this.setStorageToken(undefined);
        this.authenticationChanged.next(false);
        this.router.navigate(['/login']);
    }

    
    private setStorageToken(value: any):void {
        if (value==undefined)
        {
            window.localStorage['token'] = undefined;
            window.localStorage['userid'] = undefined;
            window.localStorage['fullname'] = undefined;
            window.localStorage['placeID'] = undefined;
            window.localStorage['isAdmin'] = undefined;
        }
        else {
            window.localStorage['token'] = value.token;
            window.localStorage['userid'] = value.userid;
            window.localStorage['fullname'] = value.fullName;
            window.localStorage['placeID'] = value.placeID;
            window.localStorage['isAdmin'] = value.isAdmin;
        }
        this.authenticationChanged.next(this.isAuthenticated());
    }
}