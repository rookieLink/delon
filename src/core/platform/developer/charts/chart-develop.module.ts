import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import {ChartDevelopComponent} from './chart-develop.component';
import {EchartsDevComponent} from './echarts.dev.component';
import {CHARTDEVSERVICE} from './config';
import {ZjEchartsDevContentDirective} from './zj-echarts-dev-content.directive';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ChartDevelopComponent,
        EchartsDevComponent,
        ZjEchartsDevContentDirective
    ],
    providers: [
    ],
    entryComponents: [
        EchartsDevComponent
    ],
    exports: [
        EchartsDevComponent,
        ChartDevelopComponent,
        ZjEchartsDevContentDirective
    ]
})
export class ChartDevelopModule {
    static forRoot(ClassForChartService): ModuleWithProviders {
        return {
            ngModule: ChartDevelopModule,
            providers: [
                {provide: CHARTDEVSERVICE, useClass: ClassForChartService},
            ]
        };
    }
}
