import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {ManagePlaceService} from '../../Shared/Services/manageplace.service';
import {FormControl, Validators} from '@angular/forms';
import {ManagePlace} from '../../Shared/Models/ManagePlace'
import {PlacetypeData} from '../../Shared/Services/DATA';
@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent {

  constructor(public dialogRef: MatDialogRef<PlaceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManagePlace,
    public dataService: ManagePlaceService) { }

    public placetypes = PlacetypeData;

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
this.dataService.addObject(this.data);
}

stopEdit(): void {
  this.dataService.updateObject(this.data);
}

selectChange($event: any) {
  console.log($event);
  
}

}
