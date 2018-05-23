import {Injector} from '@angular/core';
import * as _ from 'lodash';
import {PANEL_ID, TURNOVER_NEGATIVE, TURNOVER_POSITIVE} from './injectToken';
import {EchartsGraphComponent} from './components/echarts-graph.component';
import {TurnOverComponent} from './components/turn-over.component';
import {ViewInfoComponent} from './components/view-info.component';
import {ViewDetailComponent} from './components/view-detail.component';
import {ViewRankComponent} from './components/view-rank.component';

export const ComponentTypeCode: Map<string, any> = new Map<string, any>();

ComponentTypeCode.set('0', EchartsGraphComponent);
ComponentTypeCode.set('1', ViewInfoComponent);
ComponentTypeCode.set('2', ViewDetailComponent);
ComponentTypeCode.set('3', ViewRankComponent);

ComponentTypeCode.set('10', TurnOverComponent);

export const panelAdapt = (arr: Array<any>, injector: Injector) => {
    const results = [];
    arr.forEach(value => {
        switch (value.type) {
            case '0':
                results.push(_.extend({
                    component: EchartsGraphComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.id
                    }], injector)
                }, value));
                break;
            case '1':
                results.push(_.extend({
                    component: ViewInfoComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.id
                    }], injector)
                }, value));
                break;
            case '2':
                results.push(_.extend({
                    component: ViewDetailComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.id
                    }], injector)
                }, value));
                break;
            case '3':
                results.push(_.extend({
                    component: ViewRankComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.id
                    }], injector)
                }, value));
                break;
            case '10':
                const provides = [];
                const children = value.children;
                children.forEach((val, index) => {
                    if (index === 0) {
                        provides.push({
                            provide: TURNOVER_POSITIVE,
                            useValue: {
                                component: ComponentTypeCode.get(val.type),
                                id: val.id
                            }
                        });
                    } else if (index === 1) {
                        provides.push({
                            provide: TURNOVER_NEGATIVE,
                            useValue: {
                                component: ComponentTypeCode.get(val.type),
                                id: val.id
                            }
                        });
                    }
                });
                results.push(_.extend({
                    component: TurnOverComponent,
                    injector: Injector.create([...provides], injector)
                }, value));
                break;
            default:
                results.push(value);    // 空值
                break;
        }
    });
    return results;
};
