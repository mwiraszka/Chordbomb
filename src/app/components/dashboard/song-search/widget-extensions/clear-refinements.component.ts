import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectClearRefinements } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'custom-clear-refinements',
  template: `
    <button class="primary" (click)="state.refine()"> Clear </button>
  `
})
export class ClearRefinementsComponent extends BaseWidget {
  public state: {
     hasRefinements: boolean;
     refine: Function;
     createURL: Function;
     widgetParams: object;
  };
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('ClearRefinements');
  }
  ngOnInit() {
    this.createWidget(connectClearRefinements, {
      attribute: this.autoHideContainer
    });
    super.ngOnInit();
  }
}
