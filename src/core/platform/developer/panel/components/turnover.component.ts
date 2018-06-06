import {Component, Inject, Injector, Input, OnInit, Optional} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from "@delon/abc/screen/components/card-alternatives.component";

// 该组件所包含的正反两面的组件没有交互关系
@Component({
    selector: 'dev-turnover',
    template: `
        <form nz-form #form="ngForm">
            <div nz-row>
                <div nz-col [nzMd]="8" [nzSm]="12" [nzXs]="24">
                    <div nz-form-item nz-row>
                        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
                            <label [attr.for]="'name'" nz-form-item-required>组件名称</label>
                        </div>
                        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
                            <nz-input [nzSize]="'large'" [(ngModel)]="formModel['name']" [nzId]="'name'"
                                      name="name"></nz-input>
                        </div>
                    </div>
                </div>
                <div nz-col [nzMd]="8" [nzSm]="12" [nzXs]="24">
                    <div nz-form-item nz-row>
                        <div nz-form-label nz-col [nzSpan]="6">
                            <label>组件描述</label>
                        </div>
                        <div nz-form-control nz-col [nzSpan]="14">
                            <nz-input [nzSize]="'large'" name="describe"
                                      [(ngModel)]="formModel['describe']"></nz-input>
                        </div>
                    </div>
                </div>
                <div nz-col [nzMd]="8" [nzSm]="12" [nzXs]="24">
                    <div nz-form-item nz-row>
                        <div nz-form-control nz-col [nzSpan]="14" [nzOffset]="6">
                            <button nz-button [nzSize]="'large'" [nzType]="'primary'" (click)="preview()">预览</button>
                            <button nz-button [nzSize]="'large'" [nzType]="'primary'" 
                                    (click)="save()">
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div nz-row [nzGutter]="8">
            <div nz-col [nzSpan]="8" style="background-color: #eef0f330">
                <div style="font-size:20px; font-weight:bold">请选择A面组件:</div>
                <nz-card class="card-available" *ngFor="let card of positiveAlternatives;"
                         (click)="positiveSelectCard(card)">
                    <ng-template #body>
                        <i class="anticon anticon-check-circle"
                           style="color: blueviolet;font-size: 22px;position: absolute;right: 7px;top:4px;"
                           *ngIf="card['selected']"></i>
                        <i class="anticon anticon-check-circle-o" *ngIf="!card.selected"
                           style="position: absolute;right: 7px;top:4px"></i>
                        <i style="font-size: 45px;" [ngClass]="['anticon','anticon-area-chart']"></i>
                        <p style="height: 50px;">{{card.chartDesc}}</p>
                    </ng-template>
                </nz-card>
            </div>
            <div nz-col [nzSpan]="8">
              <div style="font-size:20px; font-weight:bold;text-align:center;">预览效果图</div>
                <div class="zijin-flip-container">
                    <div class="zijin-card" [ngStyle]="flipped">
                        <div class="front" (click)="setFlipped()">
                            <ng-container
                                *ngComponentOutlet="children[0]?.component;injector:children[0]?.injector;"></ng-container>
                        </div>
                        <div class="back" (click)="setFlipped()">
                            <ng-container
                                *ngComponentOutlet="children[1]?.component;injector:children[1]?.injector;"></ng-container>
                        </div>
                    </div>
                </div>
            </div>
            <div nz-col [nzSpan]="8" style="background-color: #eef0f330">
                <div style="font-size:20px; font-weight:bold">请选择B面组件:</div>
                <nz-card class="card-available" (click)="negativeSelectCard(card)"
                         *ngFor="let card of negativeAlternatives;">
                    <ng-template #body>
                        <i class="anticon anticon-check-circle"
                           style="color: blueviolet;font-size: 22px;position: absolute;right: 7px;top:4px;"
                           *ngIf="card['selected']"></i>
                        <i class="anticon anticon-check-circle-o" *ngIf="!card.selected"
                           style="position: absolute;right: 7px;top:4px"></i>
                        <i style="font-size: 45px;" [ngClass]="['anticon','anticon-area-chart']"></i>
                        <p style="height: 50px;">{{card.chartDesc}}</p>
                    </ng-template>
                </nz-card>
            </div>
        </div>
    `,
    styles: [
            `
            .zijin-flip-container {
                height: 400px;
                width: 400px;
                margin: 0 auto;
                background-color: #eef0f330;
            }

            .card-available {
                cursor: pointer;
                background-color: #8bd22f;
                margin-bottom: 5px;
                width: 100px;
                float: left;
            }
        `
    ]
})
export class TurnoverComponent implements OnInit {


    children = [];

    flipped = null;

    positiveAlternatives;
    negativeAlternatives;

    formModel = {
        name: '',
        describe: ''
    };

    cardModal: CardAlternativesComponent;

    constructor(private injector: Injector,
                private message: NzMessageService) {

    }

    positiveSelectCard(card) {
        this.positiveAlternatives.forEach(value => {
            value.selected = false;
        });
        card.selected = true;
    }

    negativeSelectCard(card) {
        this.negativeAlternatives.forEach(value => {
            value.selected = false;
        });
        card.selected = true;
    }

    ngOnInit(): void {
        // this.screenDev.getSelfDefCharts()
        //     .subscribe((data) => {
        //         console.log(data);
        //         const alts = data['retList'] || [];
        //         const alternatives = [];
        //         alts.forEach(value => {
        //             if (value.type === 10 || value.type === 11) {
        //
        //             } else {
        //                 alternatives.push(value);
        //             }
        //         });
        //         this.positiveAlternatives = panelAdapt(alternatives, this.injector);
        //         this.negativeAlternatives = panelAdapt(alternatives, this.injector);
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //     });
    }


    setFlipped() {
        if (!this.flipped) {
            this.flipped = {transform: 'rotateY(180deg)'};
        } else {
            this.flipped = null;
        }
    }

    preview() {
        this.children.length = 0;
        this.positiveAlternatives.forEach(value => {
            if (value.selected) {
                this.children[0] = value;
            }
        });
        this.negativeAlternatives.forEach(value => {
            if (value.selected) {
                this.children[1] = value;
            }
        });
    }

    save() {
        const children = [];
        this.children.forEach(value => {
            children.push({id: value.id, type: value.type});
        });
        if ( this.formModel.name == null || this.formModel.name === '') {
            this.message.warning('请输入组件名称！');
            return;
        }
        if (children.length <= 1) {
            this.message.warning('请选择A/B组件名称！');
            return;
        }
        const params = {
            componentMsg: {
                name: this.formModel.name,
                type: '10',
                icon: null,
                describe: this.formModel.describe,
            },
            modelMsg: '',
            optionMsg: children
        };
        //
        // this.screenDev.save(params)
        //     .subscribe(data => {
        //         this.message.success(data.retMsg);
        //         console.log(data);
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //     });
    }


}


