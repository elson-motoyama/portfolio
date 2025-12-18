import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]',
  standalone: true
})
export class Delay {
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appDelay(milliseconds: number) {
    this.viewContainer.clear();

    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }, milliseconds);
  }
}
