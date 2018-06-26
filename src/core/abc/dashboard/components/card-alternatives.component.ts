import {Component, OnInit} from '@angular/core';
import {NzModalSubject} from 'ng-zorro-antd';
import * as _ from 'lodash';

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

        <div nz-row>
            <button nz-button (click)="save()" [nzSize]="'large'">保存</button>
        </div>

    `,
    styles: [`
        .masonry {
            column-count: 4;
            column-gap: 0;
            counter-reset: item-counter;
            margin-top: 20px;
            cursor: pointer;
            background-color: #af82c259;
        }

        .item {
            box-sizing: border-box;
            break-inside: avoid;
            padding: 10px;
            counter-increment: item-counter;
        }

        .item__content {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            box-sizing: border-box;
            color: #720026;
            background-color: #afd552a8;
        }

        .item__content.card-available:hover {
            background: #aceb13b3;
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
