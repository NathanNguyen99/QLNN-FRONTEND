import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movehistory',
  templateUrl: './moveHistory.component.html',
  styleUrls: ['./moveHistory.component.scss']
})
export class MoveHistoryComponent implements OnInit {
  // lat = 10.95973333264025;
  // lng = 106.6970062530769;

  ngOnInit() {
  }


}
