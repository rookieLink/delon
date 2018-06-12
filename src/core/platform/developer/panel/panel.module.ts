import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";

import {SingleFaceComponent} from './components/single-face.component';
import {MultiFaceComponent} from './components/multi-face.component';
import {PanelAlternativesComponent} from './components/panel-alternatives.component';
import {PreviewMultiFaceComponent} from './components/preview-multi-face.component';
import {PanelComponent} from "./panel.component";
import {TurnoverComponent} from "./components/turnover.component";
import {ZjCarouselModule, ZjScreenModule} from "@delon/abc";
import {PANELDEVSERVICE} from "./config";

const COMPONENTS = [
    PanelComponent,
    SingleFaceComponent,
    TurnoverComponent,
    MultiFaceComponent,
    PanelAlternativesComponent,
    PreviewMultiFaceComponent
];

@NgModule({
    imports: [
        SharedModule,
        ZjCarouselModule,
        ZjScreenModule  // 用到大屏展现预览的组件
    ],
    declarations: [
        ...COMPONENTS
    ],
    entryComponents: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    providers: []
})
export class PanelDevelopModule {
    static forRoot(ClassForPanelService): ModuleWithProviders {
        return {
            ngModule: PanelDevelopModule,
            providers: [
                {provide: PANELDEVSERVICE, useClass: ClassForPanelService},
            ]
        };
    }
}
