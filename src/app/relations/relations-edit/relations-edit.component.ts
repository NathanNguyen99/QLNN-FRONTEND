import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DrugsService } from '../../Shared/Services/drugs.service';
import { FormControl, Validators } from '@angular/forms';
import { Relations } from '../../Shared/Models/Relations';
import { RelationsService } from 'src/app/Shared/Services/relations.service';

@Component({
  selector: 'app-relations-edit',
  templateUrl: './relations-edit.component.html',
  styleUrls: ['./relations-edit.component.css'],
})
export class RelationsEditComponent {
  constructor(
    public dialogRef: MatDialogRef<RelationsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Relations,
    public dataService: RelationsService
  ) {}

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addRelations(this.data);
  }

  stopEdit(): void {
    //console.log("vao day roi")
    this.dataService.updateRelations(this.data);
  }
}
