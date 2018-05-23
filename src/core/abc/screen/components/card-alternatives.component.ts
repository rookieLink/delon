import {Component, OnInit} from '@angular/core';
import {NzModalSubject} from 'ng-zorro-antd';
import * as _ from 'lodash';

@Component({
    template: `
        <div style="background: #ECECEC;padding:30px;">
            <div nz-row [nzGutter]="8">
                <div nz-col [nzSpan]="8" *ngFor="let card of alternatives;">
                    <nz-card class="card-available" (click)="selectCard(card)">
                        <ng-template #body>
                            <i class="anticon anticon-check-circle"
                               style="color: blueviolet;font-size: 22px;position: absolute;right: 7px;top:4px;"
                               *ngIf="card.selected"></i>
                            <i class="anticon anticon-check-circle-o" *ngIf="!card.selected"
                               style="position: absolute;right: 7px;top:4px"></i>
                            <i style="font-size: 45px;" [ngClass]="['anticon','anticon-area-chart']"></i>
                            <p style="height: 50px;">{{card.chartDesc}}</p>
                        </ng-template>
                    </nz-card>
                </div>
            </div>
            <div nz-row>
                <button nz-button (click)="save()">保存</button>
            </div>
        </div>

    `,
    styles: [
            `
            .card-available {
                cursor: pointer;
                background-color: #8bd22f;
                margin-bottom: 5px;
            }
        `
    ]
})
export class CardAlternativesComponent implements OnInit {

    /**
     * 选择项未做去重处理，去重处理请查看home模块下的CardAlternativesComponent
     */

    card;  // 当前替换项
    alts;  // 所有可供选择项
    alternatives = [];  // 扩展了属性的所有可供选择项

    constructor(private nzModelSubject: NzModalSubject) {
    }

    save() {
        this.alternatives.forEach((card) => {
            if (card.selected) {   // 这个card是要替换的内容
                this.card = _.omit(card, ['selected']);
                return;   // break the loop
            }
        });
        this.nzModelSubject.next(this.card);
        this.nzModelSubject.destroy();
    }

    // todo(ccliu): 取消操作
    cancel() {

    }

    selectCard(card) {
        this.alternatives.forEach(val => {
            val.selected = false;
        });
        card.selected = true;
    }

    ngOnInit(): void {

        this.alts.forEach(val => {
            this.alternatives.push(_.extend({selected: false}, val));
        });

    }
}
