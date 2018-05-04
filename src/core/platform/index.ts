import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// region: import
import { AvatarComponent } from './components/avatar/avatar.component';
import { MenuTargetDirective } from './directives/menu-target';
import { ButtonTargetDirective } from './directives/button-target';
import { CubeRotateComponent } from './components/charts-board/cube/cube.component';
import { CardFlipComponent } from './components/charts-board/card/card.component';
import { CarouselComponent } from './components/charts-board/carousel/carousel.component';
// components
const COMPONENTS = [AvatarComponent,
    MenuTargetDirective,
    ButtonTargetDirective,
    CubeRotateComponent, CardFlipComponent, CarouselComponent];

// pipes
const PIPES = [];

// endregion

// region: export
export { MenuBase } from './interfaces/menu';
export { AvatarComponent } from './components/avatar/avatar.component';
export { MenuTargetDirective } from './directives/menu-target';
export { ButtonTargetDirective } from './directives/button-target';

// endregion


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...COMPONENTS,
        ...PIPES
    ],
    exports: [
        ...COMPONENTS,
        ...PIPES
    ]
})
export class PlatformModule {

    static forRoot(options?: any): ModuleWithProviders {
        return {
            ngModule: PlatformModule,
            providers: []
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: PlatformModule,
            providers: []
        };
    }
}
