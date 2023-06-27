import { MOBonusType } from 'src/app/models';
import { MOActionTypes } from './../../models/actionTypes';
import { MOUser } from './../../models/user';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/UI/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { PHOTO_URL } from 'src/app/api/endpoints';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BonusesComponent } from '../bonuses/bonuses.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    CardComponent,
    MatButtonModule,
    MatTooltipModule,
    BonusesComponent,
  ],
})
export class UserCardComponent {
  photoUrl = PHOTO_URL.api;
  @Input() user!: MOUser;
  @Input() buttonText = '';
  @Input() detailPage = false;
  @Input() showBonusCount = false;
  @Output() buttonClicked = new EventEmitter<MOActionTypes>();

  ACTION_TYPES = MOActionTypes;
  ICON_TYPES = MOBonusType;

  onButtonClick(type: MOActionTypes) {
    this.buttonClicked.emit(type);
  }
}
