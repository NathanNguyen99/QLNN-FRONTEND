import {Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {EducationLevel} from '../Shared/Models/EducationLevel';
import { EduLevelService } from '../Shared/Services/eduLevel.service';
import { EduDataSource } from '../Shared/Datasources/EduLevel.Datasource';

import { fromEvent} from 'rxjs';
import {EduEditComponent} from './edu-edit/edu-edit.component';
// var momentPipe = require ('../../Config/MomentPipe');

// import * as MomentPipe from "../Config/MomentPipe";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edulevel',
  templateUrl:'./EduLevel.component.html',
  styleUrls: ['./EduLevel.component.css']
})
export class EdulevelComponent implements OnInit {
  displayedColumns = ['Seq', 'EducationName', 'actions'];
  EduDatabase!: EduLevelService;
  dataSource!: EduDataSource;
  index: number=0;
  Oid: string='';
  
  constructor(public dialogService: MatDialog, public EduService: EduLevelService) { }
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.EduDatabase = this.EduService;//new EduLevelService(this.httpClient);
    this.dataSource = new EduDataSource(this.EduDatabase, this.paginator, this.sort);
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

  startEdit(i: number, odata: EducationLevel) {
    //this.Oid = oid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialogService.open(EduEditComponent, {
      data: odata
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.EduService.SaveEditObject().subscribe(
          data=> {
            //console.log(data)
              // When using an edit things are little different, firstly we find record inside DataService by id
            const foundIndex = this.EduDatabase.dataChange.value.findIndex(x => x.oid === odata.oid);
            // Then you update that record using data from dialogData (values you enetered)
            this.EduDatabase.dataChange.value[foundIndex] = this.EduService.getDialogData();
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

  deleteItem(i: number, odata: EducationLevel) {
    this.index = i;
    //this.id = id;
    console.log(odata);
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(EduEditComponent, {
      data: {edulv: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.EduService.SaveAddObject().subscribe(
          data=> {
            // After dialog is closed we're doing frontend updates
            // For add we're just pushing a new row inside DataService
            this.EduDatabase.dataChange.value.push(this.EduService.getDialogData());
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