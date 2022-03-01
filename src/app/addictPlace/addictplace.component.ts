import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {
  AddictManagePlace,
  AddictManagePlace2,
} from '../Shared/Models/AddictManagePlace';
import { AddictPlaceService } from '../Shared/Services/addictplace.service';
import { AddictPlaceDataSource } from '../Shared/Datasources/addictPlace.Datasource';
import {
  fromEvent,
  merge,
  BehaviorSubject,
  of as observableOf,
  combineLatest,
} from 'rxjs';
import {
  catchError,
  map,
  tap,
  startWith,
  switchMap,
  first,
  debounceTime,
} from 'rxjs/operators';
import { AddictPlaceEditComponent } from './obj-edit/addictplace-edit.component';
import { ConfirmService } from '../Shared/Services/confirm.service';
import { AlertService } from '../Shared/Services/alert.service';
import { PlacetypeData } from '../Shared/Services/DATA';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-addictplace',
  templateUrl: './addictplace.component.html',
  styleUrls: ['./addictplace.component.scss'],
})
@UntilDestroy()
export class AddictPlaceComponent implements AfterViewInit, OnInit {
  displayedColumns = [
    'AddictCode',
    'AddictName',
    'PlaceName',
    'PlaceTypeName',
    'Remarks',
    'actions',
  ];
  //displayedColumns = ['AddictCode','AddictName','PlaceName', 'FromDate', 'ToDate', 'PlaceTypeName', 'Remarks', 'actions'];

  dataSource!: AddictManagePlace2[];
  

  filterList: string[];
  filteredOptions: string[] = [];

  index: number = 0;
  pageIndex: number = 1;
  Oid: string = '';
  totalCount: number = 0;
  inputValue?: string;
  constructor(
    public dialogService: MatDialog,
    public _Service: AddictPlaceService,
    private confirmSv: ConfirmService,
    private alertSv: AlertService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  _filterChange = new BehaviorSubject('');

  public placetypes = PlacetypeData;
  isLoadingResults = false;

  handleEnterClick() {
    this.isLoadingResults = !this.isLoadingResults;
  }

  onChange(value: string): void {
    this.filteredOptions = this.filterList.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  //isRateLimitReached = false;
  //isLoading$ = new BehaviorSubject(true);
  ngOnInit(): void {
    this.loadData();
  }
  copylistOfData: AddictManagePlace2[];
  //copylistOfData = [...this.dataSource];

  searchValue = '';

  reset() {
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);

      for (let i = 0; i < keys.length; i++) {
        value[keys[4]] = false;
      }
    });
    this.dataSource = this.copylistOfData;
    this.isLoadingResults = false;
  }

  search(search: any) {
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);

      for (let i = 0; i < keys.length; i++) {
        if (search == '') {
          value[keys[4]] = false;
          targetValue.push(value);
          break;
        }
        //this.removeAscent(value[keys[i]].toString());
        if (
          value[keys[i]] &&
          value[keys[i]]
            .toString()
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          value[keys[4]] = true;
          targetValue.push(value);
          break;
        }
      }
    });
    this.dataSource = targetValue;
  }
  // removeAscent (str: string) {
  //   if (str === null || str === undefined) return str;
  //   str = str.toLowerCase();
  //   str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  //   str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  //   str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  //   str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  //   str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  //   str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  //   str = str.replace(/đ/g, "d");
  //   return str;
  // }
  public loadData() {
    this._Service.getPaging22().subscribe({
      next: (data) => {
        this.isLoadingResults = false;
        this.dataSource = data;
        this.filterList = this.dataSource.map(a => a.addictName);
        this.copylistOfData = data;
        this.changeDetectorRefs.detectChanges();
      },
      error: (err) => console.log(err),
    });
    
  }

  ngAfterViewInit() {
    //this.loadData();
    // fromEvent(this.filter.nativeElement, 'keyup')
    //   .pipe(debounceTime(500))
    //   .subscribe(() => {
    //     this._filterChange.next(this.filter.nativeElement.value);
    //   });
  }
  startEdit(i: number, odata: AddictManagePlace) {
    this.index = i;
    //console.log(this.index);
    const dialogRef = this.dialogService.open(AddictPlaceEditComponent, {
      data: odata,
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) {
        this._Service.SaveEditPlace().subscribe(
          (data) => {
            // When using an edit things are little different, firstly we find record inside DataService by id
            const foundIndex = this._Service!.dataChange.value.findIndex(
              (x) => x.oid === odata.oid
            );
            this._Service!.dataChange.value[foundIndex] =
              this._Service.getDialogData();
            // And lastly refresh table
            this.loadData();
          },
          (error: any) => {
            console.log(error);
          }
        );
        this.loadData();
      }
    });
  }

  startAddPlace(i: number, odata: AddictManagePlace2) {
    this.index = i;
    console.log(odata);
    const dialogRef = this.dialogService.open(AddictPlaceEditComponent, {
      data: odata,
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) {
        this._Service.SaveAddPlace().subscribe(
          (data) => {
            // After dialog is closed we're doing frontend updates
            // For add we're just pushing a new row inside DataService
            this._Service.dataChange.value.push(this._Service.getDialogData());
            //this.loadData();
            //this.refreshTable();
            console.log(this._Service.getDialogData());
          },
          (error: any) => {
            console.log(error);
          }
        );
        this.loadData();
      }
    });
  }
  

  deleteItem(i: number, odata: AddictManagePlace) {
    this.index = i;
    //const url = "123";
    console.log(odata.oid)
    this.confirmSv
      .confirm(odata.placeName, 'Bạn có chắc muốn xóa mã này không?')
      .subscribe((r: boolean) => {
        if (r === true) {
          console.log(odata);
          this._Service.remove(odata);
          //this.dataSource.map(a => a.activityLog).splice(i, 1)
          //this.dataSource = [...this.dataSource];
          this.success();

        }
        return undefined;
      });
  }

  private success() {
    this.alertSv.error('Xóa thành công', false);
  }

  deleteRow(idx: any) {
    this.dataSource.splice(idx, 1);
    this._Service.remove(idx);
    this.dataSource = [...this.dataSource];
    console.log(this.dataSource);
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddictPlaceEditComponent, {
      data: { edulv: {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this._Service.SaveAddPlace().subscribe(
          (data) => {
            // After dialog is closed we're doing frontend updates
            // For add we're just pushing a new row inside DataService
            this._Service.dataChange.value.push(this._Service.getDialogData());
            //this.loadData();
            //this.refreshTable();
            console.log(this._Service.getDialogData());
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

  PageChange(event: any) {
    this.pageIndex = event;
    this.loadData();
  }
}
