import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";

import {SingleFaceComponent} from './components/single-face.component';
import {MultiFaceComponent} from './components/multi-face.component';
import {PanelAlternativesComponent} from './components/panel-alternatives.component';
import {PreviewMultiFaceComponent} from './components/preview-multi-face.component';
import {PanelComponent} from "./panel.component";
import {TurnoverComponent} from "./components/turnover.component";
import {AngularSplitModule} from "angular-split";
import {ZjCarouselModule, ZjScreenModule} from "@delon/abc";

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
        ZjScreenModule
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

}
