import { UserPageComponent } from './user-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
  },
  {
    path: ':id/detail',
    loadComponent: () =>
      import('../../containers/user-detail/user-detail.component').then(
        (com) => com.UserDetailComponent
      ),
  },
];
