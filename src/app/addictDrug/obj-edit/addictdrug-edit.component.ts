import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AddictRelations } from '../../Shared/Models/AddictRelations';
import { addictService } from 'src/app/Shared/Services/addict.service';
import { AddictRelationsService } from 'src/app/Shared/Services/addictrelations.service';
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
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
import { RelationsService } from 'src/app/Shared/Services/relations.service';
import { ManagePlaceService } from 'src/app/Shared/Services/manageplace.service';
@Component({
  selector: 'app-addict-drug-edit',
  templateUrl: './addictdrug-edit.component.html',
  styleUrls: ['./addictdrug-edit.component.css'],
  providers : [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddictDrugEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddictDrugEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddictRelations,
    public dataService: AddictRelationsService,
    public _mangePlace: ManagePlaceService,
    private relationsService: RelationsService,
    private addictservice: addictService
  ) {this.loadRelations();
    this.loadAddicts();
    this.loadManagePlaces();}

  drugData: any;
  relationsData: any;
  managePlacesData: any;


  relationWithData: any;
  relationWithSearch: any;

  addictData: any;
  addictSearch: any;
  placeSearch: any;


  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  ngOnInit() {
  }

  public loadRelations() {
    this.relationsService.getAll().subscribe(
      (data) => {
        //console.log(data);
        this.relationsData = data;
      },
      (err) => console.log(err)
    );
  }

  public loadAddicts() {
    this.addictservice.getBaseFieldAddicts().subscribe(
      (data: any) => {
        this.addictData = data;
        this.relationWithData = data

        this.addictSearch = this.addictData.slice();
      },
      (err: any) => console.log(err)
    );
  }

  public loadManagePlaces() {
    this._mangePlace.getAll().subscribe(
      (data: any) => {
        this.managePlacesData = data;
        this.placeSearch = this.managePlacesData.slice();

      },
      (err: any) => console.log(err)
    );
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
    //console.log($event);

  }
}
