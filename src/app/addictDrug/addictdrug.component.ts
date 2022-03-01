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
import { fromEvent, merge, BehaviorSubject, of as observableOf } from 'rxjs';
import { AddictDrugEditComponent } from './obj-edit/addictdrug-edit.component';
import { ConfirmService } from '../Shared/Services/confirm.service';
import { AlertService } from '../Shared/Services/alert.service';
import { AddictRelations, AddictRelations2 } from '../Shared/Models/AddictRelations';
import { AddictRelationsService } from '../Shared/Services/addictrelations.service';

@Component({
  selector: 'app-addictdrug',
  templateUrl: './addictdrug.component.html',
  styleUrls: ['./addictdrug.component.css'],
})
export class AddictDrugComponent implements OnInit {
  displayedColumns = [
    'AddictCode',
    'AddictName',
    'RelationsName',
    'RelationWithName',
    'othername',
    'dateOfBirth',
    'Date',
    
    'managePlaceName',
    'blackList',
    'Remarks',
    'actions',
  ];
  dataSource!: AddictRelations2[];
  index: number = 0;
  Oid: string = '';
  pageIndex: number = 1;
  _filterChange = new BehaviorSubject('');
  isLoadingResults = true;
  totalCount = 0;
  inputValue?: string;
  filteredOptions: string[] = [];
  filterList: string[];

  constructor(
    public dialogService: MatDialog,
    public _Service: AddictRelationsService,
    private confirmSv: ConfirmService,
    private alertSv: AlertService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  onChange(value: string): void {
    this.filteredOptions = this.filterList.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  ngOnInit() {
    //this.loadData();
  }

  ngAfterViewInit() {
    this.loadData();
  }

  copylistOfData: AddictRelations2[];
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

  PageChange(event: any) {
    this.pageIndex = event;
    this.loadData();
  }

  startEdit(i: number, odata: AddictRelations) {
    //this.Oid = oid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialogService.open(AddictDrugEditComponent, {
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
            
          },
          (error: any) => {
            console.log(error);
          }
        );
        
      }
    });
  }

  startAddPlace(i: number, odata: AddictRelations2) {
    this.index = i;
    
    const dialogRef = this.dialogService.open(AddictDrugEditComponent, {
      data: odata,
    });
    
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) {
        this._Service.SaveAddDrugs().subscribe(
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

  deleteItem(i: number, odata: AddictRelations) {
    this.index = i;
    //const url = "123";

    this.confirmSv
      .confirm(odata.relationsName, 'Bạn có chắc muốn xóa mã này không?')
      .subscribe((r) => {
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

  handleEnterClick() {
    this.isLoadingResults = !this.isLoadingResults;
  }

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

  private success() {
    //this.messagesService.openDialog('Success', 'Database updated as you wished!');
    this.alertSv.error('Xóa thành công', false);
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddictDrugEditComponent, {
      data: { edulv: {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this._Service.SaveAddDrugs().subscribe(
          (data) => {
            // After dialog is closed we're doing frontend updates
            // For add we're just pushing a new row inside DataService
            this._Service.dataChange.value.push(this._Service.getDialogData());
            
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
