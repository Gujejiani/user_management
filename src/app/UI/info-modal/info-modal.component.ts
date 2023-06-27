import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent {
  @Input() message = 'something went wrong';

  @Input() error = false;

  @Output() clickAction = new EventEmitter<void>();

  onClick() {
    this.clickAction.emit();
  }
}
