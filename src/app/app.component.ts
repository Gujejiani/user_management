import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { GetUSersACtion } from './reducers/store/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'user-management';
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(GetUSersACtion());
  }
}
