import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl : BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public tongleNav() {
    this.appDrawer.toggle();
    // if (this.helpers.isAuthenticated())
    //  console.log("1234444")
    //   this.appDrawer.toggle();
  }
}
