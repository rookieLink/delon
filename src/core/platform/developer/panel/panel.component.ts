import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'zj-panels-dev',
    templateUrl: './panel.html'
})
export class PanelComponent {

    panels = [
        {
            name: '一般信息',
            face: 'info',
            single: true
        },
        {
            name: '排名信息',
            face: 'rank',
            single: true
        },
        {
            name: '翻转组件',
            face: 'turn-over',
            single: false
        },
        {
            name: '多页组件',
            face: 'multi-face',
            single: false
        }
    ];

    constructor(private router: Router, private route: ActivatedRoute) {

    }

    select(panel) {
        this.router.navigate(['develop/panels', panel.face], {skipLocationChange: true});
    }

}
