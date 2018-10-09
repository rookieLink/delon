import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as _ from 'lodash';


@Component({
    selector: 'tab-alt',
    template: `

        <div class="masonry">
            <div class="item" *ngFor="let tab of alternatives;" (click)="selectTab(tab)">
                <div class="item__content">
                    <i class="anticon anticon-check-circle"
                       style="color: blueviolet;font-size: 22px;position: absolute;right: 7px;top:4px;"
                       *ngIf="tab.selected"></i>
                    <i class="anticon anticon-check-circle-o" *ngIf="!tab.selected"
                       style="position: absolute;right: 7px;top:5px;"></i>
                    <i style="font-size: 45px;" [ngClass]="['anticon','anticon-area-chart']"></i>
                    <h3>
                        {{tab.name}}
                    </h3>
                    <p>
                        {{tab.describe}}
                    </p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .masonry {
            column-count: 4;
            column-gap: 0;
            counter-reset: item-counter;
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
            text-align:center;
            box-sizing: border-box;
            color: rgb(114, 0, 38);
            background-color: rgba(175, 213, 82, 0.66);
        }

        .item__content:hover {
            background: rgba(172, 235, 19, 0.7);
        }

    `]
})
export class TabAlternativesComponent implements OnInit {


    @Input() alts;  // 所有项
    @Input() index; // 当前打开的tab在HomeComponent.tabs的索引HomeComponent.tabs[index.1][index.0]
    @Output() tabSelect = new EventEmitter<any>();
    alternatives = []; // 扩展了selected属性的所有可供选择项

    constructor() {
    }


    ngOnInit(): void {
        if (this.alts) {
            this.alts.forEach(val => {
                this.alternatives.push(_.extend({selected: false}, val));
            });
        }
    }

    selectTab(tab) {
        this.alternatives.forEach(value => {
            value.selected = false;
        });
        tab.selected = true;
        this.tabSelect.emit({
            index: this.index,
            tab: _.omit(tab, ['selected'])
        });
    }

}



