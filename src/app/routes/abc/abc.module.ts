import {NgModule, SystemJsNgModuleLoader} from '@angular/core';
import {Routes, RouterModule, provideRoutes} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';

import {DemoReuseTabComponent} from './reuse-tab/reuse-tab.component';
import {DemoEllipsisComponent} from './ellipsis/ellipsis.component';
import {DemoReuseTabEditComponent} from './reuse-tab/edit.component';
import {DemoCarouselComponent} from './carousel/carousel.component';
import {TestComponent} from './carousel/test.component';
import {DemoDashboardComponent} from './dashboard/dashboard.component';
import {DemoDashboardService} from './dashboard/dashboard.service';
import {DemoScreenComponent} from './screen/screen.component';
import {ZjCarouselModule, ZjDashboardModule, ZjScreenModule} from '@delon/abc';
import {DemoScreenService} from './screen/screen.service';

const COMPONENTS = [
    DemoReuseTabComponent,
    DemoReuseTabEditComponent,
    DemoDashboardComponent,
    DemoEllipsisComponent,
    DemoScreenComponent,
    DemoCarouselComponent,
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
    {path: 'carousel', component: DemoCarouselComponent},
    {path: 'dashboard', component: DemoDashboardComponent},
    {path: 'screen', component: DemoScreenComponent}
];

@NgModule({
    imports: [
        SharedModule,
        ZjCarouselModule,
        ZjDashboardModule.forRoot(DemoDashboardService),
        ZjScreenModule.forRoot(DemoScreenService),
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
        SystemJsNgModuleLoader,
        provideRoutes([
            {loadChildren: 'app/routes/lazy/nml-lazy.module#NMLLazyModule'}
        ])
    ]
})
export class DEMOABCModule {
}
