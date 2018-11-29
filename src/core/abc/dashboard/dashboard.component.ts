import {
    Component,
    EventEmitter,
    Inject,
    Injector,
    Input,
    NgModuleFactory,
    OnInit,
    Optional,
    Output, SystemJsNgModuleLoader
} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from './components/card-alternatives.component';
import * as _ from 'lodash';
import {DASHBOARDSERVICE} from './config';
import {zip} from 'rxjs/observable/zip';
import {catchError} from 'rxjs/operators';

export function checkProperty(obj, prop) {
    if (obj && obj[prop]) {
        return true;
    } else {
        return false;
    }
}

@Component({
    selector: 'zj-single-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.less'],
    providers: [
        SystemJsNgModuleLoader,
    ]
})
export class DashboardComponent implements OnInit {

    data: any;   // dynamic created - 主页驾驶舱使用动态创建组件的方式

    @Input() pageId;    // 开发者模式下直接以组件的selector使用该组件
    @Input() dashboardService = <any>{};    // 外部传递进来的驾驶舱服务实例
    @Input() useExternalModule = false; // 是否使用外部模块的Component
    @Input() externalModulePath: string;

    @Output() onSuccess = new EventEmitter();

    name;   // 组件名称
    description;    // 组件描述

    openSetting = false; // 正在打开驾驶舱配置 - nzSpin
    setting = false;    // 正在编辑驾驶舱
    cards;  // 驾驶舱第一行的配置信息
    tabs;   // 驾驶舱的tabs的配置信息
    alternatives;   // 可供选择的组件

    // 当前驾驶舱配置项
    currentSettings: any;

    pendingTabs = [];   // 所有正在选择的驾驶舱tabs

    lazyModule: NgModuleFactory<any>;   // 外部加载的模块

    constructor(private modal: NzModalService,
                @Inject(DASHBOARDSERVICE) @Optional() dashboardService,
                private injector: Injector,
                private loader: SystemJsNgModuleLoader,
                private _message: NzMessageService) {
        if (dashboardService) {
            this.dashboardService = dashboardService;
        }
    }

    cardModal(card) {
        this.modal.open({
            closable: true,
            title: '请选择图表',
            maskClosable: false,
            footer: false,
            content: CardAlternativesComponent,
            componentParams: {
                card: card,
                cards: this.cards,
                alts: this.alternatives
            }
        }).subscribe(value => {
            if (value.id) {
                this.cards[this.cards.indexOf(card)] = value;
            }
            if (value.c_Name) {
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
        // TODO(ccliu): 需要调用nz-tabset的组件方法来激活新增的选项
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
        this.currentSettings = {
            cards: [].concat(this.cards),
            tabs: [Array.prototype.concat(this.tabs[0]), Array.prototype.concat(this.tabs[1])]
        };
        setTimeout(() => {
            this.setting = true;
            this.openSetting = false;
        }, 500);
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
            if (val.id) {
                homeDef.cards.push({id: val.id});
            } else {
                homeDef.cards.push({c_Name: val.c_Name});
            }
        });

        this.tabs.forEach((tabSet, index) => {
            tabSet.forEach(val => {
                if (val.id) {
                    homeDef.tabs[index].push({id: val.id, name: val.name});
                } else if (val.c_Name) {
                    homeDef.tabs[index].push({c_Name: val.c_Name, name: val.name});
                }
            });
        });

        if (checkProperty(this.dashboardService, 'updatePageDefById')) {
            this.dashboardService.updatePageDefById({
                pageId: this.pageId, homeDef: homeDef
            }).subscribe(() => {
                this.setting = false;
                this.openSetting = false;
                this._message.success('驾驶舱配置成功！');
                this.onSuccess.emit('驾驶舱配置成功');
            }, err => {
                this.openSetting = false;
                this._message.error(err.body.retMsg);
            });
        } else {
            this._message.error('您所传递驾驶舱配置服务有误，\n 请确定其保存的服务名为"updatePageDefById"');
        }
    }

    ngOnInit(): void {

        this.pageId = this.pageId || (this.data && this.data.pageId);

        if (!this.pageId) {
            this._message.error('获取主页id失败！');
            return;
        }

        if (checkProperty(this.dashboardService, 'getPageDefById')
            && checkProperty(this.dashboardService, 'getChartsDef')) {

            this.openSetting = true;
            // todo:没有办法预测这个请求将要执行多长时间,可以用NgZone来提供钩子吗？
            zip(
                this.dashboardService.getPageDefById(this.pageId),
                this.dashboardService.getChartsDef()
            ).pipe(
                // 接收其他拦截器后产生的异常消息
                catchError(([homeConf, cardsDef]) => {
                    return [homeConf, cardsDef];
                })
            ).subscribe(([homeConf, cardsDef]) => {

                this.openSetting = false;

                this.cards = homeConf.homeDef.cards;
                this.tabs = homeConf.homeDef.tabs;
                this.name = homeConf.themeName;
                this.description = homeConf.themeDesc;

                this.alternatives = cardsDef.filter((value) => {
                    return value.type === '0';  // 过滤组件类型，echarts组件类型为'0'
                });

                this.useExternalModule = this.useExternalModule || (this.data && this.data.useExternalModule);
                this.externalModulePath = this.externalModulePath || (this.data && this.data.externalModulePath);
                console.log('是否使用外部模块：' + this.useExternalModule);
                if (this.useExternalModule) {
                    this.loadLazyModule()
                        .then((ngModuleFactory) => {
                            const module = ngModuleFactory.create(this.injector);
                            this.lazyModule = ngModuleFactory;
                            this.cards.forEach((card) => {
                                if (card.c_Name) {
                                    card.component = module.instance.paths[card.c_Name];
                                    card.injector = this.injector;
                                }
                            });
                            this.tabs.forEach((tabs) => {
                                tabs.forEach(tab => {
                                    if (tab.c_Name) {
                                        tab.component = module.instance.paths[tab.c_Name];
                                        tab.injector = this.injector;
                                    }
                                });
                            });
                            this.alternatives.forEach((alt) => {
                                if (alt.c_Name) {
                                    alt.component = module.instance.paths[alt.c_Name];
                                    alt.injector = this.injector;
                                }
                            });
                        }, (err) => {
                            console.log('加载外部模块失败!', err);
                            this._message.error('加载外部模块失败：', err);
                        });
                } else {  // 去除tabs与cards中可能保存的外部组件定义
                    const cards = [], tabs = [], alters = [];
                    this.cards.forEach(card => cards.push(card.id ? card : {}));
                    this.tabs.forEach(tab => tabs.push(tab.filter(t => !!t.id)));
                    this.alternatives.forEach(alt => alt.id ? alters.push(alt) : null);
                    this.cards = cards;
                    this.tabs = tabs;
                    this.alternatives = alters;
                }

            });
        } else {
            this._message.error('您所传递驾驶舱配置服务有误,当前操作是获取当前主页配置与获取可选择内容');
        }

    }

    loadLazyModule() {
        return this.loader.load(this.externalModulePath);
    }

    cancel() {
        this.cards = this.currentSettings.cards;
        this.tabs = this.currentSettings.tabs;
        this.setting = false;
        this.openSetting = false;
    }


    trackByFn(index) {
        return index;
    }


}

