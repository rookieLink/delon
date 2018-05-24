import {Component} from '@angular/core';
import {DemoScreenService} from './screen.service';

@Component({
    selector: 'app-demo-screen',
    template: `
        <zj-screen></zj-screen>
    `,
    styles: [`
        :host {
            height: 800px;
        }
    `],
    providers: [
        DemoScreenService
    ]
})
export class DemoScreenComponent {

    constructor(public screenService: DemoScreenService) {

    }
}
