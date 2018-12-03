import {Injector} from '@angular/core';
import * as _ from 'lodash';
import {PANEL_ID, PANEL_ITEM, TURNOVER_NEGATIVE, TURNOVER_POSITIVE} from './abc.options';
import {EchartsGraphComponent} from './screen/components/echarts-graph.component';
import {TurnOverComponent} from './screen/components/turn-over.component';
import {ViewInfoComponent} from './screen/components/view-info.component';
import {ViewDetailComponent} from './screen/components/view-detail.component';
import {ViewRankComponent} from './screen/components/view-rank.component';
import {CarouselComponent} from './carousel/carousel.component';

export const ComponentTypeCode: Map<string, any> = new Map<string, any>();

ComponentTypeCode.set('0', EchartsGraphComponent);
ComponentTypeCode.set('1', ViewInfoComponent);
ComponentTypeCode.set('2', ViewDetailComponent);
ComponentTypeCode.set('3', ViewRankComponent);

ComponentTypeCode.set('10', TurnOverComponent);
ComponentTypeCode.set('11', CarouselComponent);

export const panelAdapt = (arr: Array<any>, injector: Injector) => {
    const results = [];
    arr.forEach(value => {
        switch (value.comp.type) {
            case '0':
                results.push(_.extend(value.comp, {
                    component: EchartsGraphComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.comp.id
                    }], injector)
                }));
                break;
            case '1':
                results.push(_.extend(value.comp, {
                    component: ViewInfoComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.comp.id
                    }], injector)
                }));
                break;
            case '2':
                results.push(_.extend(value.comp, {
                    component: ViewDetailComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.comp.id
                    }], injector)
                }));
                break;
            case '3':
                results.push(_.extend(value.comp, {
                    component: ViewRankComponent,
                    injector: Injector.create([{
                        provide: PANEL_ID,
                        useValue: value.comp.id
                    }], injector)
                }));
                break;
            case '10':
                let provides = [];
                let children = value.comp.children;
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
                results.push(_.extend(value.comp, {
                    component: TurnOverComponent,
                    injector: Injector.create([...provides], injector)
                }));
                break;
            case '11':
                provides = [];
                children = value.comp.children;
                children.forEach(val => {
                    provides.push({
                        component: ComponentTypeCode.get(val.type),
                        data: {
                            id: val.id
                        }
                    });
                });
                results.push(_.extend(value.comp, {
                    component: CarouselComponent,
                    injector: Injector.create([{
                        provide: PANEL_ITEM,
                        useValue: provides
                    }], injector)
                }));
                break;
            default:
                results.push(value);    // 空值
                break;
        }
    });
    return results;
};
