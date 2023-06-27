import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { routes } from './routes';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../../reducers/store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../reducers/store/user.effects';
import { UserComponent } from '../../containers/user/user.component';
import { UserPageComponent } from './user-page.component';
import { RouterModule } from '@angular/router';
import { SharedPagesModule } from '../shared/pages.module';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { PagingPipe } from 'src/app/pipes/paging.pipe';
import { FilterSortComponent } from 'src/app/components/filter-sort/filter-sort.component';
import { SievePipe } from 'src/app/pipes/sieve.pipe';
import { DisableVisualDirective } from 'src/app/directive/disabled.directive';
import { LoadingComponent } from 'src/app/UI/loading/loading.component';
import { InfoBoxComponent } from 'src/app/UI/info-box/info-box.component';
import { UserFacade } from 'src/app/containers/user/user.facade';

@NgModule({
  declarations: [
    UserPageComponent,
    UserComponent,
    PagingPipe,
    FilterSortComponent,
    SievePipe,
    LoadingComponent,
    InfoBoxComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forRoot([UserEffects]),
    SharedPagesModule,
    UserCardComponent,
    MatPaginatorModule,
    MatButtonModule,
    DisableVisualDirective,
  ],

  exports: [RouterModule],

  providers: [UserFacade],
})
export class UserPageModule {}
