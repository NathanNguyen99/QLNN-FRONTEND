import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../Shared/Services/user.service';
import { ManagePlaceService } from '../../Shared/Services/manageplace.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../Shared/Models/user';
import { MangeCityTypeData } from 'src/app/Shared/Services/DATA';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class userEditComponent implements OnInit {
  placeData: any;

  constructor(
    public dialogRef: MatDialogRef<userEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dataService: UserService,
    private placeService: ManagePlaceService
  ) {this.loadPlaceData();
    this.loadManageCities();}

  ngOnInit() {
    
    
  }

  manageCityData: any;
  placeFilter: any;
  wardFilter: any;
  selectPlaceTypeChange(placetypeID: any) {
    this.wardFilter = this.placeData.filter(
      (r: any) => r.manageCityID === placetypeID
    );  
  }

  selectManageCityTypeChange(ptypeid: any) {
    //console.log(ptypeid)
    this.placeFilter = this.manageCityData.filter(
      (r: any) => r.cityType === ptypeid
    );  
    
  }

  public loadManageCities() {
    this.placeService.getAllManageCity().subscribe(
      (data: any) => {
        this.manageCityData = data;
        //this.placeFilter = data
       
        this.placeFilter = this.manageCityData.filter(
          (r: any) => r.cityType === this.data.manageCityTypeID
        )
      },
      (err: any) => console.log(err)
    );  
  }

  public loadPlaceData() {
    this.placeService.getAll().subscribe(
      (data) => {
        this.placeData = data
        //console.log(this.placeData);
        this.wardFilter = this.placeData.filter(
          (r: any) => r.manageCityID === this.data.manageCityID
        )
        //console.log(this.data.manageCityID)
        //console.log(this.wardFilter)
      },
      (err) => console.log(err)
    );
  }
  public manageCityTypes = MangeCityTypeData;

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

  }

  stopEdit(): void {
    //console.log(this.data);
    this.dataService.updateObject(this.data);
  }
}
