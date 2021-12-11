import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AddictRelations } from '../../Shared/Models/AddictRelations';
import { addictService } from 'src/app/Shared/Services/addict.service';
import { AddictRelationsService } from 'src/app/Shared/Services/addictrelations.service';
import { RelationsService } from 'src/app/Shared/Services/relations.service';
@Component({
  selector: 'app-addict-drug-edit',
  templateUrl: './addictdrug-edit.component.html',
  styleUrls: ['./addictdrug-edit.component.css'],
})
export class AddictDrugEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddictDrugEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddictRelations,
    public dataService: AddictRelationsService,
    private relationsService: RelationsService,
    private addictservice: addictService
  ) {}

  drugData: any;
  relationsData: any;
  addictData: any;
  addictSearch: any;
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  ngOnInit() {
    this.loadRelations();
    this.loadAddicts();
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
        this.addictSearch = this.addictData.slice();
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
    console.log($event);

  }
}
