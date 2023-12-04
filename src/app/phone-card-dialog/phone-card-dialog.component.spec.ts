import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCardDialogComponent } from './phone-card-dialog.component';

describe('PhoneCardDialogComponent', () => {
  let component: PhoneCardDialogComponent;
  let fixture: ComponentFixture<PhoneCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
