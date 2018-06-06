import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[panel-host]'
})
export class AdDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
