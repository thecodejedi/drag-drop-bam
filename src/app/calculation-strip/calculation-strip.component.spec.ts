import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationStripComponent } from './calculation-strip.component';

describe('CalculationStripComponent', () => {
  let component: CalculationStripComponent;
  let fixture: ComponentFixture<CalculationStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationStripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
