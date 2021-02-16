import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationOperatorsComponent } from './calculation-operators.component';

describe('CalculationOperatorsComponent', () => {
  let component: CalculationOperatorsComponent;
  let fixture: ComponentFixture<CalculationOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
