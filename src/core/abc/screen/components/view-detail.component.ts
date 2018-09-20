import {Component, Inject, Input, OnChanges, OnInit, Optional} from '@angular/core';
import {PANEL_ID} from '../../abc.options';
import {HttpClient} from '@angular/common/http';
import {SCREENSERVICE} from '../config';

@Component({
    selector: 'view-detail',
    template: `
        <div [ngStyle]="meta.style">
            <div nz-row *ngFor="let f  of meta.fields;" [ngStyle]="f.style">
                <span nz-col [nzSpan]="tailSpanLength">
                    <!--图标-->
                </span>
                <span nz-col [nzSpan]="tailSpanLength">
                    {{f.desc}} {{payload[f.data]}}
                </span>
            </div>
        </div>
    `,
    styles: [
            `
            div[nz-row] {
                font-size: 16px;
                height: 40px;
                line-height: 39px;
                text-align: center;
            }

            div[nz-row]:hover {
                background-color: #3e4e5a;
                cursor: pointer;
            }

        `
    ]
})
export class ViewDetailComponent implements OnInit, OnChanges {

    tailSpanLength;

    @Input() payload;
    @Input() meta = {
        fields: [],
        style: {}
    };

    constructor(@Inject(PANEL_ID) @Optional() private id,
                private http: HttpClient,
                @Inject(SCREENSERVICE) private screenService) {
    }

    ngOnInit(): void {
        if (this.id) {
            this.screenService.getOptionAndDataById(this.id)
                .subscribe((data: any) => {
                    this.meta = JSON.parse(data.element.optionMsg);
                    this.payload = data.element.dataMsg.data[0] || {};
                });
        }

        if (this.meta) {
            this.meta = {...this.meta};
        } else {
            this.meta = {
                fields: [],
                style: {}
            };
        }

        if (this.payload) {
            this.payload = {...this.payload};
        } else {
            this.payload = {};
        }
    }


    ngOnChanges() {
        if (this.payload instanceof Array) {
            this.payload = this.payload[0];
        }
    }
}
