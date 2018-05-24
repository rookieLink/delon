import {Component, Inject, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {DASHBOARDSERVICE} from './config';
import {DashboardComponent} from './dashboard.component';


@Component({
    selector: 'zj-dashboard',
    template: `
        <zj-carousel [panels]="panels" [zjArrows]="false"></zj-carousel>
    `,
})
export class ZijinDashboardComponent implements OnInit {

    panels = [];

    constructor(private message: NzMessageService,
                @Inject(DASHBOARDSERVICE) private dashboardService) {

    }

    ngOnInit(): void {
        this.dashboardService.getMultiPagesMeta()
            .subscribe(data => {
                const panels = [];
                data.panels.forEach(val => {
                    panels.push({
                        data: {pageId: val.pageId},
                        component: DashboardComponent
                    });
                });
                this.panels = panels;
            });
    }


}
