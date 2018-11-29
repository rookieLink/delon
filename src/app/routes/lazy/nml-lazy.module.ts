import {NgModule} from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import {NzDemoDatePickerBasicComponent} from './zarro-antd.component';
import {SharedModule} from '../../shared/shared.module';
import {BasicComponent} from './echarts.component';

@NgModule({
    imports: [
        NgxEchartsModule,
        SharedModule
    ],
    declarations: [
        BasicComponent,
        NzDemoDatePickerBasicComponent
    ],
    entryComponents: [
        BasicComponent,
        NzDemoDatePickerBasicComponent
    ]
})

export class NMLLazyModule {

    paths = {
        'bComponent': NzDemoDatePickerBasicComponent,
        'cComponent': BasicComponent
    };

}
