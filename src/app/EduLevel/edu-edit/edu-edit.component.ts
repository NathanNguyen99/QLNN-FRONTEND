import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {EduLevelService} from '../../Shared/Services/eduLevel.service';
import {FormControl, Validators} from '@angular/forms';
import {EducationLevel} from '../../Shared/Models/EducationLevel'

@Component({
  selector: 'app-edu-edit',
  templateUrl: './edu-edit.component.html',
  styleUrls: ['./edu-edit.component.css']
})
export class EduEditComponent {

  constructor(public dialogRef: MatDialogRef<EduEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EducationLevel,
    public dataService: EduLevelService) { }

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
this.dataService.addIssue(this.data);
}

stopEdit(): void {
  this.dataService.updateIssue(this.data);
}

}
