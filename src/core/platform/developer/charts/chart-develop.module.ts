import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";

import {ChartDevelopService} from './chart-develop.service';
import {ChartDevelopComponent} from './chart-develop.component';
import {EchartsDevComponent} from './echarts.dev.component';
import {CHARTDEVSERVICE} from "./config";


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ChartDevelopComponent,
        EchartsDevComponent,
    ],
    providers: [
        ChartDevelopService,
    ],
    entryComponents: [
        EchartsDevComponent
    ],
    exports: [
        EchartsDevComponent,
        ChartDevelopComponent
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
