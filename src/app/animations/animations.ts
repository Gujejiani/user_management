import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

type stateTypes = 'void' | 'shake';
export interface ShakeAnimationInterface {
  buttonState: stateTypes;
  onMouseEnter(): void;
  onMouseLeave(): void;
}

export const shakeAnimation = trigger('shakeAnimation', [
  state(
    'shake',
    style({
      transform: 'translateX(0)',
    })
  ),
  transition('void => shake', [
    animate('0.2s', style({ transform: 'translateX(-5px)' })),
    animate('0.2s', style({ transform: 'translateX(5px)' })),
    animate('0.2s', style({ transform: 'translateX(-5px)' })),
    animate('0.2s', style({ transform: 'translateX(0)' })),
  ]),
]);
