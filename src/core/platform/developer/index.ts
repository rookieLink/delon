export * from './charts/chart-develop.module';
export * from './panel/panel.module';
export * from './shared/shared.module';
export * from './detail-query/detail-query.module';


import {NgModule} from "@angular/core";
import {SharedModule} from "./shared/shared.module";
import {ChartDevelopModule} from "./charts/chart-develop.module";
import {PanelDevelopModule} from "./panel/panel.module";
import {DetailQueryModule} from "./detail-query/detail-query.module";


@NgModule({
    imports: [
        SharedModule,
        ChartDevelopModule,
        PanelDevelopModule,
        DetailQueryModule,

    ],
    exports: [
        SharedModule,
        ChartDevelopModule,
        PanelDevelopModule,
        DetailQueryModule,
    ]
})
export class ZjDeveloperRootModule {

}
