import {
    Component, ComponentFactoryResolver, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges,
    ViewChild
} from '@angular/core';
import {PanelItem} from './panel-item';
import {PanelDirective} from './panel.directive';
import {PanelComponent} from './panel.component';
import {PANEL_ITEM} from '../abc.options';

@Component({
    selector: 'zj-carousel',
    template: `
        <div class="carousel slide">
            <ol class="carousel-indicators" *ngIf="(panels.length !== 1) && zjDots">
                <li [ngClass]="{'active':i===currentPanelIndex}" (click)="active(i)"
                    *ngFor="let c of panels;index as i;"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active moveToLeft">
                    <ng-template panel-host></ng-template>
                </div>
            </div>
            <a class="carousel-control-prev" (click)="prev()" *ngIf="zjArrows">
                <span class="anticon anticon-left"></span>
            </a>
            <a class="carousel-control-next" (click)="next()" *ngIf="zjArrows">
                <span class="anticon anticon-right"></span>
            </a>
        </div>
    `,
    styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit, OnChanges {

    currentPanelIndex = 0;
    @Input() zjArrows = true;
    @Input() zjDots = true;
    @Input() zjAutoPlay = false;

    @Input() panels: PanelItem[];
    @ViewChild(PanelDirective) panelHost: PanelDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                @Inject(PANEL_ITEM) @Optional() panels: PanelItem[]) {
        this.panels = this.panels || panels;
    }

    loadComponent() {
        console.log('loading component');
        this.currentPanelIndex = this.currentPanelIndex % this.panels.length;
        const panelItem = this.panels[this.currentPanelIndex];

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(panelItem.component);

        const viewContainerRef = this.panelHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<PanelComponent>componentRef.instance).data = panelItem.data;
    }


    ngOnInit(): void {

        if (!this.panels || this.panels.length === 0) {
            return;
        }
        this.loadComponent();

        if (this.zjAutoPlay) {
            // todo(ccliu): 轮播内容
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('-----------');
        if (!this.panels || this.panels.length === 0) {
            return;
        }
        this.loadComponent();
    }

    active(i: number) {
        this.currentPanelIndex = i;
        this.loadComponent();
    }

    next() {
        ++this.currentPanelIndex;
        this.loadComponent();
    }

    prev() {
        this.currentPanelIndex = this.currentPanelIndex > 0 ? this.currentPanelIndex - 1 : this.panels.length - 1;
        this.loadComponent();
    }

}
