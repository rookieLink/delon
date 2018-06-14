import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChartDevelopModule, PanelDevelopModule, ZjDeveloperRootModule} from "@delon/platform/developer";

import {SharedModule} from '../../shared/shared.module';
import {ChartsComponent} from "./charts/charts.component";
import {DemoEchartsDevComponent} from "./charts/echarts-dev.component";
import {DemoPanelDevComponent} from "./panel/panel-dev.component";
import {DemoPanelsComponent} from "./panel/panels.component";
import {EchartsDevService} from "./charts/echarts-dev.service";
import {PanelsDevService} from "./panel/panel-dev.service";
import {ZjScreenModule} from "@delon/abc";
import {ScreenDevService} from "./screen-dev.service";


const routes: Routes = [
    {path: 'charts', component: ChartsComponent},
    {path: 'charts/:id', component: DemoEchartsDevComponent},
    {path: 'panels', component: DemoPanelsComponent},
    {path: 'panels/:id', component: DemoPanelDevComponent},
];

@NgModule({
    imports: [
        SharedModule,
        ChartDevelopModule.forRoot(EchartsDevService),
        PanelDevelopModule.forRoot(PanelsDevService),
        ZjScreenModule.forRoot(ScreenDevService),
        ZjDeveloperRootModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ChartsComponent,
        DemoEchartsDevComponent,
        DemoPanelDevComponent,
        DemoPanelsComponent,
    ],
    entryComponents: []
})
export class DeveloperModule {
}
