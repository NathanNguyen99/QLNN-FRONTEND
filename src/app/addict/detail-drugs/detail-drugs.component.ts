import { Component, Input, OnInit } from '@angular/core';
import { AddictDrugs } from 'src/app/Shared/Models/AddictDrugs';
import { DrugsService } from '../../Shared/Services/drugs.service';
import { AddictDrugsService } from '../../Shared/Services/addictdrug.service';
import { UsesService } from '../../Shared/Services/uses.service';

@Component({
  selector: 'app-detail-drugs',
  templateUrl: './detail-drugs.component.html',
  styleUrls: ['./detail-drugs.component.css']
})
export class DetailDrugsComponent implements OnInit {

  useData: any;
  drugData: any;
  addictDrugData: AddictDrugs[] = [];
  @Input() key: any;
  constructor(private drugService: DrugsService,
    private adrugsrv : AddictDrugsService,
    private usesService : UsesService) { }

  ngOnInit(): void {
    this.loadDrugs();
    this.loadUses();
    this.loadAddictDrugs();

    console.log(this.key);
  }

  public loadAddictDrugs() {    
    this.adrugsrv.getByAddictID(this.key).subscribe(data=> {
      //console.log(data);
       this.addictDrugData = data      
      }, err => console.log(err));    
  }

  public loadDrugs() {    
    this.drugService.getAll().subscribe(data=> {
      //console.log(data);
       this.drugData=data      
      }, err => console.log(err));    
  }

  public loadUses() {    
    this.usesService.getUses().subscribe(data=> {
      //console.log(data);
       this.useData=data      
      }, err => console.log(err));    
  }
}
