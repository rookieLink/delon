import {Directive, ElementRef, HostListener} from '@angular/core';
import * as screenfull from 'screenfull';

@Directive({selector: '[toggleFullscreen]'})
export class ToggleFullscreenDirective {


    constructor(private el: ElementRef) {
    }

    @HostListener('click')
    onClick() {
        if (screenfull.enabled) {
            // screenfull.request(this.el.nativeElement);
            screenfull.toggle();
        }
    }

}

