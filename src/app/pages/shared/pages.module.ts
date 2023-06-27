import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from 'src/app/UI/card/card.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, CardComponent],
  exports: [CommonModule, MatIconModule, CardComponent],
})
export class SharedPagesModule {}
