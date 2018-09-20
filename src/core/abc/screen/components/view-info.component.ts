import {Component, Inject, Input, OnChanges, OnInit, Optional} from '@angular/core';
import {PANEL_ID} from '../../abc.options';
import {SCREENSERVICE} from '../config';

@Component({
    selector: 'view-info',
    template: `
         <div [ngStyle]="meta.style">
            <ng-container *ngFor="let l of meta.lines">
                <div [ngStyle]="l.style">
                    <ng-container *ngFor="let d of l.data">
                        <span [ngStyle]="d.style">
                            {{payload[d.field] || d.literal}}
                        </span>
                    </ng-container>
                </div>
            </ng-container>
        </div>
    `
})
export class ViewInfoComponent implements OnInit, OnChanges {

    @Input() meta;
    @Input() payload;

    constructor(@Inject(PANEL_ID) @Optional() private id,
                @Inject(SCREENSERVICE) private screenService) {
    }

    ngOnInit(): void {

        console.log(this.meta);


        if (this.meta) {
            this.meta = {...this.meta};
        } else {
            this.meta = {};
        }

        if (this.payload) {
            this.payload = {...this.payload};
        } else {
            this.payload = {};
        }

        // 根据组件的ID获取组件的定义与数据
        if (this.id) {
            this.screenService.getOptionAndDataById(this.id)
                .subscribe((data: any) => {
                    this.meta = JSON.parse(data.element.optionMsg);
                    this.payload = data.element.dataMsg.data[0] || {};
                });
        }

    }

    ngOnChanges() {
        if (this.payload instanceof Array) {
            this.payload = this.payload[0];
        }
    }

}

