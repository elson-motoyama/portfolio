import { Delay } from './delay';
import { TemplateRef, ViewContainerRef } from '@angular/core';

describe('DelayDirective', () => {
  it('should create an instance', () => {
    const mockTemplateRef = {} as TemplateRef<any>;
    const mockViewContainerRef = {} as ViewContainerRef;

    const directive = new Delay(mockTemplateRef, mockViewContainerRef);
    expect(directive).toBeTruthy();
  });
});
