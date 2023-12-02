import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteInsuranceComponent } from './quote-insurance.component';

describe('QuoteInsuranceComponent', () => {
  let component: QuoteInsuranceComponent;
  let fixture: ComponentFixture<QuoteInsuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteInsuranceComponent]
    });
    fixture = TestBed.createComponent(QuoteInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
