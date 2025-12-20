import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddSpacing]'
})
export class AddSpacingDirective implements OnInit {

  @Input() appAddSpacing?: string;

  constructor(private readonly el: ElementRef) { }

  ngOnInit() {
    const spacing  = this.appAddSpacing || '10px';
    this.el.nativeElement.style.marginBottom = spacing;
  }
}
