import { AfterViewInit, Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
    selector: 'card-flip',
    templateUrl: './index.html',
    styleUrls: ['./index.less']
})
export class CardFlipComponent implements AfterViewInit {
    @Input() effect: string = '';
    $element: JQuery;
    $card: JQuery;

    constructor(private _elementRef: ElementRef) {
        this.$element = $(this._elementRef.nativeElement);
    }

    ngAfterViewInit() {
        this.$card = this.$element.find('.card');
        if (this.effect) {
            this.$card.addClass('effect');
        }
    }

    @HostListener('click', ['$event'])
    toggle() {
        this.$card.toggleClass('flipped');
    }
}
