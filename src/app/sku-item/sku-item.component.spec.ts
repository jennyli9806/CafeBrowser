import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuItemComponent } from './sku-item.component';

describe('SkuItemComponent', () => {
  let component: SkuItemComponent;
  let fixture: ComponentFixture<SkuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
