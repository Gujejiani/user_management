import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  shakeAnimation,
  ShakeAnimationInterface,
} from 'src/app/animations/animations';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss'],
  animations: [shakeAnimation],
})
export class InfoBoxComponent implements ShakeAnimationInterface {
  buttonState: 'void' | 'shake' = 'void';

  onMouseEnter() {
    this.buttonState = 'shake';
  }

  onMouseLeave() {
    this.buttonState = 'void';
  }
  @Input() message = 'No users found';

  @Output() clickAction = new EventEmitter<void>();

  onClick() {
    this.clickAction.emit();
  }
}
