import {Component, OnInit} from '@angular/core';
import {NzModalSubject} from 'ng-zorro-antd';
import * as _ from 'lodash';

/**
 * 瀑布流布局方式，请参考https://www.w3cplus.com/css/pure-css-create-masonry-layout.html
 */

@Component({
    template: `

          <div nz-row [nzGutter]="8">
            <div nz-col [nzSpan]="8" *ngFor="let card of alternatives;" style="text-align: center;">
              <nz-card [ngClass]="{'card-nonavailable': !card.available,'card-available':card.available}" 
                     (click)="selectCard(card)">
                  <ng-template #body>
                    <i class="anticon anticon-check-circle" *ngIf="card.selected"></i>
                    <i class="anticon anticon-check-circle-o" *ngIf="!card.selected"></i>
                    <i style="font-size: 45px;" [ngClass]="['anticon',card.icon]"></i>
                    <div style="font-size: 18px;font-weight: bold;">{{card.name}}</div>
                    <p>{{card.describe}}</p>
                  </ng-template>
              </nz-card>
            </div>
          </div>
         <div nz-row style="margin-top: 15px;text-align: center;">
            <button nz-button nzType="primary" [nzSize]="'large'" (click)="save()" style="width: 100px;">确定</button>
        </div>
    `,
    styles: [`

        .card-available {
            height:160px;
            cursor: pointer;
            background-color: #8bd22f;
            margin-bottom: 5px;
        }
        .card-nonavailable {
            height:160px;
            background-color: #5f8686
;
        }
        
        .anticon.anticon-check-circle{
            color: blueviolet;
            font-size: 22px;
            position: absolute;
            right: 7px;
            top:4px;
        }
        
        .anticon.anticon-check-circle-o{
            position: absolute;
            right: 7px;
            top:5px;
        }

    `]
})
export class CardAlternativesComponent implements OnInit {

    card;  // 当前替换项
    cards; // 已选择项
    alts;  // 所有可供选择项
    alternatives = [];  // 扩展了属性的所有可供选择项

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

    constructor(private nzModelSubject: NzModalSubject) {
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
            val.icon = val.icon || 'anticon-pie-chart';
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
