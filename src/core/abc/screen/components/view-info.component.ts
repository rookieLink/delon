import {Component, Inject, Injector, Input, OnChanges, OnInit, Optional} from '@angular/core';
import {PANEL_ID} from '../../abc.options';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'view-info',
    template: `
        <div *ngFor="let f of meta" [ngStyle]="f.lineStyle">
            <span [ngStyle]="f.prefixStyle" *ngIf="f.prefix">
                {{f.prefix}}
            </span>
            <span [ngStyle]="f.dataStyle" *ngIf="f.data">
                {{payload[f.data]}}
            </span>
            <span [ngStyle]="f.suffixStyle" *ngIf="f.suffix">
                {{f['suffix']}}
            </span>
        </div>
    `
})
export class ViewInfoComponent implements OnInit, OnChanges {

    @Input() meta;
    @Input() payload;

    constructor(@Inject(PANEL_ID) @Optional() private id,
                injector: Injector,
                private http: HttpClient) {
    }

    ngOnInit(): void {


        if (this.meta) {
            this.meta = [].concat(this.meta);
        } else {
            this.meta = [];
        }

        if (this.payload) {
            this.payload = {...this.payload};
        } else {
            this.payload = {};
        }

        // 根据组件的ID获取组件的定义与数据
        if (this.id) {
            this.http.get('system/v1/chart/' + this.id)
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

