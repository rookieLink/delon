import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {PANEL_ID} from '../injectToken';
import {SCREENSERVICE} from '../config';

@Component({
    selector: 'chart-view',
    template: `
        <div echarts [options]="option" style="height: 99%;"></div>
    `
})
export class EchartsGraphComponent implements OnInit {

    data: any;
    @Input() pid;
    @Input() option;
    payload;

    // 注入图表的id值
    constructor(@Inject(PANEL_ID) @Optional() private id,
                @Inject(SCREENSERVICE) private screenService) {
    }

    ngOnInit(): void {
        const id = this.id || this.pid || this.data.id;
        if (id) {
            this.screenService.getOptionAndDataById(id)
                .subscribe(data => {
                    console.log(data);
                    if (data['element']) {
                        this.payload = data['element'].dataMsg;
                        const legend = this.payload.legend,
                            dimensionList = this.payload.dimensionList,
                            measureList = this.payload.measureList,
                            that = this;
                        try {
                            eval(data['element'].optionMsg);    // TODO(ccliu): 如果禁止使用eval，那么服务器应该需要生成js文件
                        } catch (e) {
                            console.log(e);
                        }
                    } else {

                    }
                }, (err) => {
                    console.log(err);
                });
        } else if (this.option) {
            console.log('option bind!');
        } else {
            console.log('图表初始化失败，未获取到任何id');
        }
    }
}
