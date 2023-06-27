import { MatButtonModule } from '@angular/material/button';
import { UserPageModule } from './pages/user-page/user-page.module';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CloudsComponent } from './UI/clouds/clouds.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { InfoModalComponent } from './UI/info-modal/info-modal.component';
import { ModalComponent } from './containers/modal/modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    InfoModalComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CloudsComponent,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    UserPageModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
