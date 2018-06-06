import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    template: `
        <zj-echarts-dev [chartType]="id"></zj-echarts-dev>
    `,
    styles: [`
        :host {
            height: 500px;
        }
    `]
})
export class DemoEchartsDevComponent {

    id;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = params.id;
            console.log(params);

        });
    }


}
