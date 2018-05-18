import {Component, Injector, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from './components/card-alternatives.component';
import {DashboardService} from './dashboard.service';
import * as _ from 'lodash';

@Component({
    selector: 'zijin-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

    data: any;   // dynamic created

    requestParams: any;

    @Input() pageId;
    name;
    description;

    openSetting = false;
    setting = false;
    cards;
    tabs;
    alternatives;

    pendingTabs = [];

    constructor(private modal: NzModalService,
                private injector: Injector,
                // private session: SessionService,
                private dashboardService: DashboardService,
                private _message: NzMessageService) {
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
    }


    ngOnInit(): void {

        if (!this.data) {
            this._message.error('data绑定信息失败！');
            return;
        }
        this.pageId = this.data.pageId;
        this.requestParams = this.data.requestParams;

        // 获取当前主页配置
        this.dashboardService.getPageDefById(this.requestParams.getPageDefById)
            .subscribe((data: any) => {
                console.log(data);
                this.cards = data.cards;
                this.tabs = data.tabs;
                // this.name = this.data.name;
                // this.description = this.data.description;
            }, err => {
                this._message.error(err.body.retMsg);
            });
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
    }

    cancel() {
        this.setting = false;
        this.openSetting = false;
    }

    trackByFn(index) {
        return index;
    }


}

