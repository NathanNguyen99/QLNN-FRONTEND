import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsEditComponent } from './relations-edit.component';

describe('RelationsEditComponent', () => {
  let component: RelationsEditComponent;
  let fixture: ComponentFixture<RelationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
