import {Component, SystemJsNgModuleLoader} from '@angular/core';
import {provideRoutes} from '@angular/router';

@Component({
    selector: 'app-demo-screen',
    template: `
        <zj-screen [splitDisabled]="false"></zj-screen>
    `,
    styles: [`
        :host {
            height: 800px;
        }
    `]
})
export class DemoScreenComponent {


}
