import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-demo-chart',
    template: `
        <zj-chart-dev [devRoute]="'develop/charts'"></zj-chart-dev>
    `,
    styles: [`
        :host {
            height: 600px;
            width: 100%;
            margin: 0 auto;
        }
    `]
})
export class ChartsComponent {


    constructor() {

    }
}
