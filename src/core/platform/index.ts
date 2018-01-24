import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';

// region: import
import {AvatarComponent} from './components/avatar/avatar.component';
import {MenuTargetDirective} from './directives/menu-target';
// components
const COMPONENTS = [ AvatarComponent, MenuTargetDirective ];

// pipes
const PIPES = [ ];

// endregion

// region: export
export { MenuBase } from './interfaces/menu';
export { AvatarComponent } from './components/avatar/avatar.component';
export { MenuTargetDirective } from './directives/menu-target';
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
            providers: [
            ]
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: PlatformModule,
            providers: [
            ]
        };
    }
}
