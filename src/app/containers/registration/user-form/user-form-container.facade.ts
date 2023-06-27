import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MOGender, MOUser } from 'src/app/models';
import * as actions from '../../../reducers/store/user.actions';
import * as selectors from '../../../reducers/store/user.selectors';

@Injectable()
export class FormFacade implements OnDestroy {
  subscription$?: Subscription;
  modalInfo$ = this.store.select(selectors.selectModalInfo);
  constructor(private store: Store) {}

  getUserById(id: string) {
    return this.store.select(selectors.selectUserById(id));
  }
  getLoadingStatus() {
    return this.store.select(selectors.selectLoading);
  }
  getFormGroup(editMode: boolean) {

    return new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      gender: new FormControl<MOGender>(MOGender.MALE),
      idNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(11),
        Validators.minLength(11),
      ]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      address: new FormControl('', Validators.required),
      photo: editMode
        ? new FormControl(null)
        : new FormControl(null, Validators.required),
    });
  }

  deleteUser(
    id: string,
    formData: FormGroup,
    formDirective: any,
    editingEndedHandler: () => void
  ) {
    this.store.dispatch(actions.DeleteUserAction({ data: { _id: id } }));
    this.resetFormHandler(formData, formDirective);
    editingEndedHandler();
  }

  submitForm(
    formData: FormGroup,
    editMode: boolean,
    formDirective: any,
    user: MOUser,
    extractedBonusIds: string[]
  ) {
    if (formData.valid) {

      const doc: any = document;
      const photo = doc.getElementById('photo').files[0];
      const form = new FormData();
      form.append('name', formData.value.name);
      form.append('lastName', formData.value.lastName);
      form.append('gender', formData.value.gender);
      form.append('phoneNumber', formData.value.phoneNumber);
      form.append('idNumber', formData.value.idNumber);

      form.append('address', formData.value.address);
      if (photo) {
        form.append('photo', photo);
      }
      if (editMode) {
        form.append('_id', user._id);

        if (extractedBonusIds.length) {
          form.append(
            'bonuses',
            JSON.stringify(
              user.bonuses.filter(
                (bonus) => !extractedBonusIds.includes(bonus._id)
              )
            )
          );
        }

        this.store.dispatch(
          actions.UpdateUserAction({ data: form, bonusCreated: false })
        );
        return;
      }
      this.store.dispatch(actions.CreateUserAction({ user: form as any }));

      this.resetFormHandler(formData, formDirective);
    }
  }

  resetFormHandler(formData: FormGroup, formDirective: any) {
    this.subscription$ = this.modalInfo$.subscribe((info) => {
      if (!info.error && info.message) {
        formDirective.resetForm();
        formData.reset();

        this.removeSubscription();
      }
    });
  }

  /**
   *
   * @param formData
   * @param user
   * @returns true if there is no change between current user and form data, so no change is made
   */
  formIsEdited(
    formData: FormGroup,
    user: MOUser,
    ExtBonusIds: string[]
  ): boolean {
    const formValues: any = formData.value;
    const userValues: any = {
      name: user.name,
      lastName: user.lastName,
      gender: user.gender,
      idNumber: user.idNumber,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };

    // compering  each property, of form and user
    for (const key in userValues) {
      if (formValues[key] !== userValues[key]) {

        return true; // Returning true if any difference is found
      }
    }
    if (formData.value.photo || ExtBonusIds.length) {
      return true;
    }

    return false; // Returning false if no differences are found
  }

  removeSubscription() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.removeSubscription();
  }
}
