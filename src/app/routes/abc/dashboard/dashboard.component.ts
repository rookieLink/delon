import {Component} from '@angular/core';
import {DashboardComponent} from '@delon/abc/dashboard/dashboard.component';
import {DashboardService} from './dashboard.service';

@Component({
    selector: 'app-demo-dashboard',
    template: `
        <zijin-carousel [panels]="homeConfig" [zjArrows]="false"></zijin-carousel>
    `,
    styles: [`
        :host {
            height: 800px;
        }
    `]
})
export class DemoDashboardComponent {

    constructor(public dashboardService: DashboardService) {

    }


    homeConfig = [
        {
            data: {
                pageId: 'meta-analysis',
                dashboardService: this.dashboardService
            },
            component: DashboardComponent
        },
        {
            data: {
                pageId: 'meta-analysis',
                dashboardService: this.dashboardService
            },
            component: DashboardComponent
        },
        {
            data: {
                pageId: 'meta-analysis',
                dashboardService: this.dashboardService
            },
            component: DashboardComponent
        }
    ];


}
