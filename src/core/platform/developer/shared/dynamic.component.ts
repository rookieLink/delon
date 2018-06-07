import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdDirective} from './ad.directive';
import {DevComponentTypeCode} from "../util";
import {PanelComponent} from "../../../abc/carousel/panel.component";

@Component({
    selector: 'zj-dynamic-comp',
    template: `
        <ng-template panel-host></ng-template>
    `
})
export class DynamicComponent implements OnInit, AfterViewInit {

    @ViewChild(AdDirective) adHost: AdDirective;

    panelItem; // 开发组件的类型

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private router: Router,
                private activeRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        const componentId = this.activeRoute.snapshot.paramMap.get('id');
        this.panelItem = DevComponentTypeCode.get(componentId);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            console.log(this.panelItem);
            console.log(this.panelItem);
            console.log(this.panelItem);
            if (!this.panelItem) return;

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.panelItem.component);

            const viewContainerRef = this.adHost.viewContainerRef;
            viewContainerRef.clear();

            const componentRef = viewContainerRef.createComponent(componentFactory);

            if (this.panelItem.data) {
                (<PanelComponent>componentRef.instance).data = this.panelItem.data;
            }


        }, 0);
    }

}
