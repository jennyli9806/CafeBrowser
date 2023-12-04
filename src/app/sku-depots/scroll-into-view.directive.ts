import {
  Directive,
  ElementRef,
  Input,
 
} from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]',
})
export class ScrollIntoViewDirective {
  @Input('appScrollIntoView') public platform: number;

  constructor(private el: ElementRef<HTMLElement>) {}

  public scrollIntoView() {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block:'end'});
  }
}
