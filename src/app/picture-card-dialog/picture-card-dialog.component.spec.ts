import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCardDialogComponent } from './picture-card-dialog.component';

describe('PictureCardDialogComponent', () => {
  let component: PictureCardDialogComponent;
  let fixture: ComponentFixture<PictureCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureCardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
