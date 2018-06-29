import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CHARTTYPEMAPPING} from './charts.config';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';

import * as _ from 'lodash';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/clouds';
import 'brace/mode/json';
import {CHARTDEVSERVICE} from './config';

@Component({
    selector: 'zj-echarts-dev',
    templateUrl: './echarts.dev.html',
    styles: [`
        :host {
            height: 100%;
            width: 100%;
            position: relative;
            background-color: #eeeeee;
        }
    `]
})
export class EchartsDevComponent implements OnInit {

    @Input() chartType;
    @Input() Modify = false;
    @Input() chartId;

    formModel = {
        modelMsg: {
            service: null,
            dimensionRows: [],  // 维度字段目前只可以选择一个
            measureRows: []
        },
        componentMsg: {
            icon: '',
            subject: '',  // 组件主题
            name: '',  // 组件名称
            describe: '', // 组件描述
            type: 0,
        }
    };
    aceConfig = {
        text: '',
        mode: 'javascript',
        theme: 'clouds',
        readOnly: false,
        textChanged: (text) => {
            this.aceConfig.text = text;
        },
        options: {
            printMargin: false
        }
    };

    payload;
    option;
    availableServices;  // 可供选择的服务
    availableFields;    // 可供选择的字段（度量/维度）

    public data: any;

    @ViewChild('aceJson') aceJson$: ElementRef;

    constructor(@Inject(CHARTDEVSERVICE) private chartService,
                private nzModal: NzModalSubject,
                private route: ActivatedRoute,
                private message: NzMessageService) {
    }

    ngOnInit() {
        if (this.Modify) {
            const params1 = {chartId: this.chartId};
            const params2 = {id: this.chartId};
            this.chartService.qryChartDataInfo(params1)
                .subscribe(data => {
                    if (data['retCode'] === '00000') {
                        this.payload = data['retData']['dataMsg'];
                        this.aceConfig.text = data['retData']['optionMsg'];
                        this.preview();
                    }
                }, (error) => {
                    this.message.error(error.body.retMsg);
                });
            this.chartService.qryChartFormInfo(params2)
                .subscribe(data => {
                    if (data['retCode'] === '00000') {
                        this.formModel.componentMsg = data['retData']['componentMsg'];
                        this.formModel.modelMsg.service = data['retData']['modelMsg']['service']['serviceName'];
                        this.formModel.modelMsg.dimensionRows = data['retData']['modelMsg']['dimensionRows'];
                        this.formModel.modelMsg.measureRows = data['retData']['modelMsg']['measureRows'];
                    }
                }, (error) => {
                    this.message.error(error.body.retMsg);
                });
        } else {
            this.payload = CHARTTYPEMAPPING[this.chartType].payload;
            this.aceConfig.text = CHARTTYPEMAPPING[this.chartType].text;
            this.preview();

            this.chartService.qryAllServiceList()
                .subscribe(dataList => {
                    console.log(dataList);
                    this.availableServices = dataList;
                }, err => {
                    this.message.error(err.body.retMsg);
                });
        }
    }

    selectService(service) {
        console.log(service);
        if (service) {
            this.availableFields = service.returnParam;
        } else {
            this.availableFields = [];
        }
        this.formModel.modelMsg.dimensionRows.length = 0;
        this.formModel.modelMsg.measureRows.length = 0;
    }

    getJsonData() {
        const params = _.extend(
            _.omit(this.formModel.modelMsg, ['service']),
            _.omit(this.formModel.modelMsg.service, ['returnParam'])
        );
        console.log(params);
        this.chartService.preview(params)
            .subscribe(data => {
                console.log(data);
                this.payload = data;
            }, err => {
                this.message.error(err.body.retMsg);
                console.log(err);
            });
    }


    preview() {
        const legend = this.payload.legend,
            dimensionList = this.payload.dimensionList,
            measureList = this.payload.measureList,
            that = this;
        try {
            eval(this.aceConfig.text);
        } catch (e) {
            console.log(e);
            console.log(e.message);
            console.log(e.name);
            this.message.error(e.message);
        }
    }

    get _payload() {
        return JSON.stringify(this.payload, null, '  ');
    }

    save() {
        this.formModel.modelMsg.service = _.omit(this.formModel.modelMsg.service, 'requestParam', 'returnParam', 'serviceRspExp');
        this.formModel.modelMsg = _.extend(this.formModel.modelMsg, this.formModel.modelMsg.service);
        const params = _.extend({optionMsg: this.aceConfig.text}, this.formModel);
        console.log(params);
        this.chartService.save(params)
            .subscribe(data => {
                console.log(data);
                this.message.success('图表保存成功！');
            }, err => {
                this.message.error(err.body.retMsg);
                console.log(err);
            });
    }

}
