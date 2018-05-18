import {NgModule} from '@angular/core';
import {TabAlternativesComponent} from './components/tab-alternatives.component';
import {CardAlternativesComponent} from './components/card-alternatives.component';
import {DashboardComponent} from './dashboard.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {EchartsGraphComponent} from './components/echarts-graph.component';
import {WarningMessageComponent} from './components/warning-message.component';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        NgxEchartsModule,
    ],
    declarations: [
        DashboardComponent,
        CardAlternativesComponent,
        TabAlternativesComponent,
        EchartsGraphComponent,
        WarningMessageComponent
    ],
    entryComponents: [
        DashboardComponent,
        CardAlternativesComponent,
        TabAlternativesComponent,
        EchartsGraphComponent,
        WarningMessageComponent
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule {

}
