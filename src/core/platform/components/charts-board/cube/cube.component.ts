import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'cube-rotate',
    templateUrl: './index.html',
    styleUrls: ['./index.less']
})
export class CubeRotateComponent implements AfterViewInit {
    $cube: JQuery;
    private _face = 'show-front';

    @Input('face')
    set face(param: string) {
        console.log(param);
        this._face = param;
    }

    get face(): string {
        return this._face;
    }

    constructor(private _elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.$cube = $(this._elementRef.nativeElement).find('.cube');
    }
}
