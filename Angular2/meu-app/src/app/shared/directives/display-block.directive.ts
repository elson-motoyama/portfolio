import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDisplayBlock]'
})
export class DisplayBlockDirective implements OnInit {

  constructor(private readonly el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.display = 'block';
  }
}