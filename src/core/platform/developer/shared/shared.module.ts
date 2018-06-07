import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularSplitModule} from "angular-split";
import {CommonModule} from "@angular/common";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {NgxEchartsModule} from "ngx-echarts";

import {AceEditorDirective} from "./ace-editor.directive";
import {DynamicComponent} from "./dynamic.component";
import {AdDirective} from "./ad.directive";
import {AgGridModule} from "ag-grid-angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NgxEchartsModule,
        AngularSplitModule,
        AgGridModule.withComponents([])
    ],
    declarations: [
        AceEditorDirective,
        DynamicComponent,
        AdDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NgxEchartsModule,
        AngularSplitModule,
        AgGridModule,

        DynamicComponent,
        AceEditorDirective,
        AdDirective
    ]
})
export class SharedModule {

}
