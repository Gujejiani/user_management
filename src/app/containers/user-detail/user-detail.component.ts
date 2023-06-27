import { MOActionTypes } from './../../models/actionTypes';
import { MOGender } from './../../models/gender';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as selectors from '../../reducers/store/user.selectors';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, UserCardComponent],
})
export class UserDetailComponent {
  user$ = this.store.select(selectors.selectUserById(this.retrieveId()));
  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}
  GENDER = MOGender;
  id: string = '';
  retrieveId() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string;

    return this.id ?? '';
  }

  onButtonClick(action: MOActionTypes) {
    if (action === MOActionTypes.EDIT) {
      const url = `/manage/user/${this.retrieveId()}`;
      this.router.navigate([url], { queryParams: { editmode: true } });
      return;
    }

    // user clicked add bonus in this case
    const url = `/manage/bonus/${this.retrieveId()}`;

    this.router.navigate([url]);
  }

  genderIcon(gender: MOGender) {
    return gender === this.GENDER.MALE ? 'man' : 'woman';
  }
}
