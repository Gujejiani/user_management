import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MOBonusType, MOCurrency } from 'src/app/models';
import { SharedFormModule } from '../shared/shared.module';

import { BonusFacade } from './bonus-registration.facade';

@Component({
  selector: 'app-bonus-registration',
  templateUrl: './bonus-registration.component.html',
  styleUrls: ['./bonus-registration.component.scss'],
  standalone: true,
  imports: [SharedFormModule],
  providers: [BonusFacade],
})
export class BonusRegistrationComponent {
  constructor(private bonusFacade: BonusFacade) {}
  BONUS_TYPE = MOBonusType;
  formData: FormGroup = this.bonusFacade.getFormData();

  bonusTypes = [MOBonusType.FREEBET, MOBonusType.FREESPIN, MOBonusType.MONEY];
  users$ = this.bonusFacade.getUsers();
  loading$ = this.bonusFacade.getLoadingStatus();

  currencies = [MOCurrency.GEL, MOCurrency.USD];

  onSubmit(formDirective: any) {
    this.bonusFacade.submitBonus(this.formData, formDirective);
  }

  showErrorInfo(name: string) {
    return (
      this.formData.get(name)?.invalid &&
      (this.formData.get(name)?.dirty || this.formData.get(name)?.touched)
    );
  }

  get showCurrency() {
    const type = this.formData.get('type')?.value as MOBonusType;

    return type === this.BONUS_TYPE.MONEY;
  }
}
