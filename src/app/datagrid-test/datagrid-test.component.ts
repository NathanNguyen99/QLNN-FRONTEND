import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { addictService } from '../Shared/Services/addict.service';
import { AddictDrugsService } from '../Shared/Services/addictdrug.service';

@Component({
  selector: 'app-datagrid-test',
  templateUrl: './datagrid-test.component.html',
  styleUrls: ['./datagrid-test.component.css']
})
export class DatagridTestComponent implements OnInit {
  dataSource!: DataSource
  subjects: any = []; //addict drugs
  rowData: any = [];
  //addictDrugs : any;
  @ViewChild("mainGrid", { static: false }) mainGrid!: DxDataGridComponent;
  constructor(private service: addictService,private adrugsrv : AddictDrugsService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(data=> {
      //console.log(data);
       this.dataSource = new DataSource({
        store: data,
        reshapeOnPush: true
        });
      }, err=> console.log("loi gi o day"));
  }

  onInitNewRow(e: any) {
    this.subjects = [];
    e.data.Subjects = this.subjects;
  }
  onEditingStart(e: any) {
    //console.log(e);

    this.rowData = e.data;
    //this.loadAddictDrugs(e.data.oid, e.data);
    //this.subjects = e.data.Subjects.slice();
  }
  public loadAddictDrugs(key:any, odata: any) {   
    
    this.adrugsrv.getByAddictID(key).subscribe(data=> {
      console.log(data);
       this.subjects = data ;
       //odata.drugs = this.subjects;
      }, err => console.log(err));    
  }
  // onEditorPreparing(e: any) {
  //   if (e.dataField === "Name" && e.parentType === "dataRow") {
  //     this.rowData["name"] = e.row.data.Name;
  //     this.allValid = !e.row.data.Name || e.row.data.Name === "" && e.row.data.hasOwnProperty("Name") || this.subjects.length === 0;
  //   }
  // }

  // onEditorPreparingSub(e: any) {
  //   if (e.parentType === "dataRow") {
  //     if (!e.row.data.SubjectCode || e.row.data.SubjectCode === "" ||
  //       !e.row.data.SubjectName || e.row.data.SubjectName === "" ||
  //       !e.row.data.Section || e.row.data.Section === "" || e.component.hasEditData())
  //       this.allValid = true;
  //     else
  //       this.allValid = false;
  //   }

  // }

  customizeText(cellInfo: any) {
    if (cellInfo.value) {
      let cellText = "";
      cellInfo.value.forEach((subject: any) => {
        cellText += subject.SubjectName + ',';
      })
      return cellText.slice(0, cellText.length - 1);
    }
    return cellInfo.valueText;
  }

  setCellValue(newData: any, value: any) {
    let column = (<any>this);
    column.defaultSetCellValue(newData, value);
  }

  saveButton = () => {
    console.log("saveButton");
    //console.log(this.mainGrid.instance.getDataSource().items());
    
    this.mainGrid.instance.saveEditData();
    this.mainGrid.instance.refresh();
    
  }

  cancelButton = () => {
    this.mainGrid.instance.cancelEditData();
  }

  // onRowValidating(e: any) {
  //   this.allValid = e.brokenRules.length > 0 ? true : false;
  // }

  onRowRemoved(e: any) {
    setTimeout(() => {
      //this.allValid = this.subjects.length === 0 ? true : false;
    })

  }

  onSaving(e: any) {
    console.log(e);

    console.log(this.rowData);
    // if (e.changes[0]) {
    //   console.log("vo day truoc");
    //   e.changes[0] = {
    //     data: {
    //       ID: this.rowData["key"],
    //       Name: this.rowData["name"],
    //       Subjects: this.subjects
    //     },
    //     key: this.rowData["key"],
    //     type: "update"
    //   }
    // } else {
    //   console.log("vo day sau");
    //   e.changes.push({
    //     data: {
    //       ID: this.rowData["key"],
    //       Name: this.rowData["name"],
    //       Subjects: this.subjects
    //     },
    //     key: this.rowData["key"],
    //     type: "update"
    //   })
    // }
  }

  updateRow(e: any) {
    console.log('vo day khong');
    console.log(e);
  }

  
}
