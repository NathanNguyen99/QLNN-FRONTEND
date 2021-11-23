import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, AfterViewChecked, HostListener } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { DxChartComponent, DxPieChartComponent } from 'devextreme-angular';
import { Observable, Subscription } from 'rxjs';
//import { NavService } from '../Shared/Services';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
export class HeightAndWidth{
    height:number=0;    
    width:number=0;
  }

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements AfterViewChecked {

    pieDatasource= [{
        country: "Heroin",
        medals: 110
    }, {
        country: "Đá",
        medals: 100
    }, {
        country: "Thuốc lắc",
        medals: 72
    }, {
        country: "Ketamin",
        medals: 47
    }, {
        country: "Khác",
        medals: 90
    }];
  dash01s =[
    {
        "monthID": "2020-10",
        "qty": 191
    },
    {
        "monthID": "2020-11",
        "qty": 51
    },
    {
        "monthID": "2020-12",
        "qty": 91
    },
    {
        "monthID": "2021-01",
        "qty": 102
    },
    {
        "monthID": "2021-02",
        "qty": 52
    },
    {
        "monthID": "2021-03",
        "qty": 102
    },
    {
        "monthID": "2021-04",
        "qty": 152
    },
    {
        "monthID": "2021-05",
        "qty": 72
    },
    {
        "monthID": "2021-06",
        "qty": 52
    },
    {
        "monthID": "2021-07",
        "qty": 152
    },
    {
        "monthID": "2021-08",
        "qty": 115
    },
    {
        "monthID": "2021-09",
        "qty": 100
    }
];
dash04s = [{
    state: "",
    "nam": 500,
    "nu": 350
  }];
   grossProductData = [{
    state: "Dưới 16",
    year2021: 803,
    year2020: 823
}, {
    state: "16-18",
    year2021: 316,
    year2020: 332
}, {
    state: "18-25",
    year2021: 452,
    year2020: 459
}, {
    state: ">25",
    year2021: 621,
    year2020: 642
}];
  renderOptions = { force: true }
  ischecked : number = 0;
@ViewChild('devXchart') chart!: DxChartComponent;
//@ViewChild('chart40', { static: false }) chart4!: DxChartComponent;
@ViewChild('chartGender', { static: false }) chart3!: DxChartComponent;
@ViewChild('chartPie1', { static: false }) chartPie1!: DxPieChartComponent;
@ViewChild('chartPie2') chartPie2!: DxPieChartComponent;
@ViewChild('divToTrackHeightChanges') divToTrackHeightChanges!:ElementRef;  
@HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.doDivHeightChange(this.getHeightAndWidthObject());
  }
  subscription!: Subscription;
watcher: Subscription;
chartR: any;
private activeMediaQuery: string = '';
  constructor(private media: MediaObserver) { 
    this.watcher = media.asObservable().subscribe((change: MediaChange[]) => {
        // change.forEach((item:MediaChange) => {
        // this.activeMediaQuery = item? `'${item.mqAlias}' = (${item.mediaQuery})` : '';
        // })

        // if (change[0].mqAlias==='xl' || change[0].mqAlias==='gl' || change[0].mqAlias==='md'){
        //     //  console.log('vô')
        //     //  console.log (window.innerWidth)
        //     const scWidth : number = window.innerWidth;
        //     const minw= 0.16 * scWidth;
        //     this.chart.size.width = scWidth-minw;
        // }
        // else{
        //     this.chart.size.width = undefined;
        // }            

      });       
  }
  
  ngOnInit(): void {
    
    // console.log(this.chart1);
    // var chart=document.getElementById("chart1");

    // console.log(chart);
      
    //   if (this.chart.instance){
    //     var renderOptions = { force: true, animate: false };  
    //     this.chart1.instance.render(renderOptions); 
    //   }

    
  }

  ngAfterViewInit(): void{
    this.setupHeightMutationObserver();
    this.doDivHeightChange(this.getHeightAndWidthObject());
    
  }

  customizeLabel(arg: any) {
    return arg.valueText + " (" + arg.percentText + ")";
}

chartInitialized(e: any): void {
    this.chartR = e.component;
    // console.log(this.chartR);
    // this.chartR.render();
  }

  render(){    
    this.chartR.render(this.renderOptions);
    this.chart3.instance.render(this.renderOptions);
    this.chartPie1.instance.render(this.renderOptions);
    this.chartPie2.instance.render(this.renderOptions);
    this.chart.instance.render(this.renderOptions);
  }


  ngAfterViewChecked(){
      if (this.ischecked<2){
        this.render();
        this.ischecked+=1;
      }    
  }
  
  doDivHeightChange(newValues:any){
    console.log(newValues);
   }
   getHeightAndWidthObject():HeightAndWidth{
    const newValues = new HeightAndWidth();
    newValues.height = this.divToTrackHeightChanges.nativeElement.offsetHeight;
    newValues.width = this.divToTrackHeightChanges.nativeElement.offsetWidth;
    return newValues;
  }
  setupHeightMutationObserver() {
    const observerable$ = new Observable<HeightAndWidth>(observer => {
      // Callback function to execute when mutations are observed
      // this can and will be called very often
      const callback = (mutationsList: any, observer2: any)=> {
        observer.next(this.getHeightAndWidthObject());
      };
      // Create an observer instance linked to the callback function
      const elementObserver = new MutationObserver(callback);

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };
      // Start observing the target node for configured mutations
      elementObserver.observe(this.divToTrackHeightChanges.nativeElement, config);      
    });

    this.subscription = observerable$
      .pipe(
        debounceTime(50),//wait until 50 milliseconds have lapsed since the observable was last sent
        distinctUntilChanged()//if the value hasn't changed, don't continue
      )
      .subscribe((newValues => {
        this.doDivHeightChange(newValues);
      }));
  }
}
