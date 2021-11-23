import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../Shared/Services/user.service';
import {ManagePlaceService} from '../../Shared/Services/manageplace.service';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../Shared/Models/user'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class userEditComponent implements OnInit{

  placeData: any;

  constructor(public dialogRef: MatDialogRef<userEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dataService: UserService,
    private placeService: ManagePlaceService) { }
    
ngOnInit() {
  this.loadPlaceData();
}

public loadPlaceData() {    
  this.placeService.getWards().subscribe(data=> {
    //console.log(data);
     this.placeData=data      
    }, err => console.log(err));
}

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
  //console.log(this.data);
  this.dataService.updateObject(this.data);
}

}
