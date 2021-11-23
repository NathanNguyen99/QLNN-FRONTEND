import {Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {NavService} from '../Shared/Services/nav.service';
//import {MatSidenav, MatDrawer} from "@angular/material/sidenav";
import { Helpers } from '../Helpers/helpers';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  _opened: boolean = true;

  constructor(public navService: NavService, public helper: Helpers) {
     
   }

  ngOnInit() {    
    
  }

  tongleNav(){
    
    // var kq : any = document.getElementById("matsideBar1");
    // var kkk:ElementRef=kq;
    // this.navService.appDrawer=kkk;
    // console.log(kkk);
    // this.navService.tongleNav();
//kkk.toggle();
  this._opened = !this._opened;
 
  }

  logout() {
    this.helper.logout();    
  }

}