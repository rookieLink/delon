import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CHARTTYPEMAPPING} from './charts.config';
import {ChartDevelopService} from './chart-develop.service';
import {NzMessageService} from 'ng-zorro-antd';
import {NzModalSubject} from 'ng-zorro-antd';

import * as _ from 'lodash';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/clouds';
import 'brace/mode/json';

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

    constructor(private chartService: ChartDevelopService,
                private nzModal: NzModalSubject,
                private route: ActivatedRoute,
                private message: NzMessageService) {
    }

    ngOnInit() {

        // this.chartService.queryServiceList()
        //     .subscribe(data => {
        //         this.availableServices = data['retList'];
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //     });


        this.payload = CHARTTYPEMAPPING[this.chartType].payload;
        this.aceConfig.text = CHARTTYPEMAPPING[this.chartType].text;

        this.preview();


    }

    selectService(service) {
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
        // this.chartService.preview(params)
        //     .subscribe(data => {
        //         console.log(data);
        //         this.payload = data['element'];
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //         console.log(err);
        //     });
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
        // delete this.formModel.modelMsg.service;
        const params = _.extend({optionMsg: this.aceConfig.text}, this.formModel);
        console.log(params);
        // this.chartService.save(params)
        //     .subscribe(data => {
        //         console.log(data);
        //         this.message.success('图表保存成功！');
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //         console.log(err);
        //     });
    }

}
