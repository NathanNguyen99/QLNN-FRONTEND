import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddictManagePlace} from '../Shared/Models/AddictManagePlace';
import { AddictPlaceService } from '../Shared/Services/addictplace.service';
import { AddictPlaceDataSource } from '../Shared/Datasources/addictPlace.Datasource';
import { fromEvent,  merge, BehaviorSubject, of as observableOf} from 'rxjs';
import {catchError, map, tap, startWith, switchMap, first, debounceTime} from 'rxjs/operators';
import { AddictPlaceEditComponent} from './obj-edit/addictplace-edit.component';
import { ConfirmService } from '../Shared/Services/confirm.service';
import { AlertService } from '../Shared/Services/alert.service';
import { PlacetypeData} from '../Shared/Services/DATA';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-addictplace',
  templateUrl: './addictplace.component.html',
  styleUrls: ['./addictplace.component.scss']
})
export class AddictPlaceComponent implements AfterViewInit, OnInit {

  displayedColumns = ['AddictCode','AddictName','PlaceName', 'PlaceTypeName', 'Remarks', 'actions'];
  //displayedColumns = ['AddictCode','AddictName','PlaceName', 'FromDate', 'ToDate', 'PlaceTypeName', 'Remarks', 'actions'];

  dataSource!: AddictManagePlace[];
  index: number=0;
  Oid: string='';
  totalCount: number = 0;
  constructor(public dialogService: MatDialog, 
    public _Service: AddictPlaceService, 
    private confirmSv: ConfirmService, 
    private alertSv:AlertService,
    private changeDetectorRefs: ChangeDetectorRef) { }
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;
  _filterChange = new BehaviorSubject('');
  public placetypes = PlacetypeData;
  isLoadingResults = true;
  //isRateLimitReached = false;
  //isLoading$ = new BehaviorSubject(true);
  ngOnInit() {
    //this._filterChange.next(this.filter.nativeElement.value);
  }

  
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    
    // If the user changes the sort order, or search then reset back to the first page.
    this._filterChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
    merge(this.sort.sortChange, this._filterChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          //console.log("change");          
          //console.log(this._filterChange.value)
          let sortName = "";
          if (this.sort.active)
            sortName=this.sort.active;
          return this._Service.getPaging2(sortName, this.sort.direction, this._filterChange.value, this.paginator.pageIndex+1, this.paginator.pageSize);
        }),
        map((data : any)=> {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          
          //this.refreshTable();
           //this.totalCount = JSON.parse(data.headers.get('X-Pagination')).totalCount;
           this.totalCount = data.totalCount;           
        //console.log(this.totalCount);
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;        
          return observableOf([]);
        })
      ).subscribe(data => {
        //this.refreshTable();
        //console.log(data);
        this.dataSource = data;
        this.changeDetectorRefs.detectChanges();
        
      });
      
  }

  ngAfterViewInit() {
    // this.paginator.page
    //     .pipe(
    //         tap(() => this.dataSource.loadLessons(...))
    //     ).subscribe();
    this.loadData();
    
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
        debounceTime(500))
      .subscribe(() => {        
        this._filterChange.next(this.filter.nativeElement.value);
      });

      
}
  startEdit(i: number, odata: AddictManagePlace) {

    this.index = i;
    //console.log(this.index);
    const dialogRef = this.dialogService.open(AddictPlaceEditComponent, {
      data: odata
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      
      if (result == 1) {
        
        this._Service.SaveEditPlace().subscribe(
          data=> {
            
              // When using an edit things are little different, firstly we find record inside DataService by id
            const foundIndex = this._Service!.dataChange.value.findIndex(x => x.oid === odata.oid);
            // Then you update that record using data from dialogData (values you enetered)
            this._Service!.dataChange.value[foundIndex] = this._Service.getDialogData();
            // And lastly refresh table
            this.refreshTable();
          },
          (error: any) => {
            console.log(error);
          }
        ); 
        this.refreshTable();
      } 
    });
  }

  deleteItem(i: number, odata: AddictManagePlace) {
    this.index = i;
    //const url = "123";

    this.confirmSv.confirm(odata.placeName, 'Bạn có chắc muốn xóa mã này không?')
    .subscribe((r:boolean)=> {if (r === true) {      
      return this._Service!.deleteRecord(odata.oid).subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
          this.deleteRowDataTable (i, 1, this.paginator, this.dataSource);
        },
        (err: any) => {
          console.log(err.error);
          console.log(err.message);
          this.alertSv.error('Delete did not happen.');
        }
      );
    } return undefined;});

  }


  private success() {
    //this.messagesService.openDialog('Success', 'Database updated as you wished!');
    this.alertSv.error("Xóa thành công",false);
  }
  private deleteRowDataTable (recordId: any, idColumn: any, paginator: any, dataSource: any) {
    // this.dsData = dataSource.data;
    // const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    // dataSource.data.splice(itemIndex, 1);
    // dataSource.paginator = paginator;
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddictPlaceEditComponent, {
      data: {edulv: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._Service.SaveAddPlace().subscribe(
          data=> {
            // After dialog is closed we're doing frontend updates
            // For add we're just pushing a new row inside DataService
            this._Service.dataChange.value.push(this._Service.getDialogData());
            this.refreshTable();
          },
          (error: any) => {
            console.log(error);
          }
        ); 
      }
    });
  }

  public searchPlaceType(o: any): any {

  //   const url = `${this.membersUrl}/?country=${country}`;

  //   this.httpService.searchCountries(url)
  //     .subscribe(data => {
  //       this.dataLength = data.length;
  //       this.dataSource.data = data;
  //     });

  this.dataSource!.filter = o.PlaceTypeName;
   }

   sortData(e: Sort){
    console.log(e);
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
  }
}
