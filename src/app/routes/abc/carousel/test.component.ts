import {Component} from '@angular/core';

@Component({

    template: `
        {{data | json}}
    `,
    styles: [`
        :host {
            color: #ffffff;
        }
    `]
})
export class TestComponent {
    data;

    constructor() {
    }

}
