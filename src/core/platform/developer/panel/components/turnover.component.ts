import {Component, Inject, Injector, Input, OnInit, Optional} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from "../../../../abc/screen/components/card-alternatives.component";
import {PANELDEVSERVICE} from "../config";
import {panelAdapt} from "../../../../abc/componentTypeUtil";

// 该组件所包含的正反两面的组件没有交互关系
@Component({
    selector: 'dev-turnover',
    templateUrl: './turn-over.html',
    styles: [
            `
            .front, .back {
                height: 390px;
                width: 390px;
            }

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

            .zijin-flip-container {
                height: 100%;
                position: relative;
                perspective: 800px;
            }

            .zijin-card {
                width: 100%;
                height: 100%;
                position: absolute;
                transform-style: preserve-3d;
                transition: transform 1s;
            }

            .zijin-card .front,
            .zijin-card .back {
                position: absolute;
                width: 100%;
                height: 100%;
                transform: rotateX(0deg);
                backface-visibility: hidden;
                -moz-backface-visibility: hidden;
            }

            .zijin-card .back {
                transform: rotateY(180deg);
            }

            .zijin-card.flipped {
                transform: rotateY(180deg);
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

    constructor(@Inject(PANELDEVSERVICE) private panelService,
                private injector: Injector,
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
        this.panelService.getChartsDef()
            .subscribe((dataList) => {
                const alts = dataList || [];
                const alternatives = [];
                alts.forEach(value => {
                    if (value.type === 10 || value.type === 11) {

                    } else {
                        alternatives.push(value);
                    }
                });
                this.positiveAlternatives = panelAdapt(alternatives, this.injector);
                this.negativeAlternatives = panelAdapt(alternatives, this.injector);
            }, err => {
                this.message.error(err.body.retMsg);
            });
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
        console.log(this.children);
        console.log(this.children);
        console.log(this.children);
    }

    save() {
        const children = [];
        this.children.forEach(value => {
            children.push({id: value.id, type: value.type});
        });
        if (this.formModel.name == null || this.formModel.name === '') {
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

        this.panelService.save(params)
            .subscribe(data => {
                this.message.success(data.retMsg);
                console.log(data);
            }, err => {
                this.message.error(err.body.retMsg);
            });
    }


}


