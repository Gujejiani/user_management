import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusRegistrationComponent } from './bonus-registration.component';

describe('BonusRegistrationComponent', () => {
  let component: BonusRegistrationComponent;
  let fixture: ComponentFixture<BonusRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonusRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BonusRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
