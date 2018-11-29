import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'home-chart',
    template: `
        <div echarts [options]="option" *ngIf="!chartInitFailed"></div>
        <div class="echarts-init-failed" *ngIf="chartInitFailed"></div>
    `,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
            display: block;
        }

        .echarts-init-failed {
            z-index: -1;
            height: 99%;
            position: absolute;
            top: -19%;
            left: 39%;
            content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAENJREFUeF7tzbEJACEQRNGBLeAasBCza2lLEGx0CxFGG9hBMDDxRy/72O9FMnIFapGylsu1fgoBdkXfUHLrQgdfrlJN1BdYBjQQm3UAAAAASUVORK5CYII=)
        }

        div:first-child {
            height: 99%;
            overflow: hidden;
        }
    `]
})
export class EchartsGraphComponent implements OnInit, OnChanges {

    @Input() id;   // 图表的id值
    @Input() dashboardService;

    option: any;
    payload: any;

    chartInitFailed = false;

    echartsRendered = false;

    constructor(private  message: NzMessageService) {
    }

    ngOnInit(): void {
        /**
         * 如果是以modal层弹出来，组件的id设置的行为和@Input一样吗？
         */

        if (!this.echartsRendered) {
            this.renderView();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.renderView();
    }

    renderView() {
        if (this.id) {
            this.echartsRendered = true;
            if (this.dashboardService.getOptionAndDataById) {
                this.dashboardService.getOptionAndDataById(this.id)
                    .subscribe(data => {
                        if (data['element']) {
                            this.payload = data['element'].dataMsg;
                            const legend = this.payload.legend,
                                dimensionList = this.payload.dimensionList,
                                measureList = this.payload.measureList,
                                that = this;
                            try {
                                eval(data['element'].optionMsg);
                            } catch (e) {
                                console.log(e);
                                this.message.error(e);
                            }
                        } else {
                            this.chartInitFailed = true;
                            this.message.error('获取数据失败');
                        }
                    }, err => {
                        this.chartInitFailed = true;
                        this.message.error(err.body.retMsg);
                    });
            } else {
                this.message.error('您所传递驾驶舱配置服务有误，\n 请确定其获取图表数据信息的服务名为"getOptionAndDataById"');
            }
        }
    }
}
