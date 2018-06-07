import {Component, Input, ViewChild} from '@angular/core';
import {CHARTS} from './charts.config';
import {EchartsDevComponent} from './echarts.dev.component';
import {Router} from '@angular/router';


@Component({
    selector: 'zj-chart-dev',
    templateUrl: 'chart-develop.html',
    styleUrls: ['chart-develop.less']
})
export class ChartDevelopComponent {

    @Input() devRoute;

    charts = CHARTS;
    icon;
    @ViewChild(EchartsDevComponent) Echart: EchartsDevComponent;

    constructor(private router: Router) {
    }

    select(item) {
        this.router.navigate([this.devRoute, item.no]); // link parameters array
    }


}
