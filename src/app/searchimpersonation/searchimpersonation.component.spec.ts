import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchimpersonationComponent } from './searchimpersonation.component';

describe('SearchimpersonationComponent', () => {
  let component: SearchimpersonationComponent;
  let fixture: ComponentFixture<SearchimpersonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchimpersonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchimpersonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
