import { delay, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../containers/user/service/user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditUserGuard implements CanActivate {
  constructor(
    private userService: UserService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    const userId = route.paramMap.get('id') as string;

    return of(null).pipe(
      delay(2000), // Data to be loaded after refresh
      switchMap(() => this.userService.getUsers()),
      map((users) => {
        if (users[userId]) {
          return true;
        }
        // if id is wrong we show message, and on click navigating to home page
        this.userService.setPopupInfo(
          true,
          'user parameters are incorrect',
          '/'
        );
        return false;
      })
    );
  }
}
