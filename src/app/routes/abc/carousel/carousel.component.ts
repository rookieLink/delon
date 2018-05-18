import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ReuseTabService} from '@delon/abc';
import {TestComponent} from './test.component';

@Component({
    selector: 'app-demo-carousel',
    template: `
        <zijin-carousel [panels]="homeConfig" [zjArrows]="false"></zijin-carousel>
    `,
    styles: [`
        :host {
            height: 200px;
            width: 200px;
            margin: 0 auto;
            background-color: #4d4d4c;
        }
    `]
})
export class CarouselComponent implements OnInit {

    homeConfig: any;

    constructor(private srv: ReuseTabService, private router: Router) {
    }

    ngOnInit() {
        this.homeConfig = [
            {
                data: {},
                component: TestComponent
            },
            {
                data: {pageId: 'meta-analysis2'},
                component: TestComponent
            },
            {
                data: {pageId: 'meta-analysis'},
                component: TestComponent
            }
        ];
    }
}
