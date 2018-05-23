import {Component} from '@angular/core';
import {DashboardComponent} from '@delon/abc/dashboard/dashboard.component';

@Component({
    selector: 'app-demo-dashboard',
    template: `
        <zijin-dashboard [panels]="homeConfig"></zijin-dashboard>
    `,
    styles: [`
        :host {
            height: 800px;
        }
    `]
})
export class DemoDashboardComponent {


    homeConfig = [
        {
            data: {
                pageId: 'meta-analysis',
            },
            component: DashboardComponent
        },
        {
            data: {
                pageId: 'meta-analysis',
            },
            component: DashboardComponent
        },
        {
            data: {
                pageId: 'meta-analysis',
            },
            component: DashboardComponent
        }
    ];


}
