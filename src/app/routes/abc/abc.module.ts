import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';

import {DemoReuseTabComponent} from './reuse-tab/reuse-tab.component';
import {DemoEllipsisComponent} from './ellipsis/ellipsis.component';
import {DemoReuseTabEditComponent} from './reuse-tab/edit.component';
import {CarouselComponent} from './carousel/carousel.component';
import {TestComponent} from './carousel/test.component';
import {DemoDashboardComponent} from './dashboard/dashboard.component';
import {DemoDashboardService} from './dashboard/dashboard.service';
import {DemoScreenComponent} from './screen/screen.component';
import {DashboardModule, ScreenModule} from '@delon/abc';
import {DemoScreenService} from './screen/screen.service';
import {SCREENSERVICE} from '@delon/abc/screen/config';

const COMPONENTS = [
    DemoReuseTabComponent,
    DemoReuseTabEditComponent,
    DemoDashboardComponent,
    DemoEllipsisComponent,
    DemoScreenComponent,
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
    {path: 'dashboard', component: DemoDashboardComponent},
    {path: 'screen', component: DemoScreenComponent}
];

@NgModule({
    imports: [
        SharedModule,
        DashboardModule.forRoot(DemoDashboardService),
        ScreenModule.forRoot([{
            provide: SCREENSERVICE,
            useClass: DemoScreenService
        }]),
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
    ]
})
export class DEMOABCModule {
}
