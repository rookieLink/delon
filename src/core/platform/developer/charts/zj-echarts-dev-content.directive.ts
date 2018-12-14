import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
    selector: '[zj-echarts-dev-content]'
})
export class ZjEchartsDevContentDirective implements OnInit {

    @Input() test;

    @Output() jsonData = new EventEmitter<any>();

    @Output() optionData = new EventEmitter<any>();


    el: HTMLElement = this.elementRef.nativeElement;

    constructor(private elementRef: ElementRef, private render: Renderer2) {

    }

    ngOnInit(): void {
        console.log(this.el);
    }

}
