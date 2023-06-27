import { MOMethods } from './../../../models/methods';
import { MOEndpoint } from './../../../models/endpoint';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/api/api.service';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import * as selectors from '../../../reducers/store/user.selectors';
import * as actions from '../../../reducers/store/user.actions';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apiService: APIService, private store: Store) {}

  getUsers() {
    return this.store.select(selectors.selectEntities);
  }

  setPopupInfo(error: boolean, message: string, navTo: string) {
    this.store.dispatch(
      actions.AddInfoMessageAction({ error, message, navTo })
    );
  }
  apiCall(endpoint: MOEndpoint, data?: any): Observable<any> {
    let url = environment.apiEndpoint + endpoint.api;

    if (endpoint.param) {
      url += `/${data?._id ? data._id : data?.get('_id')}`;
    }
    switch (endpoint.method) {
      case MOMethods.POST:
        return this.apiService.post(url, data);

      case MOMethods.GET:
        return this.apiService.get(url);

      case MOMethods.PATCH:
        return this.apiService.patch(url, data);

      case MOMethods.DELETE:
        return this.apiService.delete(url, data);

      default:
        return throwError(() => new Error('Error occurred'));
    }
  }

  updateUser() {}
}
