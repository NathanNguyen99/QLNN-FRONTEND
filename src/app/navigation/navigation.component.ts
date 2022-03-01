import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavService } from '../Shared/Services';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { appMenuItem } from './../Shared/Services/DATA';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  appitems: any;

  @ViewChild('appDrawer') appDrawer!: ElementRef;
  subscription: Subscription | undefined;
  authentication: boolean = false;
  //watcher: Subscription;
  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    fontColor: 'rgb(8, 54, 71)',
    highlightOnSelect: true,
    //selectedListFontColor: 'red',
  };
  isHandset$: Observable<boolean> = this.media.media$.pipe(
    map(
      () =>
        this.media.isActive('xs') ||
        this.media.isActive('sm') ||
        this.media.isActive('lt-md')
    )
  );
  constructor(private media: MediaObserver, private navService: NavService) {
    if (localStorage.getItem('isAdmin') === 'true') {
      appMenuItem.forEach((element) => {
        if (element.oid === 5) element.hidden = false;
      });
    } else {
      appMenuItem.forEach((element) => {
        if (element.oid === 5) element.hidden = true;
      });
    }

    this.appitems = appMenuItem;
  }

  ngAfterContentChecked() {
    //this.cdr.detectChanges();
    this.navService.appDrawer = this.appDrawer;
  }

  selectedItem(selectedData: any) {
    //console.log(selectedData);
    //this.selectedData = selectedData;
  }

  ngOnInit(): void {
    //console.log("co vo lai day ko");
    //this.isHandset$.subscribe(isHandset => console.log(isHandset));
  }
}
