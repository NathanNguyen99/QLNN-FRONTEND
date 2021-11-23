import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsEditComponent } from './drugs-edit.component';

describe('EduEditComponent', () => {
  let component: DrugsEditComponent;
  let fixture: ComponentFixture<DrugsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
