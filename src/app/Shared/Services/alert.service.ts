import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';


import { AlertComponent } from '../../alert/alert.component';
import { filter } from 'rxjs/operators';

export class Alert {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private dialogRef!: MatDialogRef<AlertComponent>;
    private keepAfterRouteChange = false;
    private defaultId = 'default-alert';

    constructor(private dialog: MatDialog) {
        
    }

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    // main alert method    
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
    }

    // clear() {
    //     // clear by calling subject.next() without parameters
    //     this.subject.next();
    // }

    public message(message: string): Observable<any> {

        this.dialogRef = this.dialog.open(AlertComponent);        
        this.dialogRef.componentInstance.message = message;
        //console.log(this.dialogRef.afterClosed());
        return  this.dialogRef.afterClosed();
    
    }

    
}