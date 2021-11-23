import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({ selector: 'alert', templateUrl: './alert.component.html' })
export class AlertComponent  {
    //private subscription: Subscription;
    
    public message: string | undefined;
    constructor(public dialogRef: MatDialogRef<AlertComponent>) { }

    // ngOnInit() {
    //     this.subscription = this.alertService.getAlert()
    //         .subscribe(message => {
    //             switch (message && message.type) {
    //                 case 'success':
    //                     message.cssClass = 'alert alert-success';
    //                     break;
    //                 case 'error':
    //                     message.cssClass = 'alert alert-danger';
    //                     break;
    //             }

    //             this.message = message;
    //         });
    // }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }
}