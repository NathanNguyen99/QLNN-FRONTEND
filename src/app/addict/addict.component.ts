import { ViewChild, Component, enableProdMode, OnInit } from '@angular/core';
import { Addict } from '../Shared/Models/Addict';
import { addictService } from '../Shared/Services/addict.service';
import { UserService } from '../Shared/Services/user.service';
import { DrugsService } from '../Shared/Services/drugs.service';
import { EduLevelService } from '../Shared/Services/eduLevel.service';
import { ManagePlaceService } from '../Shared/Services/manageplace.service';
import { AddictDrugsService } from '../Shared/Services/addictdrug.service';
import { UsesService } from '../Shared/Services/uses.service';
import { DxFileUploaderComponent } from 'devextreme-angular/ui/file-uploader';
import { AppConfig } from '../Config/config';
import DataSource from 'devextreme/data/data_source';
import { AddictDrugs } from '../Shared/Models/AddictDrugs';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AddictPlaceService } from '../Shared/Services/addictplace.service';
import { AlertService } from '../Shared/Services';
import { Guid } from 'guid-typescript';
import { alert } from 'devextreme/ui/dialog';
import {
  PlacetypeData,
  GenderData,
  ManageTypeData,
  Country,
  Ethnic,
  WorkStatus,
  Religion,
  Ingredient,
  Marriage,
} from './../Shared/Services/DATA';
import { AddictClassifyService } from '../Shared/Services/addictclassify.service';
import { ClassifyService } from '../Shared/Services/classify.service';
import { AddictVehicleService } from '../Shared/Services/addictVehicle.service';
//import { PlaceType } from '../Shared/Models/PlaceType';

@Component({
  selector: 'app-addict',
  templateUrl: './addict.component.html',
  styleUrls: ['./addict.component.css'],
})
export class AddictComponent implements OnInit {
  backendURL = this.config.setting['PathAPI'];
  GetImageurl = this.backendURL + 'FileHandle/AddictImage?fileName=';
  retryButtonVisible = false;
  @ViewChild('uploadedImage') uploadedImageRef: HTMLImageElement | undefined;
  @ViewChild('fileUploader') fileUploaderRef:
    | DxFileUploaderComponent
    | undefined;
  @ViewChild('dxgridDrugs', { static: false }) dataGrid:
    | DxDataGridComponent
    | undefined;
  @ViewChild('dxgridMaster', { static: false }) GridMaster:
    | DxDataGridComponent
    | undefined;
  //dataSource: Addict[];
  useData: any;
  drugData: any;
  classifyData: any;
  managePlaceData: any;
  addictClassifyData: any;
  addictPlaceData: any;
  addictDrugData: any;

  addictVehicleData: any;
  provinceData: any;

  //addictDrugData$ : Observable<AddictDrugs[]>;
  placeTypeData = PlacetypeData;
  genderData = GenderData;
  manageTypeData = ManageTypeData;
  country = Country;
  ethnic = Ethnic;
  workStatus = WorkStatus;
  religion = Religion;
  ingredient = Ingredient;
  marriageData = Marriage;
  dataSource!: DataSource;
  placeOfBirthData: any;
  wardData: any;
  userData: any;
  eduLevelData: any;
  rountCount: number = 0;
  rowData: any[] = [];

  addicts$: Observable<Addict[]> | undefined;
  //changes: Change<Addict>[] = [];
  EditObject!: Addict;
  isLoading = false;
  allValid: boolean = false;
  detailChange = false;
  openFormType = 0; // 0: normal, 1: new-insert, 2: edit - update
  //loadPanelPosition = { of: '#gridContainer' };
  constructor(
    private service: addictService,
    private userService: UserService,
    private eduservice: EduLevelService,
    private placeService: ManagePlaceService,
    private drugService: DrugsService,
    private adrugsrv: AddictDrugsService,
    private classifyService: ClassifyService,
    private adclassifysrv: AddictClassifyService,
    private adplacesrv: AddictPlaceService,
    private usesService: UsesService,
    private _addictVehicleService: AddictVehicleService,
    private alertservice: AlertService,
    private config: AppConfig
  ) {
    //this.dataSource = service.generateData(100000);
    this.loadWard();

    this.getFilteredPlaces = this.getFilteredPlaces.bind(this);
  }
  ngOnInit(): void {
    this.loadData();
    this.loadplaceOfBirth();
    this.loadUser();
    this.loadEduLevel();
    this.loadDrugs();
    this.loadUses();
    this.loadClassifys();
    this.loadProvince();

  }

  //onValueChanged

  public loadData() {
    if (window.localStorage['isAdmin']) {
      this.service.getAll().subscribe({
        next: (data) => {
          this.dataSource = new DataSource({
            store: data,
            reshapeOnPush: true,
          });
          this.rountCount = data.length;
        },
        error: (err) => console.log(err),
      });
    } else {
      this.service.getByPlace(window.localStorage['placeID']).subscribe({
        next: (data) => {
          this.dataSource = new DataSource({
            store: data,
            reshapeOnPush: true,
          });
          this.rountCount = data.length;
        },
        error: (err) => console.log(err),
      });
    }
  }

  public loadProvince() {
    this.service.getPlaceOfBirth().subscribe({
      next: (data: any) => {
        this.provinceData = data;
        //this.placeFilter = this.provinceData.filter((r: any)=>r.oid === this.data.placeTypeID);
      },
      error: (err: any) => console.log(err),
    });
  }

  public loadplaceOfBirth() {
    this.service.getPlaceOfBirth().subscribe(
      (data: any) => {
        //console.log(data);
        this.placeOfBirthData = data;
      },
      (err: any) => console.log(err)
    );
  }

  public loadWard() {
    this.placeService.getWards().subscribe({
      next: (data) => (this.wardData = data),
      error: (e) => console.error(e),
    });

    this.placeService.getAll().subscribe({
      next: (data) => (this.managePlaceData = data),
      error: (e) => console.error(e),
    });
  }  

  public loadUser() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => console.log(err),
    });
  }

  public loadEduLevel() {
    this.eduservice.getAll().subscribe({
      next: (data) => (this.eduLevelData = data),
      error: (e) => console.error(e),
    });
  }

  public loadClassifys() {
    this.classifyService.getAll().subscribe({
      next: (data) => (this.classifyData = data),
      error: (e) => console.error(e),
    });
  }

  public loadDrugs() {
    this.drugService.getAll().subscribe({
      next: (data) => (this.drugData = data),
      error: (e) => console.error(e),
    });
  }

  public loadUses() {
    this.usesService.getUses().subscribe({
      next: (data) => (this.useData = data),
      error: (e) => console.error(e),
    });
  }

  fileUploader_uploadFile(file: any, progressCallback: any) {
    console.log(file);
    console.log(progressCallback);
  }

  onValueChanged(e: any): void {
    //console.log(e);
    const reader: FileReader = new FileReader();
    reader.onload = (args) => {
      if (typeof args!.target!.result === 'string') {
        this.uploadedImageRef!.src = args!.target!.result;
        //console.log(this.uploadedImageRef);
      }
    };
    reader.readAsDataURL(e.value[0]); // convert to base64 string
  }

  onUploaded(e: any, cellInfo: any): void {
    //console.log(e)
    cellInfo.setValue(e.request.responseText);
    this.retryButtonVisible = false;
    this.EditObject.imgLink = e.request.responseText;
  }

  onUploadError(e: any): void {
    const xhttp = e.request;
    if (xhttp.status === 400) {
      e.message = e.error.responseText;
    }
    if (xhttp.readyState === 4 && xhttp.status === 0) {
      e.message = 'Connection refused';
    }
    this.retryButtonVisible = true;
  }

  onClick(e: any): void {
    // The retry UI/API is not implemented. Use a private API as shown at T611719.
    const fileUploaderInstance = this.fileUploaderRef!.instance;
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < fileUploaderInstance._files.length; i++) {
      // @ts-ignore
      delete fileUploaderInstance._files[i].uploadStarted;
    }
    // @ts-ignore
    fileUploaderInstance.upload();
  }

  logEvent(e: any) {
    //console.log(e);
  }
  onInitRowClassify(e: any) {
    e.data.oid = Guid.create().toString();
    e.data.addictID = this.EditObject.oid;

    //console.log(e.data);
  }

  onInitRowDrug(e: any) {
    e.data.oid = Guid.create().toString();
    e.data.addictID = this.EditObject.oid;

    //console.log(e.data);
  }

  onInitRowPlace(e: any) {
    e.data.oid = Guid.create().toString();
    e.data.addictID = this.EditObject.oid;
  }

  onInitRowVehicle(e: any) {
    e.data.oid = Guid.create().toString();
    e.data.addictID = this.EditObject.oid;
  }


  onInitNewRow(e: any) {
    //this.addictDrugData$ = null;
    this.openFormType = 1; //new
    this.detailChange = false;
    
    this.addictPlaceData = [];
    this.addictClassifyData = [];
    this.addictDrugData = [];
    this.addictVehicleData = [];

    e.data.classifys = this.addictClassifyData;
    e.data.places = this.addictPlaceData;
    e.data.drugs = this.addictDrugData;
    e.data.vehicle = this.addictVehicleData;

    e.data.createDate = new Date();
    e.data.oid = Guid.create().toString();
    e.data.createUser = window.localStorage['userid'];
    //if isUser not admin set e.data.manageplaceID=
    if (!window.localStorage['isAdmin']) {
      e.data.managePlaceID = window.localStorage['placeID'];
    }
    this.EditObject = e.data;
    //console.log(this.EditObject);
  }

  onEditing(data: Addict) {
    //console.log(this.GridMaster?.focusedRowIndex);
    this.detailChange = false;
    this.openFormType = 2; //edit
    this.EditObject = data;
    //this.EditObject.firstName ='thui thui thui';
    this.loadAddictDrugs(data.oid, data);
    this.loadAddictPlaces(data.oid, data);
    this.loadAddictClassify(data.oid, data);
    this.loadAddictVehicle(data.oid, data);

  }
  insertRow(e: any) {
    var model: Addict = e.data;
    model.classifys = this.addictClassifyData;
    model.places = this.addictPlaceData;
    model.drugs = this.addictDrugData;
    model.vehicle = this.addictVehicleData;
    console.log(model);
    e.cancel = this.processSave(model, 'insert').then((r) => {
      if (r === false) {
        alert('lỗi lưu dữ liệu, vui lòng liên hệ admin', 'Thông báo');
        return true;
      } else return false;
    });
  }
  //(onRowUpdating)="updateRow($event)"
  updateRow(e: any) {
    console.log(e);
    const model = Object.assign({}, e.oldData, e.newData) as Addict;
    model.classifys = this.addictClassifyData;
    model.places = this.addictPlaceData;
    model.drugs = this.addictDrugData;
    model.vehicle = this.addictVehicleData;

    console.log(model);
    e.cancel = this.processSave(model, 'update').then((r) => {
      if (r === false) {
        alert('lỗi lưu dữ liệu, vui lòng liên hệ admin', 'Thông báo');
        return true;
      } else return false;
    });
  }

  FormSaving(e: any) {
    //console.log(e);
    // if (e.changes[0]){
    //   const model = Object.assign({}, e.changes[0].key, e.changes[0].data) as Addict;
    //   this.EditObject = model;
    //   //console.log(model);
    // }
    // let actionType='update';
    // if (this.openFormType===1)
    //   actionType='insert';
    // this.EditObject.drugs = this.addictDrugData;
    // this.EditObject.places = this.addictPlaceData;
    //   //console.log(this.EditObject);
    //   //e.cancel = true;
    //   e.promise =  this.processSave(this.EditObject, actionType);
  }

  processSave(obj: Addict, type: string) {
    return this.service.saveChange(obj, type);
    //return this.service.saveObjChange(obj, type);
  }

  FormSaved(e: any) {
    this.detailChange = false;
    this.openFormType = 0; //
  }

  FormDetailSaved(e: any) {
    //this.GridMaster?.instance
    this.detailChange = true;
    //console.log(this.detailChange);
    var updValue = this.EditObject.updCount;
    if (updValue === undefined) updValue = -1;
    console.log(updValue);
    this.GridMaster!.instance.cellValue(
      this.GridMaster!.focusedRowIndex,
      'updCount',
      updValue + 1
    );
    //console.log(this.EditObject);
  }

  public loadAddictDrugs(key: any, odata: any) {
    //this.addictDrugData$=this.adrugsrv.getByAddictID(key);
    this.adrugsrv.getByAddictID(key).subscribe(
      (data) => {
        //console.log(data);
        (this.addictDrugData = data), (odata.drugs = this.addictDrugData);
      },
      (err) => console.log(err)
    );
  }

  public loadAddictClassify(key: any, odata: any) {
    //this.addictDrugData$=this.adrugsrv.getByAddictID(key);
    this.adclassifysrv.getByAddictID(key).subscribe(
      (data) => {
        //console.log(data);
        (this.addictClassifyData = data),
          (odata.classifys = this.addictClassifyData);
      },
      (err) => console.log(err)
    );
  }

  public loadAddictPlaces(key: any, odata: any) {
    //this.addictDrugData$=this.adrugsrv.getByAddictID(key);
    this.adplacesrv.getByAddictID(key).subscribe(
      (data) => {
        //console.log(data);
        (this.addictPlaceData = data), (odata.places = this.addictPlaceData);
      },
      (err) => console.log(err)
    );
  }

  public loadAddictVehicle(key: any, odata: any) {
    //this.addictDrugData$=this.adrugsrv.getByAddictID(key);
    this._addictVehicleService.getByAddictID(key).subscribe(
      (data) => {
        //console.log(data);
        (this.addictVehicleData = data), (odata.vehicle = this.addictDrugData);
      },
      (err) => console.log(err)
    );
  }


  myCommand(e: any) {
    console.log(e);
  }

  getFilteredPlaces(options: any) {
    //console.log(options);
    return {
      store: this.managePlaceData,
      filter: options.data
        ? ['placeTypeID', '=', options.data.placeTypeID]
        : null,
    };
  }

  onEditorPreparing(e: any) {
    if (e.parentType === 'dataRow' && e.dataField === 'managePlaceID') {
      e.editorOptions.disabled = typeof e.row.data.placeTypeID !== 'number';
    }

    if (
      !e.row.data.managePlaceID ||
      e.row.data.managePlaceID === '' ||
      !e.row.data.placeTypeID ||
      e.row.data.placeTypeID === '' ||
      e.component.hasEditData()
    )
      this.allValid = true;
    else this.allValid = false;
  }

  onRowValidating(e: any) {
    this.allValid = e.brokenRules.length > 0 ? true : false;
  }

  onEditorPreparingDrug(e: any) {
    if (e.parentType === 'dataRow') {
      if (
        !e.row.data.drugsID ||
        e.row.data.drugsID === '' ||
        !e.row.data.useID ||
        e.row.data.useID === 0 ||
        e.component.hasEditData()
      )
        this.allValid = true;
      else this.allValid = false;
    }
  }

  setPlaceTypeValue(rowData: any, value: any): void {
    rowData.managePlaceID = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  saveEditData() {
    // if (this.dataGrid.instance.hasEditData()) {
    //     // Implement your logic here
    //     this.dataGrid.instance.saveEditData();
    // }
  }
  // calculateSummary(options) {
  //   console.log(options);
  //   if(options.name == "customSummary1") {
  //     switch(options.summaryProcess) {
  //         case "start":
  //           options.totalValue = 0;
  //             break;
  //         case "calculate":
  //           options.totalValue +=1;
  //             break;
  //         case "finalize":
  //             // Assigning the final value to "totalValue" here
  //             options.totalValue=100;
  //             break;
  //     }
  //   }
  // }
}
