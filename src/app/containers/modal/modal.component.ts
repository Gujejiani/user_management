import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import * as selectors from '../../reducers/store/user.selectors';
import * as actions from '../../reducers/store/user.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(private store: Store, private router: Router) {}
  modalInfo$ = this.store.select(selectors.selectModalInfo);
  closePopup(url?: string) {
    this.store.dispatch(actions.RemoveInfoMessageAction());

    if (url) {
      this.router.navigate([url]);
    }
  }
}
