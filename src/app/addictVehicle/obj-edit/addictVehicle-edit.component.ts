import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AddictVehicleService } from '../../Shared/Services/addictVehicle.service';
import { FormControl, Validators } from '@angular/forms';
import { AddictVehicle } from '../../Shared/Models/AddictVehicle';
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
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-addict-vehicle-edit',
  templateUrl: './addictVehicle-edit.component.html',
  styleUrls: ['./addictVehicle-edit.component.css'],
  providers : [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddictVehicleEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddictVehicleEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddictVehicle,
    public dataService: AddictVehicleService,
    private addictservice: addictService ) { }

    VehicleData : any;
    addictData : any;
    addictSearch : any ;
    provinceData: any;
    placeFilter: any;
formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :'';
}

ngOnInit() {
  //this.loadVehicles();
  this.loadAddicts();
  this.loadProvince();
}

public loadProvince() {   
  this.addictservice.getPlaceOfBirth().subscribe(
    {
      next:(data: any)=> {
        this.provinceData = data
        //this.placeFilter = this.provinceData.filter((r: any)=>r.oid === this.data.placeTypeID);
      },
      error: (err: any)=> console.log(err)
    });
    
}


public loadAddicts() {    
  this.addictservice.getBaseFieldAddicts().subscribe((data: any)=> {
     this.addictData = data     
     this.addictSearch = this.addictData.slice();
    }, (err: any) => console.log(err));    
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

selectPlaceTypeChange(ptypeid: any) {
  //console.log($event.target);
  //this.placeFilter = this.managePlaceData.filter((r: any)=>r.placeTypeID === ptypeid);
}

}
