import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AddictPlaceService } from '../../Shared/Services/addictplace.service';
import { FormControl, Validators } from '@angular/forms';
import { AddictManagePlace } from '../../Shared/Models/AddictManagePlace';
import { PlacetypeData } from '../../Shared/Services/DATA';
import { ManagePlaceService } from 'src/app/Shared/Services/manageplace.service';
import { addictService } from 'src/app/Shared/Services/addict.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-addictplace-edit',
  templateUrl: './addictplace-edit.component.html',
  styleUrls: ['./addictplace-edit.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class AddictPlaceEditComponent {
  constructor(
    public dialogRef: MatDialogRef<AddictPlaceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddictManagePlace,
    public dataService: AddictPlaceService,
    private placeService: ManagePlaceService,
    private addictservice: addictService
  ) {
    this.loadAddicts();
    this.loadAddictPlaces();
  }
  managePlaceData: any;
  addictData: any;
  addictSearch: any;
  public placetypes = PlacetypeData;
  placeFilter: any;

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
    this.dataService.addObject(this.data);
    this.loadAddictPlaces();

  }

  stopEdit(): void {
    this.dataService.updateObject(this.data);
  }

  selectPlaceTypeChange(ptypeid: any) {
    //console.log($event.target);
    this.placeFilter = this.managePlaceData.filter(
      (r: any) => r.placeTypeID === ptypeid
    );
  }

  public loadAddictPlaces() {
    this.placeService.getAll().subscribe(
      (data: any) => {
        this.managePlaceData = data;
        
        this.placeFilter = this.managePlaceData.filter(
          (r: any) => r.placeTypeID === this.data.placeTypeID
        );
        console.log(this.placeFilter)
        
      },
      (err: any) => console.log(err)
    );
  }

  public loadAddicts() {
    this.addictservice.getBaseFieldAddicts().subscribe(
      (data: any) => {
        this.addictData = data;
        this.addictSearch = this.addictData.slice();
      },
      (err: any) => console.log(err)
    );
  }
}
