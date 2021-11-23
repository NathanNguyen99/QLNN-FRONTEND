import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AddictDrugsService } from '../../Shared/Services/addictdrug.service';
import { FormControl, Validators } from '@angular/forms';
import { AddictDrugs } from '../../Shared/Models/AddictDrugs'
import { UsesService } from 'src/app/Shared/Services/uses.service';
import { DrugsService } from 'src/app/Shared/Services/drugs.service';
import { addictService } from 'src/app/Shared/Services/addict.service';
@Component({
  selector: 'app-addict-drug-edit',
  templateUrl: './addictdrug-edit.component.html',
  styleUrls: ['./addictdrug-edit.component.css']
})
export class AddictDrugEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddictDrugEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddictDrugs,
    public dataService: AddictDrugsService,
    private usesService: UsesService, 
    private drugService: DrugsService,
    private addictservice: addictService ) { }

    drugData : any;
    useData : any;
    addictData : any;
    addictSearch : any ;
formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :'';
}

ngOnInit() {
  this.loadDrugs();
  this.loadUses();
  this.loadAddicts();
}

public loadUses() {    
  this.usesService.getUses().subscribe(data=> {
    //console.log(data);
     this.useData=data      
    }, err => console.log(err));    
}

public loadDrugs() {    
  this.drugService.getAll().subscribe(data=> {
    //console.log(data);
     this.drugData=data      
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

}
