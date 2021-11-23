
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { ConfirmComponent } from '../../alert/confirm.component';

@Injectable()
export class ConfirmService {

  private dialogRef: MatDialogRef<ConfirmComponent> | undefined;

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<any> {

    this.dialogRef = this.dialog.open(ConfirmComponent);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;
    //console.log(this.dialogRef.afterClosed());
    return  this.dialogRef.afterClosed();

  }
}