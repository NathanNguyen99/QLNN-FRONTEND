import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '../../Config/config';
import { UsesService } from '../../Shared/Services/uses.service';
import { DrugsService } from '../../Shared/Services/drugs.service';
import { AddictDrugsService } from '../../Shared/Services/addictdrug.service';
import { AddictPlaceService } from '../../Shared/Services/addictplace.service';
import { ClassifyService } from 'src/app/Shared/Services/classify.service';
import { AddictClassifyService } from 'src/app/Shared/Services/addictclassify.service';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  backendURL = this.config.setting['PathAPI'];
  GetImageurl = this.backendURL + 'FileHandle/AddictImage?fileName=';
  @Input() key: string | undefined;
  @Input() rowData: any;
  url: string | undefined;
    
    useData : any;
    drugData: any;

    addictDrugData : any;

    classifyData: any;

    addictClassifyData : any;
    addictPlaceData : any;

  constructor(private config: AppConfig,
    private usesService: UsesService, 
    private drugService: DrugsService,
    private adrugsrv : AddictDrugsService,
    private classifyService: ClassifyService,
    private adclassifysrv : AddictClassifyService,
    private adplacesrv : AddictPlaceService) { }
  
  ngOnInit(): void {

 
    this.loadUses();
    this.loadDrugs();
    this.loadClassify();

    this.loadAddictClassify();
    this.loadAddictPlace();
    this.loadAddictDrugs();
  }

  public loadUses() {    
    this.usesService.getUses().subscribe(data=> {
       this.useData=data      
      }, err => console.log(err));    
  }

  public loadDrugs() {    
    this.drugService.getAll().subscribe(data=> {
      //console.log(data);
       this.drugData=data      
      }, err => console.log(err));    
  }

  public loadAddictDrugs() {    
    this.adrugsrv.getByAddictID(this.key!).subscribe(data=> {
      //console.log(data);
       this.addictDrugData=data      
      }, err => console.log(err));    
  }

  public loadClassify() {    
    this.classifyService.getAll().subscribe(data => {
      //console.log(data);
       this.classifyData = data      
      }, err => console.log(err));    
  }

  public loadAddictClassify() {    
    this.adclassifysrv.getByAddictID(this.key!).subscribe(data=> {
      //console.log(data);
       this.addictClassifyData=data      
      }, err => console.log(err));    
  }

  public loadAddictPlace() {    
    this.adplacesrv.getByAddictID(this.key!).subscribe(data=> {
      //console.log(data);
       this.addictPlaceData=data      
      }, err => console.log(err));    
  }

  ngAfterViewInit() {
      //load source here
  }

  // setDefaultProduct(items) {
  //     let firstItem = items[0];

  //     if(firstItem && this.productIdBySupplier === undefined) {
  //         this.productIdBySupplier = firstItem.ProductID;
  //     }
  // }

  // handleValueChange(e: any) {
  //     this.productIdBySupplier = e.value;
  //     this.orderHistoryData = new DataSource({
  //         store: AspNetData.createStore({
  //             key: "OrderID",
  //             loadParams: { ProductID: e.value },
  //             loadUrl: this.url + "/GetOrdersByProduct"
  //         })
  //     });
  // }

  customizeItemTemplate(item: any) {
      item.template = "formItem";
  }
}
