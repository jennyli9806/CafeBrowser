import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiamComponent } from './piam.component';

describe('PiamComponent', () => {
  let component: PiamComponent;
  let fixture: ComponentFixture<PiamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
