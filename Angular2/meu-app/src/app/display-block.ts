import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDisplayBlock]'
})
export class DisplayBlock implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.display = 'block';
  }
}