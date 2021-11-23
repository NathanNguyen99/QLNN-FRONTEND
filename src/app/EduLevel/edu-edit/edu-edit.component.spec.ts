import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduEditComponent } from './edu-edit.component';

describe('EduEditComponent', () => {
  let component: EduEditComponent;
  let fixture: ComponentFixture<EduEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EduEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
