import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[disableVisual]',
  standalone: true,
})
export class DisableVisualDirective {
  @Input() set disableVisual(value: boolean) {
    this.setVisualDisabled(value);
  }
  @Input() disableClick!: boolean;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  private setVisualDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', '0.5');
      if (this.disableClick) {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'pointer-events',
          'none'
        );
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'cursor',
          'not-allowed'
        );
      }
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'opacity');
      this.renderer.removeStyle(
        this.elementRef.nativeElement,
        'pointer-events'
      );
      this.renderer.removeStyle(this.elementRef.nativeElement, 'cursor');
    }
  }
}
