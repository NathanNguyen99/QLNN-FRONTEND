import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { addictService } from '../Shared/Services/addict.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import {
  PlacetypeData,
  GenderData,
  ManageTypeData,
} from './../Shared/Services/DATA';
@Component({
  selector: 'app-addict-search',
  templateUrl: './addict-search.component.html',
  styleUrls: ['./addict-search.component.scss'],
})
export class AddictSearchComponent implements OnInit {
  imageSrc: string;
  dataSource!: DataSource;
  placeTypeData = PlacetypeData;
  genderData = GenderData;
  manageTypeData = ManageTypeData;
  placeOfBirthData: any;
  wardData: any;
  userData: any;
  eduLevelData: any;
  isLoadingResults = false;
  @ViewChild('fileInput') fileInput: any;

  constructor(private service: addictService, private msg: NzMessageService) {}

  ngOnInit(): void {}

  //   readURL(event: any): void {
  //     console.log(event);
  //     if (event.target.files && event.target.files[0]) {
  //       this.imageSrc = URL.createObjectURL(event.target.files[0]);
  //     }

  // }

  isActive: boolean;

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
    //console.log('Drag over');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    //console.log('Drag leave');
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
        //console.log(this.imageSrc);
      };

      reader.readAsDataURL(event.dataTransfer.files[0]);

      this.onDroppedFile(droppedFiles)
    }
    this.isActive = false;
  }

  onDroppedFile(droppedFiles: any) {
    let formData = new FormData();
    for(let item of droppedFiles) {
      formData.append('files', item);
    }

    this.isLoadingResults = true;
    this.dataSource = null;
    this.service.UploadImage(formData).subscribe( {
      next: (data) => {
        this.dataSource = new DataSource({
          store: data,
          reshapeOnPush: true,
        });
      },
      error: (err) => console.log(err),
      complete: () => (this.isLoadingResults = false),
    }
      
    )
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }

    this.UploadImage();
  }

  UploadImage() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.isLoadingResults = true;
      this.dataSource = null;
      //console.log(fileBrowser.files);
      const formData = new FormData();
      formData.append('files', fileBrowser.files[0]);
      this.service.UploadImage(formData).subscribe({
        next: (data) => {
          this.dataSource = new DataSource({
            store: data,
            reshapeOnPush: true,
          });
        },
        error: (err) => console.log(err),
        complete: () => (this.isLoadingResults = false),
      });
    }
  }
}
