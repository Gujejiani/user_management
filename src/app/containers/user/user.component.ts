import { UserFacade } from './user.facade';
import { MOToSieve } from './../../models/toSieve-parameters';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MOUser, MOGender } from 'src/app/models';
import { selectAll } from '../../reducers/store/user.selectors';
import * as selectors from '../../reducers/store/user.selectors';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  loading$ = this.store.select(selectors.selectLoading);

  pagingData$ = this.userFacade.pagingData$;

  filterEnabled = false;
  sortEnabled = false;
  sieveConfig: MOToSieve = {
    gender: null,
    hasBonus: false,
    sieveType: 'filter',
  };
  GENDER = MOGender;
  users$ = this.store.select(selectAll);

  constructor(
    private store: Store,
    private router: Router,
    private userFacade: UserFacade
  ) {}

  ngOnInit() {
    this.userFacade.setSavedPagingData();
    this.getSieveConfig();
  }

  genderSelected(gender: MOGender) {
    this.sieveConfig = {
      ...this.sieveConfig,
      gender: this.sieveConfig.gender === gender ? null : gender,
    };
    this.saveSieveConfig();
    this.resetPages();
  }

  bonusSelected() {
    this.sieveConfig = {
      ...this.sieveConfig,
      hasBonus: !this.sieveConfig.hasBonus,
    };
    this.resetPages();
    this.saveSieveConfig();
  }

  saveSieveConfig() {

    if (this.sieveConfig) {
      localStorage.setItem('sieveConfig', JSON.stringify(this.sieveConfig));
      localStorage.setItem('sortEnabled', JSON.stringify(this.sortEnabled));
      localStorage.setItem('filterEnabled', JSON.stringify(this.filterEnabled));
    }
  }

  getSieveConfig() {
    const data = localStorage.getItem('sieveConfig');
    const filterEnabled = localStorage.getItem('filterEnabled');
    const sortEnabled = localStorage.getItem('sortEnabled');
    if (data && sortEnabled && filterEnabled) {
      this.sieveConfig = { ...JSON.parse(data) };
      this.sortEnabled = JSON.parse(sortEnabled);
      this.filterEnabled = JSON.parse(filterEnabled);
    }
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/', id, 'detail']);
  }

  navToCreateUser() {
    this.router.navigate(['/manage', 'user']);
  }

  handlePageEvent(data: { pageIndex: number }) {
    this.userFacade.handlePageEvent(data);
  }
  resetPages() {
    this.userFacade.resetPages();
  }
  toggleFilter() {
    this.filterEnabled = !this.filterEnabled;
    this.sortEnabled = false;
    this.resetSieve('filter');

  }

  toggleSort() {
    this.sortEnabled = !this.sortEnabled;
    this.filterEnabled = false;
    this.resetSieve('sort');
  }

  resetSieve(type: 'filter' | 'sort') {
    this.sieveConfig.sieveType = type;
    this.sieveConfig.gender = null;
    this.sieveConfig.hasBonus = false;
  }

  trackByFn(_index: number, user: MOUser) {
    return user._id;
  }
}
