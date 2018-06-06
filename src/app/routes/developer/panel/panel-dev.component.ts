import {Component} from "@angular/core";

@Component({
    template: `
        <zj-dynamic-comp></zj-dynamic-comp>
    `,
    styles: [`
        :host {
            position: relative;
            display: block;
            height: 700px;
            width: 100%;
        }
    `]
})
export class DemoPanelDevComponent {

}
