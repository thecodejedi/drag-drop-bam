import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationMainDisplayComponent } from './calculation-main-display.component';

describe('CalculationMainDisplayComponent', () => {
  let component: CalculationMainDisplayComponent;
  let fixture: ComponentFixture<CalculationMainDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationMainDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationMainDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
