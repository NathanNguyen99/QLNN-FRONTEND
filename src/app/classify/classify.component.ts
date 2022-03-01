import { Component, ElementRef, OnInit, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Classify} from '../Shared/Models/Classify';
import { ClassifyService } from '../Shared/Services/classify.service';
import { ClassifyDataSource } from '../Shared/Datasources/classify.Datasource';
import { switchMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ClassifyEditComponent} from './classify-edit/classify-edit.component';
import { ConfirmService } from '../Shared/Services/confirm.service';
import { AlertService } from '../Shared/Services/alert.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {

  displayedColumns = ['OID', 'ClassifyName', 'actions'];
  _Database!: ClassifyService;
  dataSource!: ClassifyDataSource;
  index: number=0;
  Oid: string='';
  
  constructor(public dialogService: MatDialog, public _Service: ClassifyService, private confirmSv: ConfirmService, private alertSv:AlertService) {
   }
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
    this._Database = this._Service;//new EduLevelService(this.httpClient);
    this.dataSource = new ClassifyDataSource(this._Database, this.paginator, this.sort);
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

  startEdit(i: number, odata: Classify) {
    //this.Oid = oid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    //console.log(this.index);
    const dialogRef = this.dialogService.open(ClassifyEditComponent, {
      data: odata
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this._Service.SaveEditObject().subscribe(
          data=> {
            //console.log(data)
              // When using an edit things are little different, firstly we find record inside DataService by id
            const foundIndex = this._Database.dataChange.value.findIndex(x => x.oid === odata.oid);
            // Then you update that record using data from dialogData (values you enetered)
            this._Database.dataChange.value[foundIndex] = this._Service.getDialogData();
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

  deleteItem(i: number, odata: Classify) {
    this.index = i;
    const url = "123";

    this.confirmSv.confirm(odata.classifyName, 'Bạn có chắc muốn xóa mã này không?')
    .subscribe(r=> {if (r === true) {
      
       this._Database.deleteRecord(odata.oid).subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
          this._Database!.dataChange.value.splice(i, 1)
          this.refreshTable();
        },
        (err: any) => {
          console.log(err.error);
          console.log(err.message);
          this.alertSv.error('Delete did not happen.');
        }
      );
    }});
    // .pipe(
    //   switchMap(res => {if (res === true) {
    //     console.log('url: ', url);
    //     return this._Database.deleteRecord(url);
    //   }}))
    //   .subscribe(
    //     result => {
    //       this.success();
    //       // Refresh DataTable to remove row.
    //       this.deleteRowDataTable (i, 1, this.paginator, this.dataSource);
    //     },
    //     (err: any) => {
    //       console.log(err.error);
    //       console.log(err.message);
    //       this.alertSv.error('Delete did not happen.');
    //     }
    //   );
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
    const dialogRef = this.dialogService.open(ClassifyEditComponent, {
      data: {edulv: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this._Service.SaveAddObject();
        this._Database.dataChange.value.push(this._Service.getDialogData());
        this.refreshTable();
      }
    });
  }

}
