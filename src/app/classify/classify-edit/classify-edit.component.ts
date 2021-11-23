import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {ClassifyService} from '../../Shared/Services/classify.service';
import {FormControl, Validators} from '@angular/forms';
import {Classify} from '../../Shared/Models/Classify'

@Component({
  selector: 'app-classify-edit',
  templateUrl: './classify-edit.component.html',
  styleUrls: ['./classify-edit.component.css']
})
export class ClassifyEditComponent {

  constructor(public dialogRef: MatDialogRef<ClassifyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Classify,
    public dataService: ClassifyService) { }

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
