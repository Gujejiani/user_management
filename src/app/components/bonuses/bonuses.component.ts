import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MOBonus } from './../../models/bonus';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MOBonusType } from 'src/app/models';
import { DisableVisualDirective } from 'src/app/directive/disabled.directive';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    DisableVisualDirective,
  ],
})
export class BonusesComponent {
  @Input() bonuses: MOBonus[] = [];
  ICON_TYPES = MOBonusType;

  @Input() extractedBonusIds: string[] = [];

  @Output() bonusClicked = new EventEmitter<string>();

  onBonusClick(id: string) {
    this.bonusClicked.emit(id);
  }
}
