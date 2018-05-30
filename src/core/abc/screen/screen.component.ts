import {Component, Inject, Injector, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from './components/card-alternatives.component';

import * as _ from 'lodash';
import {panelAdapt} from '../componentTypeUtil';
import {SCREENSERVICE} from './config';


@Component({
    selector: 'zj-screen',
    templateUrl: './screen.html',
    styleUrls: ['./screen.less']
})
export class ScreenComponent implements OnInit {

    splitConf = null;
    setting = false;
    openSetting = false;
    fullScreen = false;
    alternatives = []; // 图表选择项

    lCards = [];
    rCards = [];
    cTCards = [];
    cBCards = [];

    @Input() headImg;

    constructor(private injector: Injector,
                private modal: NzModalService,
                @Inject(SCREENSERVICE) private screenService,
                private message: NzMessageService) {
    }

    ngOnInit() {

        this.screenService.getScreenDef()
            .subscribe(screenConfig => {
                // 获取布局settings
                this.splitConf = screenConfig.layout;

                // 获取Components
                this.lCards = panelAdapt(screenConfig.lCards, this.injector);
                this.rCards = panelAdapt(screenConfig.rCards, this.injector);
                this.cTCards = panelAdapt(screenConfig.cTCards, this.injector);
                this.cBCards = panelAdapt(screenConfig.cBCards, this.injector);
            }, err => {
                this.message.error(err.body.retMsg);
            });

        this.screenService.getSelfDefCharts()
            .subscribe((data) => {
                this.alternatives = panelAdapt(data, this.injector);
            }, err => {
                this.message.error(err.body.retMsg);
            });


    }

    cardModal(card) {
        this.modal.open({
            content: CardAlternativesComponent,
            footer: false,
            componentParams: {
                alts: this.alternatives
            }
        }).subscribe(value => {
            if (value.id) {
                if (this.lCards.indexOf(card) !== -1) {
                    this.lCards[this.lCards.indexOf(card)] = value;
                } else if (this.rCards.indexOf(card) !== -1) {
                    this.rCards[this.rCards.indexOf(card)] = value;
                } else if (this.cTCards.indexOf(card) !== -1) {
                    this.cTCards[this.cTCards.indexOf(card)] = value;
                } else if (this.cBCards.indexOf(card) !== -1) {
                    this.cBCards[this.cBCards.indexOf(card)] = value;
                }
            }
        });
    }

    openSettings() {
        this.openSetting = true;
        setTimeout(() => {
            this.splitConf.disabled = false;
            this.setting = true;
            this.openSetting = false;
        }, 50);
    }

    saveSettings() {
        this.openSetting = false;

        this.setting = false;
        this.splitConf.disabled = true;

        this.screenService.updateScreenDef({
            layout: _.omit(this.splitConf, ['disabled']),
            lCards: this.transform(this.lCards),
            rCards: this.transform(this.rCards),
            cTCards: this.transform(this.cTCards),
            cBCards: this.transform(this.cBCards),
        }).subscribe(data => {
            console.log(data);
            this.setting = false;
            this.splitConf.disabled = true;
        }, err => {
            this.message.error(err.body.retMsg);
        });


    }

    onDragEnd(columnindex: number, e: { gutterNum: number, sizes: Array<number> }) {
        console.log('columnindex', columnindex);
        console.log('sizesArray', e.sizes);
        if (columnindex === -1) { // Column dragged
            // Set size for all visible columns
            this.splitConf.lColumn.size = e.sizes[0];
            this.splitConf.cColumn.size = e.sizes[1];
            this.splitConf.rColumn.size = e.sizes[2];
            // this.splitConf.columns.filter(c => c.visible === true).forEach((column, index) => column.size = e.sizes[index]);
        } else if (columnindex === 1) { // Row dragged
            // Set size for all visible rows from specified column
            this.splitConf.lColumn.rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);
        } else if (columnindex === 2) {
            this.splitConf.cColumn.rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);
        } else if (columnindex === 3) {
            this.splitConf.rColumn.rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);

        }

    }

    transform(arr: Array<any>) {
        return _.transform(arr, (result, item: any) => {
            console.log(item);
            if (item.type >= 10) {
                result.push({
                    id: item.id,
                    type: item.type,
                    children: item.children
                });
            } else {
                result.push({
                    id: item.id,
                    type: item.type,
                });
            }
        }, []);
    }

    trackByFn(index) {
        return index;
    }
}
