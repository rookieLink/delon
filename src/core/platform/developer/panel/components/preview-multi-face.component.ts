import {Component, OnInit} from '@angular/core';


// 该组件所包含的正反两面的组件没有交互关系
@Component({
    template: `
        <zj-carousel [panels]="panels"></zj-carousel>
    `,
    styles: [
            `
            :host {
                background-color: rebeccapurple;
                height: 500px;
                width: 500px;
                display: block;
            }
        `
    ]
})
export class PreviewMultiFaceComponent implements OnInit {

    pages;

    panels = [];

    ngOnInit(): void {
        console.log(this.pages);
        this.pages.forEach(val => {
            this.panels.push({
                component: val.component,
                data: {id: val.cid}
            });
        });
    }
}


