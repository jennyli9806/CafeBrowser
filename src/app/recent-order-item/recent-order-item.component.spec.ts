import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentOrderItemComponent } from './recent-order-item.component';

describe('RecentOrderItemComponent', () => {
  let component: RecentOrderItemComponent;
  let fixture: ComponentFixture<RecentOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentOrderItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
