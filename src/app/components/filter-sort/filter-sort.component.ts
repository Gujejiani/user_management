import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MOGender } from 'src/app/models';
import { MOToSieve } from 'src/app/models/toSieve-parameters';

@Component({
  selector: 'app-filters-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSortComponent  {
  @Input() filterEnabled: boolean = false;
  @Input() sortEnabled: boolean = false;
  @Input() sieveConfig!: MOToSieve;

  @Output() filterClicked = new EventEmitter<void>();
  @Output() sortClicked = new EventEmitter<void>();
  @Output() maleSelected = new EventEmitter<void>();
  @Output() femaleSelected = new EventEmitter<void>();
  @Output() bonusSelected = new EventEmitter<void>();

  GENDER = MOGender;

  toggleFilter() {

    this.filterClicked.emit();
    this.filterEnabled = !this.filterEnabled;
    this.sortEnabled = false;
  }

  toggleSort() {
    this.sortClicked.emit();
    this.sortEnabled = !this.sortEnabled;
    this.filterEnabled = false;
  }
  onMaleSelect() {
    this.maleSelected.emit();
  }
  onFemaleSelect() {
    this.femaleSelected.emit();
  }
  onBonusSelected() {
    this.bonusSelected.emit();
  }

  get sieveDisabled() {
    return !this.filterEnabled && !this.sortEnabled;
  }
}
