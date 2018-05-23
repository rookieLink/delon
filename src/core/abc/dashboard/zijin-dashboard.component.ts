import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
    selector: 'zijin-dashboard',
    template: `
        <zijin-carousel [panels]="panels" [zjArrows]="false"></zijin-carousel>
    `,
})
export class ZijinDashboardComponent implements OnInit {

    @Input() panels;

    constructor(private message: NzMessageService) {

    }

    ngOnInit(): void {
        if (!this.panels) {
            this.panels = [];
            this.message.error('驾驶舱初始化失败！');
        }
    }


}
