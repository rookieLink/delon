import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ZjDeveloperRootModule} from "@delon/platform/developer";

import {SharedModule} from '../../shared/shared.module';
import {ChartsComponent} from "./charts/charts.component";
import {DemoEchartsDevComponent} from "./charts/echarts-dev.component";
import {DemoPanelDevComponent} from "./panel/panel-dev.component";
import {DemoPanelsComponent} from "./panel/panels.component";


const routes: Routes = [
    {path: 'charts', component: ChartsComponent},
    {path: 'charts/:id', component: DemoEchartsDevComponent},
    {path: 'panels', component: DemoPanelsComponent},
    {path: 'panels/:id', component: DemoPanelDevComponent},
];

@NgModule({
    imports: [
        SharedModule,
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
