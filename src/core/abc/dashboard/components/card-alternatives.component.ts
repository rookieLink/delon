import {Component, OnInit} from '@angular/core';
import {NzModalSubject} from 'ng-zorro-antd';
import * as _ from 'lodash';

/**
 * 瀑布流布局方式，请参考https://www.w3cplus.com/css/pure-css-create-masonry-layout.html
 */

@Component({
    template: `
        <div class="masonry">
            <div class="item" *ngFor="let card of alternatives;" (click)="selectCard(card)">
                <div class="item__content"
                     [ngClass]="{'card-nonavailable': !card.available,'card-available':card.available}">
                    <i class="anticon anticon-check-circle"
                       style="color: blueviolet;font-size: 22px;position: absolute;right: 7px;top:4px;"
                       *ngIf="card.selected"></i>
                    <i class="anticon anticon-check-circle-o" *ngIf="!card.selected"
                       style="position: absolute;right: 7px;top:5px;"></i>
                    <i style="font-size: 45px;" [ngClass]="['anticon','anticon-area-chart']"></i>
                    <h3>
                        {{card.name}}
                    </h3>
                    <p>
                        {{card.describe}}
                    </p>
                </div>
            </div>
        </div>
         <div nz-row style="margin-top: 15px;text-align: center;">
            <button nz-button nzType="primary" [nzSize]="'large'" (click)="save()" style="width: 100px;">确定</button>
        </div>
    `,
    styles: [`
        .masonry {
            column-count: 4;
            column-gap: 0;
            counter-reset: item-counter;
            margin-top: 10px;
            cursor: pointer;
            background-color:rgba(175, 130, 194, 0.35);
        }

        .item {
            box-sizing: border-box;
            break-inside: avoid;
            padding: 10px;
            counter-increment: item-counter;
        }

        .item__content {
            position: relative;
            font-size: 20px;
            box-sizing: border-box;
            text-align:center;
            color: #720026;
            background-color: rgba(175, 213, 82, 0.66);
        }

        .item__content.card-available:hover {
            background: rgba(172, 235, 19, 0.7);
        }

        .card-nonavailable {
            background-color: darkslategray;
        }

    `]
})
export class CardAlternativesComponent implements OnInit {

    card;  // 当前替换项
    cards; // 已选择项
    alts;  // 所有可供选择项
    alternatives = [];  // 扩展了属性的所有可供选择项

    constructor(private nzModelSubject: NzModalSubject) {
    }

    save() {
        this.alternatives.forEach((card) => {
            if (card.available && card.selected) {   // 这个card是要替换的内容
                card.available = false;
                this.card = _.omit(card, ['available', 'selected']);
                return;   // break the loop
            }
        });
        this.nzModelSubject.next(this.card);
        this.nzModelSubject.destroy();
    }

    selectCard(card) {
        if (!card.available) {
            return;
        }
        this.alternatives.forEach(val => {
            if (val.available) {
                val.selected = false;
            }
        });
        card.selected = true;
    }

    ngOnInit(): void {

        this.alts.forEach(val => {
            this.alternatives.push(_.extend({available: true, selected: false}, val));
        });

        this.cards.forEach(card => {
            this.alternatives.forEach(c => {
                if (card.id === c.id) {
                    c.selected = true;
                    c.available = false;
                }
                if (c.id === this.card.id) {
                    c.available = true;
                }
            });
        });

    }
}
