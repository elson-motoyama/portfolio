import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]',
  standalone: true
})
export class DelayDirective {
  
  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef
  ) {}

  @Input() set appDelay(milliseconds: number) {
    this.viewContainer.clear();

    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }, milliseconds);
  }
}
