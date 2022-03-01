import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { addictService } from 'src/app/Shared/Services/addict.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'addict-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent {
  @Input()  _Database!: addictService;
  spinnerEnabled = false;
  keys: string[];
  dataSheet:any = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  isActive: boolean;

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
      var reader = new FileReader();

      reader.onload = (event: any) => {
        //this.imageSrc = event.target.result;
        //console.log(this.imageSrc);
      };

      reader.readAsDataURL(event.dataTransfer.files[0]);

      this.onDroppedFile(droppedFiles)
    }
    this.isActive = false;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    //console.log('Drag leave');
  }

  onDroppedFile(droppedFiles: any) {
    let formData = new FormData();
    for(let item of droppedFiles) {
      formData.append('files', item);
    }

  
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

  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
  }

}
