import {Component, Inject, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {DevInit} from './init-consant';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {PANELDEVSERVICE} from '../config';

export const TypeCode: Map<string, any> = new Map<string, any>();
TypeCode.set('info', 1);
TypeCode.set('detail', 2);
TypeCode.set('rank', 3);

@Component({
    selector: 'single-face',
    templateUrl: './single-face.html',
    styles: [
        `
            :host {
                padding: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            split split-area {
                height: 100%;
            }

        `
    ]
})
export class SingleFaceComponent implements OnInit {

    faceType;   // 面的类型：info、detail、rank


    availableServices;
    availableFields;

    formModel = {
        componentMsg: {
            name: null,
            describe: null,
            type: null,
        },
        modelMsg: {
            measureRows: [],
            service: null
        },
        optionMsg: null,
    };

    _payload;

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


    constructor(@Inject(PANELDEVSERVICE) private panelService,
                private message: NzMessageService,
                private activeRoute: ActivatedRoute) {
        this.faceType = this.activeRoute.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {

        this.formModel.optionMsg = DevInit.get(this.faceType).optionMsg;
        this._payload = DevInit.get(this.faceType).payload;

        this.panelService.qryAllServiceList()
            .subscribe(serviceList => {
                this.availableServices = serviceList;
            }, err => {
                console.log(err);
            });
    }

    selectService(service) {
        this.availableFields = service.returnParam;
    }

    getJsonData() {
        const params = _.extend({
            chartType: TypeCode.get(this.faceType),
            dimensionRows: [],
            measureRows: this.formModel.modelMsg.measureRows,
        }, this.formModel.modelMsg.service);

        this.panelService.preview(params)
            .subscribe(jsonData => {
                console.log(jsonData);
                this._payload = jsonData;
            });
    }

    preview() {
        if (this.aceConfig.text) {
            try {
                this.formModel.optionMsg = JSON.parse(this.aceConfig.text);
            } catch (e) {
                this.message.error(e);
                console.log(e);
            }
        }
    }

    save() {
        this.formModel.componentMsg.type = TypeCode.get(this.faceType);
        const params = _.cloneDeep(this.formModel);
        _.extend(params.modelMsg, params.modelMsg.service);
        console.log(params);
        this.panelService.save(params)
            .subscribe(data => {
                console.log(data);
                this.message.success(data.retMsg);
            }, err => {
                this.message.error(err.body.retMsg);
            });
    }


    get optionMsg() {
        return JSON.stringify(this.formModel.optionMsg, null, 2);
    }

    get payload() {
        return JSON.stringify(this._payload, null, 2);
    }

}
