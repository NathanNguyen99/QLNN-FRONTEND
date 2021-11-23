import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictComponent } from './addict.component';

describe('AddictComponent', () => {
  let component: AddictComponent;
  let fixture: ComponentFixture<AddictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
