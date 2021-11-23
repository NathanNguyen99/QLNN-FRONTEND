import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { DxChartComponent, DxPieChartComponent } from 'devextreme-angular';
import {
  Dash01,
  Dash02,
  Dash03,
  Dash04,
  Dash05,
  DashAddictType,
} from '../Shared/Models/DashBoard';
import { Data, DashBoardService } from '../Shared/Services/Dash.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css'],
})
export class Dashboard1Component implements AfterViewChecked {
  dash01s: Dash01[] = [];
  dash02s: Dash02[] = [];
  //dash03s: DashAddictType[] = [];

  dash03s: Dash03[] = [];
  dash04s: Dash04[] = [];
  dash05s: Dash05[] = [];
  renderOptions = { force: true };
  ischecked: number = 0;
  @ViewChild('devXchart') chart1!: DxChartComponent;
  @ViewChild('chartGender', { static: false }) chart2!: DxChartComponent;
  @ViewChild('chartPie1', { static: false }) chartPie3!: DxPieChartComponent;
  @ViewChild('chartPie2') chartPie4!: DxPieChartComponent;
  @ViewChild('chart5') chart5!: DxChartComponent;

  dataSource: Data[];


  constructor(private dbService: DashBoardService) {}

  ngOnInit(): void {
    this.dbService.getDashBoard01().subscribe((p) => {
      this.dash01s = p;
    });

    this.dbService.getDashBoard02().subscribe((p) => {
      this.dash02s = p;
    });

    this.dbService.getDashBoard03().subscribe((p) => {
      this.dash03s = p;
    });

    this.dbService.getDashBoard04().subscribe((p) => {
      this.dash04s = p;
    });

    this.dbService.getDashBoard05().subscribe((p) => {
      this.dash05s = p;
    });

    this.dataSource = this.dbService.getData();
  }

  //   customizeTooltip (pointInfo: { originalValue: any; }) {
  //     console.log(pointInfo);
  //     return {
  //         text: pointInfo.originalValue
  //     };
  // }
  customizeLabel(arg: any) {
    return arg.valueText + ' (' + arg.percentText + ')';
  }

  render() {
    this.chart1.instance.render(this.renderOptions);
    this.chart2.instance.render(this.renderOptions);
    this.chartPie3.instance.render(this.renderOptions);
    this.chartPie4.instance.render(this.renderOptions);
    this.chart5!.instance.render(this.renderOptions);
  }

  ngAfterViewInit(): void {
    //this.render();
    //console.log(this.chart1.instance);
    //this.chart1.instance.render(this.renderOptions);
  }

  ngAfterViewChecked() {
    if (this.ischecked < 2) {
      //this.render();
      //console.log(this.chart1.instance);
      this.chart1.instance.render(this.renderOptions);
      this.chart2.instance.render(this.renderOptions);
      this.chart5.instance.render(this.renderOptions);
      this.ischecked += 1;
    }
    // if(this.chart1 && this.chart1.instance)
    //   console.log(this.chart1.instance);
  }
}
