import {Component} from '@angular/core';

@Component({
    selector: 'app-demo-dashboard',
    template: `
        <zj-dashboard></zj-dashboard>
        <!--<zj-single-dashboard [pageId]="'meta-analysis'"></zj-single-dashboard>-->
    `,
    styles: [`
        :host {
            height: 750px;
            background-color: rebeccapurple;
        }
    `]
})
export class DemoDashboardComponent {


}
