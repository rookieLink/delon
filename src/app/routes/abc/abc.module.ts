import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';

import {DemoReuseTabComponent} from './reuse-tab/reuse-tab.component';
import {DemoEllipsisComponent} from './ellipsis/ellipsis.component';
import {DemoReuseTabEditComponent} from './reuse-tab/edit.component';
import {CarouselComponent} from './carousel/carousel.component';
import {TestComponent} from './carousel/test.component';
import {DemoDashboardComponent} from './dashboard/dashboard.component';
import {DashboardService} from './dashboard/dashboard.service';

const COMPONENTS = [
    DemoReuseTabComponent,
    DemoReuseTabEditComponent,
    DemoDashboardComponent,
    DemoEllipsisComponent,
    CarouselComponent,
    TestComponent
];

const routes: Routes = [
    {path: 'reuse-tab', component: DemoReuseTabComponent, data: {title: 'R-title', reuseTitle: 'R-reuseTitle'}},
    {
        path: 'reuse-tab/:id',
        component: DemoReuseTabEditComponent,
        data: {reuse: true, reuseClosable: false, title: 'edit title'}
    },
    {path: 'ellipsis', component: DemoEllipsisComponent},
    {path: 'carousel', component: CarouselComponent},
    {path: 'dashboard', component: DemoDashboardComponent}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        TestComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DEMOABCModule {
}
