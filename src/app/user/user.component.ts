import {Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User} from '../Shared/Models/user';
import { UserService } from '../Shared/Services/user.service';
import { UserDataSource } from '../Shared/Datasources/user.Datasource';

import { fromEvent} from 'rxjs';
import {userEditComponent} from './user-edit/user-edit.component';
// var momentPipe = require ('../../Config/MomentPipe');

// import * as MomentPipe from "../Config/MomentPipe";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-userlevel',
  templateUrl:'./user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns = ['UserName', 'FullName','Admin','PlaceName', 'actions'];
  userDatabase!: UserService;
  dataSource!: UserDataSource;
  index: number=0;
  Oid: string='';
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator ;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;
  
  constructor(public dialogService: MatDialog, public userService: UserService) { }


  ngOnInit() {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.userDatabase = this.userService;//new EduLevelService(this.httpClient);
    this.dataSource = new UserDataSource(this.userDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  startEdit(i: number, odata: User) {
    //this.Oid = oid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    //console.log(this.index);
    const dialogRef = this.dialogService.open(userEditComponent, {
      data: odata
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.userService.SaveEditObject().subscribe(
          data=> {
            //console.log(data)
              // When using an edit things are little different, firstly we find record inside DataService by id
            const foundIndex = this.userDatabase!.dataChange.value.findIndex(x => x.oid === odata.oid);
            // Then you update that record using data from dialogData (values you enetered)
            this.userDatabase!.dataChange.value[foundIndex] = this.userService.getDialogData();
            // And lastly refresh table
            this.refreshTable();
          },
          (error: any) => {
            console.log(error);
          }
        );  
      }
    });
  }

  deleteItem(i: number, odata: User) {
    this.index = i;
    //this.id = id;
    console.log(odata);
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(userEditComponent, {
      data: {edulv: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.userService.SaveAddObject().subscribe(
          data=> {
            // After dialog is closed we're doing frontend updates
            // For add we're just pushing a new row inside DataService
            this.userDatabase!.dataChange.value.push(this.userService.getDialogData());
            this.refreshTable();
          },
          (error: any) => {
            console.log(error);
          }
        );  
      }
    });
  }

}