import {Component, Inject, Injector, Input, Optional} from '@angular/core';
import {
    PANEL_ID,
    TURNOVER_NEGATIVE, TURNOVER_POSITIVE,
} from '../../abc.options';

// 该组件所包含的正反两面的组件没有交互关系
@Component({
    selector: 'turn-over',
    template: `
        <div class="zijin-flip-container">
            <div class="zijin-card" [ngStyle]="flipped">
                <div class="front" (click)="setFlipped()">
                    <ng-container *ngComponentOutlet="comps[0]?.component;injector:comps[0]?.injector;"></ng-container>
                </div>
                <div class="back" (click)="setFlipped()">
                    <ng-container *ngComponentOutlet="comps[1].component;injector:comps[1]?.injector;"></ng-container>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .zijin-flip-container {
            height: 100%;
            position: relative;
            perspective: 800px;
        }

        .zijin-card {
            width: 100%;
            height: 100%;
            position: absolute;
            transform-style: preserve-3d;
            transition: transform 1s;
        }

        .zijin-card .front,
        .zijin-card .back {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: rotateX(0deg);
            backface-visibility: hidden;
            -moz-backface-visibility: hidden;
        }

        .zijin-card .back {
            transform: rotateY(180deg);
        }

        .zijin-card.flipped {
            transform: rotateY(180deg);
        }

    `]
})
export class TurnOverComponent {


    @Input() comps = [
        // GeneralRankingComponent,
        // GeneralDetailComponent
    ];

    flipped = null;

    constructor(private injector: Injector,
                @Inject(TURNOVER_POSITIVE) @Optional() c1,
                @Inject(TURNOVER_NEGATIVE) @Optional() c2) {
        console.log(c1);
        console.log(c2);

        if (!this.comps.length) {
            this.comps.push(...[
                {
                    component: c1 ? c1.component : null,
                    injector: Injector.create([
                        {
                            provide: PANEL_ID,
                            useValue: c1 ? c1.id : null
                        }
                    ], this.injector)
                },
                {
                    component: c2 ? c2.component : null,
                    injector: Injector.create([
                        {
                            provide: PANEL_ID,
                            useValue: c2 ? c2.id : null
                        }
                    ], this.injector)
                }
            ]);
        }
    }

    setFlipped() {
        if (!this.flipped) {
            this.flipped = {transform: 'rotateY(180deg)'};
        } else {
            this.flipped = null;
        }
    }

}


