import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageplaceComponent } from './manageplace.component';

describe('ManagerplaceComponent', () => {
  let component: ManageplaceComponent;
  let fixture: ComponentFixture<ManageplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
