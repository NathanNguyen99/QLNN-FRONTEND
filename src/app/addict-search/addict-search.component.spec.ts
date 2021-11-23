import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictSearchComponent } from './addict-search.component';

describe('AddictSearchComponent', () => {
  let component: AddictSearchComponent;
  let fixture: ComponentFixture<AddictSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddictSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddictSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
