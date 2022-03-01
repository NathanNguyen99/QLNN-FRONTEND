import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmService } from 'src/app/Shared/Services/confirm.service';
import { ManagePlaceService } from 'src/app/Shared/Services/manageplace.service';
import * as XLSX from 'xlsx';

@Component({
  
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent {
  @Input()  _Database!: ManagePlaceService;
  spinnerEnabled = false;
  keys: string[];
  dataSheet:any = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

  constructor(public _Service: ManagePlaceService, private confirmSv: ConfirmService) {

  }
  message: string;  
  //Condition for upload button
  isActive: boolean;
  activeButton: boolean = true;
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true; 
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {
      this.onChange(event)
    }
    this.isActive = false;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }


  onChange(evt: any) {
    let data: any, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };
      //Change the condition for upload button
      this.activeButton = false;
      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
        
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }

  uploadFile() {  
    let formData = new FormData();  
    
    formData.append('FileUpload', this.inputFile.nativeElement.files[0], this.inputFile.nativeElement.files[0].name)  
    this.confirmSv.confirm('Tải lên Database', 'Bạn có chắc chắn muốn tải lên Database dữ liệu này không?')
    .subscribe(r => {if (r === true) {
      this._Service.UploadExcel(formData).subscribe(result => {  
        this.message = result.toString();  
      });
    }});

  } 

  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
    this.activeButton = true;
  }

}
