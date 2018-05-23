import {Component, EventEmitter, Inject, Injector, Input, OnInit, Optional, Output} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from './components/card-alternatives.component';
import * as _ from 'lodash';
import {DashboardService, DASHBOARDSERVICE} from './config';

@Component({
    selector: 'zijin-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.less']
})
export class DashboardComponent implements OnInit {

    data: any;   // dynamic created

    dashboardService: DashboardService;
    pageId;
    name;
    description;

    openSetting = false;
    setting = false;
    cards;
    tabs;
    alternatives;

    pendingTabs = [];

    constructor(private modal: NzModalService,
                @Inject(DASHBOARDSERVICE) dashboardService,
                private injector: Injector,
                private _message: NzMessageService) {
        this.dashboardService = dashboardService;
    }

    cardModal(card) {
        this.modal.open({
            content: CardAlternativesComponent,
            footer: false,
            componentParams: {
                card: card,
                cards: this.cards,
                alts: this.alternatives
            }
        }).subscribe(value => {
            if (value.id) {
                this.cards[this.cards.indexOf(card)] = value;
            }
        }, () => {

        });
    }

    deleteCard(i) {
        this.cards[i] = {};
    }

    openPanel(i, r) {
        this.tabs[r][i] = {
            name: '请选择...',
            pending: true
        };
    }

    swap(i, r) {
        let index = -1;
        this.pendingTabs.forEach((val, idx) => {
            if (val.index[0] === i && val.index[1] === r) {
                this.tabs[r][i] = val.tab;
                index = idx;
            }
        });
        if (index !== -1) {
            this.pendingTabs.splice(index, 1);
        }
    }

    deleteTab(i, r) {
        let index = -1;
        this.pendingTabs.forEach((val, idx) => {
            if (val.index[0] === i && val.index[1] === r) {
                index = idx;
            }
        });
        if (index !== -1) {
            this.pendingTabs.splice(index, 1);
        }

        this.tabs[r].splice(i, 1);
    }

    addTab(r) {
        this.tabs[r].push(
            {
                name: '请选择...',
                pending: true
            }
        );
        // 需要调用nz-tabset的组件方法来激活新增的选项
    }

    selectTab(evt) {
        _.forEachRight(this.pendingTabs, (val, idx) => {
            if (val.index[0] === evt.index[0] && val.index[1] === evt.index[1]) {
                this.pendingTabs.splice(idx, 1);
            }
        });
        this.pendingTabs.push({
            tab: evt.tab,
            index: evt.index
        });
    }

    openSettings() {
        this.openSetting = true;
        setTimeout(() => {
            this.setting = true;
            this.openSetting = false;
        }, 50);
    }

    /**
     * 1.过滤pending为true的tab
     * 2.保存设置到服务端
     */
    saveSetting() {
        this.openSetting = true;

        for (let l = this.tabs[0].length - 1; l >= 0; l--) {
            if (this.tabs[0][l].pending === true) {
                this.tabs[0].splice(l, 1);
            }
        }
        for (let l = this.tabs[1].length - 1; l >= 0; l--) {
            if (this.tabs[1][l].pending === true) {
                this.tabs[1].splice(l, 1);
            }
        }

        const homeDef = {
            cards: [],
            tabs: [[], []]
        };

        this.cards.forEach(val => {
            homeDef.cards.push({id: val.id});
        });

        this.tabs.forEach((tabSet, index) => {
            tabSet.forEach(val => {
                homeDef.tabs[index].push({id: val.id, name: val.name});
            });
        });

        if (this.dashboardService.updatePageDefById) {
            this.dashboardService.updatePageDefById(homeDef)
                .subscribe(data => {
                    this.setting = false;
                    this.openSetting = false;
                    localStorage.setItem('homeDef', JSON.stringify(homeDef));
                    this._message.success('驾驶舱配置成功！');
                }, err => {
                    this.openSetting = false;
                    this._message.error(err.body.retMsg);
                });
        } else {
            this._message.error('您所传递驾驶舱配置服务有误，\n 请确定其保存的服务名为"updatePageDefById"');
        }


    }


    ngOnInit(): void {

        if (!this.data) {
            this._message.error('data绑定信息失败！');
            return;
        }
        this.pageId = this.data.pageId;

        if (this.dashboardService.getPageDefById) {
            // 获取当前主页配置
            this.dashboardService.getPageDefById(this.pageId)
                .subscribe((data: any) => {
                    console.log(data);
                    this.cards = data.cards;
                    this.tabs = data.tabs;
                    // this.name = this.data.name;
                    // this.description = this.data.description;
                }, err => {
                    this._message.error(err.body.retMsg);
                });
        } else {
            this._message.error('您所传递驾驶舱配置服务有误，\n 请确定其获取页面配置信息的服务名为"getPageDefById"');
        }

        if (this.dashboardService.getChartsDef) {
            // 获取可选择内容
            this.dashboardService.getChartsDef({orgNo: '0000'})
                .subscribe((data) => {
                    const list = data['retList'] || [];
                    this.alternatives = list.filter((value) => {
                        return value.type === '0';
                    });
                }, err => {
                    this._message.error(err.body.retMsg);
                });
        } else {
            this._message.error('您所传递驾驶舱配置服务有误，\n 请确定其获取所有图表配置信息的服务名为"getChartsDef"');
        }
    }

    cancel() {
        this.setting = false;
        this.openSetting = false;
    }

    trackByFn(index) {
        return index;
    }


}

