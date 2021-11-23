import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AddictClassifyService } from '../../Shared/Services/addictclassify.service';
import { FormControl, Validators } from '@angular/forms';
import { AddictClassify } from '../../Shared/Models/AddictClassify'
import { ClassifyService } from 'src/app/Shared/Services/classify.service';
import { addictService } from 'src/app/Shared/Services/addict.service';
import {PlacetypeData} from '../../Shared/Services/DATA';
import { ManagePlaceService } from 'src/app/Shared/Services/manageplace.service';
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
  selector: 'app-addict-classify-edit',
  templateUrl: './addictclassify-edit.component.html',
  styleUrls: ['./addictclassify-edit.component.css'],
  providers : [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddictClassifyEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddictClassifyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddictClassify,
    public dataService: AddictClassifyService,
    private classifyService: ClassifyService,
    private addictservice: addictService,
    private placeService: ManagePlaceService, ) { }

    classifyData : any;
    addictData : any;
    addictSearch : any ;
    managePlaceData: any;
    public placetypes = PlacetypeData;
    placeFilter: any;
formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :'';
}

ngOnInit() {
  this.loadClassifys();
  this.loadAddicts();
  this.loadPlaces();
}

public loadPlaces() {   
  this.placeService.getAll().subscribe(
    {
      next:(data)=> {
        this.managePlaceData = data
        this.placeFilter = this.managePlaceData.filter((r: any)=>r.placeTypeID === this.data.placeTypeID);
      },
      error: (err)=> console.log(err)
    });
    
}

public loadClassifys() {    
  this.classifyService.getAll().subscribe(data=> {
    //console.log(data);
     this.classifyData = data      
    }, err => console.log(err));    
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
  this.placeFilter = this.managePlaceData.filter((r: any)=>r.placeTypeID === ptypeid);
}

}
