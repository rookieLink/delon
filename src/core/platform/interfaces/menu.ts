import { HostBinding, ElementRef } from '@angular/core';

export abstract class MenuBase {
    @HostBinding('class.custom-tile-menu') custom = true;

    $element: JQuery;

    constructor(_elementRef: ElementRef) {
        this.$element = $(_elementRef.nativeElement);
    }
}


