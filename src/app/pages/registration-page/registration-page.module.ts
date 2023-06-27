import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RegistrationPageComponent } from './registration-page.component';
import { RouterModule, } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedPagesModule } from '../shared/pages.module';
import { routes } from './routes';

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedPagesModule,
  ],
  exports: [RegistrationPageComponent],
})
export class RegistrationPageModule {}
