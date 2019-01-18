export * from './shared/shared.module';
export * from './charts/chart-develop.module';
export * from './panel/panel.module';


import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {ChartDevelopModule} from './charts/chart-develop.module';
import {PanelDevelopModule} from './panel/panel.module';

@NgModule({
    imports: [
        SharedModule,
        ChartDevelopModule,
        PanelDevelopModule,
    ],
    exports: [
        SharedModule,
        ChartDevelopModule,
        PanelDevelopModule,
    ]
})
export class ZjDeveloperRootModule {

}
