import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DrugsService} from '../../Shared/Services/drugs.service';
import {FormControl, Validators} from '@angular/forms';
import {Drugs} from '../../Shared/Models/Drugs'

@Component({
  selector: 'app-drugs-edit',
  templateUrl: './drugs-edit.component.html',
  styleUrls: ['./drugs-edit.component.css']
})
export class DrugsEditComponent {

  constructor(public dialogRef: MatDialogRef<DrugsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Drugs,
    public dataService: DrugsService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :'';
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
  
  this.dataService.addDrugs(this.data);
}

stopEdit(): void {
  //console.log("vao day roi")
  this.dataService.updateDrugs(this.data);
}

}
