import {Component} from '@angular/core';
import {DashboardComponent} from '@delon/abc/dashboard/dashboard.component';

@Component({
    selector: 'app-demo-dashboard',
    template: `
        <zijin-carousel [panels]="homeConfig" [zjArrows]="false"></zijin-carousel>
    `,
    styles: [`
        :host {
            height: 600px;
        }
    `]
})
export class DemoDashboardComponent {


    homeConfig = [
        {
            data: {
                pageId: 'meta-analysis',
                requestParams: {
                    getPageDefById: {},
                    updatePageDefById: {},
                    getChartsDef: {},
                    getOptionAndDataById: {}
                }
            },
            component: DashboardComponent
        },
        {
            data: {
                pageId: 'meta-analysis',
                requestParams: {
                    getPageDefById: {},
                    updatePageDefById: {},
                    getChartsDef: {},
                    getOptionAndDataById: {}
                }
            },
            component: DashboardComponent
        },
        {
            data: {
                pageId: 'meta-analysis',
                requestParams: {
                    getPageDefById: {},
                    updatePageDefById: {},
                    getChartsDef: {},
                    getOptionAndDataById: {}
                }
            },
            component: DashboardComponent
        }
    ];


}
