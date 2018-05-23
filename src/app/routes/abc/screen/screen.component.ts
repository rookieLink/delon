import {Component} from '@angular/core';
import {DemoScreenService} from './screen.service';

@Component({
    selector: 'app-demo-screen',
    template: `
        <zijin-screen></zijin-screen>
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


    screenConfig = [
        {
            data: {
                pageId: 'meta-analysis',
                screenService: this.screenService
            },
        }
    ];


}
