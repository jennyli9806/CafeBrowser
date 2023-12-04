import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuDepotsComponent } from './sku-depots.component';

describe('SkuDepotsComponent', () => {
  let component: SkuDepotsComponent;
  let fixture: ComponentFixture<SkuDepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuDepotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuDepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
