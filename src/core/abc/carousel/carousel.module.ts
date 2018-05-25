import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CarouselComponent} from './carousel.component';
import {PanelDirective} from './panel.directive';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
    ],
    declarations: [
        CarouselComponent,
        PanelDirective
    ],
    entryComponents: [
        CarouselComponent
    ],
    exports: [
        CarouselComponent
    ]
})
export class ZjCarouselModule {

}
