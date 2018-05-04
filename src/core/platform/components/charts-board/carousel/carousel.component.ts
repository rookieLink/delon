import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

const transformProp = 'transform';

@Component({
    selector: 'carousel-rotate',
    templateUrl: './index.html',
    styleUrls: ['./index.less']
})
export class CarouselComponent implements AfterViewInit {
    $carousel: JQuery;
    private _backfaceInvisible: boolean = true;


    @Input()
    set backfaceInvisible(param: boolean) {
        this._backfaceInvisible = param;
    }

    get backfaceInvisiable(): boolean {
        return this._backfaceInvisible;
    }

    constructor(private _elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.$carousel = $(this._elementRef.nativeElement).find('.carousel');
        this.init(this.$carousel[0]);
    }

    toggle() {
        this.$carousel.toggleClass('show-one');
    }

    private _isHorizontal: boolean = true;

    @Input()
    set setHorizontal(param: boolean) {
        this._isHorizontal = param;
        this.modify();
    }

    get isHorizontal(): boolean {
        return this._isHorizontal;
    }

    @Input()
    set panelCount(param: number) {
        if (param !== this._panelCount) {
            this._panelCount = param;
            this.modify();
        }
    }

    get panelCount() {
        return this._panelCount;
    }

    transformProp = 'transform';
    rotation = 0;
    private _panelCount: number;
    private totalPanelCount: number;
    private element: any;
    private isInited = false;

    init(el) {
        this.isInited = true;
        this.element = el;

        this.rotation = 0;
        this.panelCount = 3;
        this.totalPanelCount = this.element.children.length;

        this.modify();
    }

    private get panelSize(): number {
        return this.element[this.isHorizontal ? 'offsetWidth' : 'offsetHeight'];
    }

    private get rotateFn(): string {
        return this.isHorizontal ? 'rotateY' : 'rotateX';
    }

    private get theta(): number {
        return this.panelCount ? 360 / this.panelCount : 0;
    }

    /**
     * do some trig to figure out how big the carousel is in 3D space
     * @returns {number}
     */
    private get radius(): number {
        return Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.panelCount));
    }


    modify() {
        if (!this.isInited)
            return;

        let panel, angle, i;

        for (i = 0; i < this.panelCount; i++) {
            panel = this.element.children[i];
            angle = this.theta * i;
            panel.style.opacity = 1;
            panel.style.display = 'block';
            // panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
            // rotate panel, then push it out in 3D space
            panel.style[transformProp] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
        }

        // hide other panels
        for (; i < this.totalPanelCount; i++) {
            panel = this.element.children[i];
            panel.style.opacity = 0;
            panel.style.display = 'none';
            panel.style[transformProp] = 'none';
        }

        // adjust rotation so panels are always flat
        this.rotation = Math.round(this.rotation / this.theta) * this.theta;

        this.transform();

    }

    transform() {
        // push the carousel back in 3D space,
        // and rotate it
        this.element.style[transformProp] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    };

    stepBy(increment: number) {
        this.rotation += (this.theta * increment * -1);
        this.transform();
    }

    stepTo(panelNo: number) {
        if (panelNo < 0 || panelNo >= this.panelCount) {
            panelNo = 0;
        }
        this.rotation = (this.theta * panelNo);
        this.transform();
    }
}

/*
function Carousel3D(el) {
    this.element = el;

    this.rotation = 0;
    this.panelCount = 0;
    this.totalPanelCount = this.element.children.length;
    this.theta = 0;

    this.isHorizontal = true;

}

Carousel3D.prototype.modify = function () {

    var panel, angle, i;

    this.panelSize = this.element[this.isHorizontal ? 'offsetWidth' : 'offsetHeight'];
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.theta = 360 / this.panelCount;

    // do some trig to figure out how big the carousel
    // is in 3D space
    this.radius = Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.panelCount));

    for (i = 0; i < this.panelCount; i++) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
        // rotate panel, then push it out in 3D space
        panel.style[transformProp] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    }

    // hide other panels
    for (; i < this.totalPanelCount; i++) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[transformProp] = 'none';
    }

    // adjust rotation so panels are always flat
    this.rotation = Math.round(this.rotation / this.theta) * this.theta;

    this.transform();

};
*/

/*Carousel3D.prototype.transform = function () {
    // push the carousel back in 3D space,
    // and rotate it
    this.element.style[transformProp] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
};

var init = function () {


    var carousel = new Carousel3D(document.getElementById('carousel')),

        panelCountInput = document.getElementById('panel-count'),
        axisButton = document.getElementById('toggle-axis'),
        navButtons = document.querySelectorAll('#navigation button'),

        onNavButtonClick = function (event) {
            var increment = parseInt(event.target.getAttribute('data-increment'));
            carousel.rotation += carousel.theta * increment * -1;
            carousel.transform();
        };

    // populate on startup
    // carousel.panelCount = parseInt( panelCountInput.value, 10);
    // carousel.modify();


    axisButton.addEventListener('click', function () {
        carousel.isHorizontal = !carousel.isHorizontal;
        carousel.modify();
    }, false);

    // panelCountInput.addEventListener( 'change', function( event ) {
    //     carousel.panelCount = event.target.value;
    //     carousel.modify();
    // }, false);

    for (var i = 0; i < 2; i++) {
        navButtons[i].addEventListener('click', onNavButtonClick, false);
    }

    document.getElementById('toggle-backface-visibility').addEventListener('click', function () {
        carousel.element.toggleClassName('panels-backface-invisible');
    }, false);

    // setTimeout( function(){
    //     document.body.addClassName('ready');
    // }, 0);

};*/
