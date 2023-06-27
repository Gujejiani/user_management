import { Store } from '@ngrx/store';
import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MOBonus, MOBonusType, MOCurrency } from 'src/app/models';
import * as userSelectors from '../../../reducers/store/user.selectors';
import * as actions from '../../../reducers/store/user.actions';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class BonusFacade implements OnDestroy {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  subscription$?: Subscription;

  getLoadingStatus() {
    return this.store.select(userSelectors.selectLoading);
  }

  getUsers() {
    return this.store.select(userSelectors.selectAll);
  }

  getFormData() {
    const id = this.retrieveId();
    return new FormGroup({
      userId: new FormControl(id ?? '', [Validators.required]),
      type: new FormControl<MOBonusType>(MOBonusType.FREEBET, [
        Validators.required,
      ]),
      bonusAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        this.bonusAmountValidator,
      ]),
      currency: new FormControl(MOCurrency.GEL, Validators.required),
    });
  }

  submitBonus(formData: FormGroup, formDirective: any) {
    if (formData.valid) {
      const userId = formData.value.userId;
      const bonus: MOBonus = {
        _id: 'tempId',
        amount: formData.value.bonusAmount,
        userId: userId,
        currency: formData.value.currency,
        type: formData.value.type,
        iconName: 'rocket',
      };
      if (this.subscription$) {
        this.subscription$.unsubscribe();
      }
      let updated = false;
      this.removeSubscription();
      this.subscription$ = this.store
        .select(userSelectors.selectUserById(formData.value.userId))
        .subscribe((user) => {
          if (user?._id && !updated) {
            updated = true;
            this.addIconName(formData, bonus);
            const updatedUserData = {
              ...user,
              bonuses: [...(user.bonuses || []), bonus],
            };

            formData.reset();
            formDirective.resetForm();
            this.store.dispatch(
              actions.UpdateUserAction({
                data: updatedUserData,
                bonusCreated: true,
              })
            );
            this.removeSubscription();
          }
        });
    }
  }

  private addIconName(formData: FormGroup, bonus: MOBonus) {
    switch (formData.value.type) {
      case MOBonusType.MONEY:
        bonus.currency = formData.value.currency;
        bonus.iconName = 'payments';
        break;
      case MOBonusType.FREESPIN:
        bonus.iconName = 'stars';
        break;
      case MOBonusType.FREEBET:
        bonus.iconName = 'rocket';
        break;
    }
  }

  private bonusAmountValidator(control: FormControl) {
    const bonusAmount = control.value;
    if (bonusAmount && bonusAmount <= 0) {
      return { invalidBonusAmount: true };
    }
    return null;
  }

  removeSubscription() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
  retrieveId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    return id ?? '';
  }

  ngOnDestroy() {
    this.removeSubscription();
  }
}
