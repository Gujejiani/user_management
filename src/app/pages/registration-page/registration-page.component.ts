
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationPageComponent {
  constructor(private router: Router) {}

  isOnHomePage(): boolean {
    return this.router.url === '/manage';
  }
}
