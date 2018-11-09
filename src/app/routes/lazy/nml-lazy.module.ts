import {NgModule} from '@angular/core';
import {NMLAComponent} from './a.component';
import {BasicComponent} from './echart.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {NzDemoDatePickerBasicComponent} from './zarro-antd.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        NgxEchartsModule,
        SharedModule
    ],
    declarations: [
        NMLAComponent,
        BasicComponent,
        NzDemoDatePickerBasicComponent
    ],
    entryComponents: [
        NMLAComponent,
        BasicComponent,
        NzDemoDatePickerBasicComponent
    ]
})

export class NMLLazyModule {

    paths = {
        'aComponent': NMLAComponent,
        'bComponent': BasicComponent,
        'cComponent': NzDemoDatePickerBasicComponent
    };

}
