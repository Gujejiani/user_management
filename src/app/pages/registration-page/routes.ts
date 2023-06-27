import { Routes } from '@angular/router';
import { EditUserGuard } from 'src/app/guards/edit-user-guard.guard';
import { RegistrationPageComponent } from './registration-page.component';

export const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent,
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import(
            '../../containers/registration/user-form/user-form-container.component'
          ).then((com) => com.UserFormContainerComponent),
      },
      {
        path: 'user/:id',
        canActivate: [EditUserGuard],
        loadComponent: () =>
          import(
            '../../containers/registration/user-form/user-form-container.component'
          ).then((com) => com.UserFormContainerComponent),
      },

      {
        path: 'bonus',
        loadComponent: () =>
          import(
            '../../containers/registration/bonus-registration/bonus-registration.component'
          ).then((com) => com.BonusRegistrationComponent),
      },
      {
        path: 'bonus/:id',
        canActivate: [EditUserGuard],

        loadComponent: () =>
          import(
            '../../containers/registration/bonus-registration/bonus-registration.component'
          ).then((com) => com.BonusRegistrationComponent),
      },
    ],
  },
];
