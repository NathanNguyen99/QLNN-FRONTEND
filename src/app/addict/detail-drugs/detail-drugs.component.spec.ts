import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDrugsComponent } from './detail-drugs.component';

describe('DetailDrugsComponent', () => {
  let component: DetailDrugsComponent;
  let fixture: ComponentFixture<DetailDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
