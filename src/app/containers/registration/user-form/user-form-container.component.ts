import { shakeAnimation } from 'src/app/animations/animations';
import { ShakeAnimationInterface } from './../../../animations/animations';
import { MOUser } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { FormFacade } from './user-form-container.facade';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedFormModule } from '../shared/shared.module';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BonusesComponent } from 'src/app/components/bonuses/bonuses.component';

@Component({
  selector: 'app-form',
  templateUrl: './user-form-container.component.html',
  styleUrls: ['./user-form-container.component.scss'],
  standalone: true,
  imports: [SharedFormModule, BonusesComponent],
  providers: [FormFacade],
  animations: [shakeAnimation],
})
export class UserFormContainerComponent
  implements OnInit, OnDestroy, ShakeAnimationInterface
{
  constructor(
    private formFacade: FormFacade,
    private activeRoute: ActivatedRoute
  ) {}
  buttonState: 'void' | 'shake' = 'void';

  onMouseEnter() {
    this.buttonState = 'shake';
  }

  onMouseLeave() {
    this.buttonState = 'void';
  }

  loading$ = this.formFacade.getLoadingStatus();
  extractedBonusIds: string[] = [];
  deleting = false;
  subscription$?: Subscription;
  editMode = this.activeRoute.snapshot.queryParamMap.get('editmode') as string;
  formData: FormGroup = this.formFacade.getFormGroup(!!this.editMode);
  user?: MOUser;
  ngOnInit() {

    if (this.editMode) {
      this.subscription$ = this.formFacade
        .getUserById(this.retrieveId())
        .subscribe((user) => {
          if (user) {
            this.user = user;
            this.formData.patchValue({
              name: user.name,
              lastName: user.lastName,
              gender: user.gender,
              idNumber: user.idNumber,
              phoneNumber: user.phoneNumber,
              address: user.address,
            });
          }
        });
    }
  }
  onDeleteClicked() {
    this.deleting = true;
  }
  bonusClicked(id: string) {
    const index = this.extractedBonusIds.indexOf(id);

    if (index !== -1) {
      this.extractedBonusIds.splice(index, 1);
    } else {
      this.extractedBonusIds.push(id);
    }
  }

  onSubmit(formDirective: any) {
    const userData = this.user as MOUser;
    if (this.deleting) {
      const userDeleted = () => {
        this.editMode = '';
      };
      this.formFacade.deleteUser(
        this.retrieveId(),
        this.formData,
        formDirective,
        userDeleted
      );
      return;
    }

    this.formFacade.submitForm(
      this.formData,
      !!this.editMode,
      formDirective,
      userData,
      this.extractedBonusIds
    );
  }

  formIsEdited() {
    if (this.user && this.editMode) {
      return this.formFacade.formIsEdited(
        this.formData,
        this.user,
        this.extractedBonusIds
      );
    }

    return false;
  }

  retrieveId() {
    const id = this.activeRoute.snapshot.paramMap.get('id') as string;

    return id ?? '';
  }

  unsubscribe() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  showErrorInfo(name: string) {
    return (
      this.formData.get(name)?.invalid &&
      (this.formData.get(name)?.dirty || this.formData.get(name)?.touched)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
