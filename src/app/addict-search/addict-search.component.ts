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

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
        //console.log(this.imageSrc);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
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

      // data=>{
      // this.dataSource = new DataSource({
      //   store: data,
      //   reshapeOnPush: true
      //   });
      // },
      // err=> console.log("loi gi o day"));
    }
  }
}
