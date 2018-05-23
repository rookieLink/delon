import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AngularSplitModule} from 'angular-split';
import {ScreenComponent} from './screen.component';
import {CardAlternativesComponent} from './components/card-alternatives.component';
import {TurnOverComponent} from './components/turn-over.component';
import {EchartsGraphComponent} from './components/echarts-graph.component';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ViewInfoComponent} from './components/view-info.component';
import {ViewDetailComponent} from './components/view-detail.component';
import {ViewRankComponent} from './components/view-rank.component';
import {CarouselModule} from '../carousel';
import {SCREENSERVICE} from './config';

const COMPONENTS = [
    ScreenComponent,
    CardAlternativesComponent,
    TurnOverComponent,
    EchartsGraphComponent,
    ViewInfoComponent,
    ViewDetailComponent,
    ViewRankComponent
];

@NgModule({
    imports: [
        CommonModule,
        NgxEchartsModule,
        NgZorroAntdModule,
        PerfectScrollbarModule,
        CarouselModule,
        AngularSplitModule
    ],
    declarations: [
        ...COMPONENTS,
    ],
    entryComponents: [
        ...COMPONENTS
    ],
    exports: [
        ScreenComponent
    ]
})
export class ScreenModule {
    static forRoot(providers: Provider[]): ModuleWithProviders {
        return {
            ngModule: ScreenModule,
            providers: providers
        };
    }
}
