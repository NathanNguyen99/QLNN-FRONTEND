import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  catchError,
  map,
  tap,
  startWith,
  switchMap,
  debounceTime,
} from 'rxjs/operators';
import { AddictClassifyService } from '../Shared/Services/addictclassify.service';
import { fromEvent, merge, BehaviorSubject, of as observableOf } from 'rxjs';
import { AddictClassifyEditComponent } from './obj-edit/addictclassify-edit.component';
import { ConfirmService } from '../Shared/Services/confirm.service';
import { AlertService } from '../Shared/Services/alert.service';
import { Classify } from '../Shared/Models/Classify';
import { AddictClassify } from '../Shared/Models/AddictClassify';

@Component({
  selector: 'app-addictclassify',
  templateUrl: './addictclassify.component.html',
  styleUrls: ['./addictclassify.component.css'],
})
export class AddictclassifyComponent implements OnInit {
  displayedColumns = [
    'AddictCode',
    'AddictName',
    'ClassifyName',
    'PlaceName',
    'Remarks',
    'actions',
  ];
  dataSource!: AddictClassify[];
  index: number = 0;
  Oid: string = '';
  _filterChange = new BehaviorSubject('');
  isLoadingResults = true;
  totalCount = 0;
  constructor(
    public dialogService: MatDialog,
    public _Service: AddictClassifyService,
    private confirmSv: ConfirmService,
    private alertSv: AlertService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit() {
    //this.loadData();
  }

  ngAfterViewInit() {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this._filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this._filterChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          let sortName = '';
          if (this.sort.active) sortName = this.sort.active;
          return this._Service.getPaging2(
            sortName,
            this.sort.direction,
            this._filterChange.value,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          );
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalCount = data.totalCount;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.dataSource = data;
        this.changeDetectorRefs.detectChanges();
        //console.log(this.dataSource);
      });

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(500))
      // .distinctUntilChanged()
      .subscribe(() => {
        this._filterChange.next(this.filter.nativeElement.value);
      });
  }

  startEdit(i: number, odata: AddictClassify) {
    //this.Oid = oid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    //console.log(this.index);
    const dialogRef = this.dialogService.open(AddictClassifyEditComponent, {
      data: odata,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this._Service.SaveEditDrugs().subscribe(
          (data) => {
            // When using an edit things are little different, firstly we find record inside DataService by id
            const foundIndex = this._Service!.dataChange.value.findIndex(
              (x) => x.oid === odata.oid
            );
            // Then you update that record using data from dialogData (values you enetered)
            this._Service!.dataChange.value[foundIndex] =
              this._Service.getDialogData();
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

  deleteItem(i: number, odata: AddictClassify) {
    this.index = i;
    //const url = "123";

    this.confirmSv
      .confirm(odata.classifyName, 'B???n c?? ch???c mu???n x??a m?? n??y kh??ng?')
      .subscribe((r) => {
        if (r === true) {
          return this._Service!.deleteRecord(odata.oid).subscribe(
            (result) => {
              this.success();
              // Refresh DataTable to remove row.
              this.deleteRowDataTable(i, 1, this.paginator, this.dataSource);
            },
            (err: any) => {
              console.log(err.error);
              console.log(err.message);
              this.alertSv.error('Delete did not happen.');
            }
          );
        }
        return undefined;
      });
  }

  private success() {
    //this.messagesService.openDialog('Success', 'Database updated as you wished!');
    this.alertSv.error('X??a th??nh c??ng', false);
  }
  private deleteRowDataTable(
    recordId: any,
    idColumn: any,
    paginator: any,
    dataSource: any
  ) {}

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddictClassifyEditComponent, {
      data: { edulv: {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this._Service.SaveAddDrugs().subscribe(
          (data) => {
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
    this.dataSource!.filter = o.PlaceTypeName;
  }
}
