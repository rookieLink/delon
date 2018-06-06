import {Component, Inject, Injector, Input, OnInit, Optional} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PreviewMultiFaceComponent} from './preview-multi-face.component';

// 该组件所包含的正反两面的组件没有交互关系
@Component({
    selector: 'dev-multi-face',
    templateUrl: './multi-face.html',
    styles: [
            `
            .card-available {
                cursor: pointer;
                margin: 10px;
                width: 450px;
                height: 450px;
                overflow: scroll;
                float: left;
            }
        `
    ]
})
export class MultiFaceComponent implements OnInit {

    form: FormGroup;

    alternatives = [];   // 所有可供选择项

    pageList = [];

    transitionList = [{no: 'carousel', name: '走马灯'}];

    constructor(private injector: Injector,
                private modal: NzModalService,
                private fb: FormBuilder,
                private message: NzMessageService) {

    }


    ngOnInit(): void {

        this.form = this.fb.group({
            pageCount: [null, [Validators.required]],
            pageTransition: [null, [Validators.required]],
            name: [null, [Validators.required]],
            describe: [null, [Validators.required]]
        });


        // this.screenDev.getSelfDefCharts()
        //     .subscribe((data) => {
        //         console.log(data);
        //         const alts = data['retList'] || [];
        //         const alternatives = [];
        //         alts.forEach(value => {
        //             if (value.type === 10 || value.type === 11) {
        //             } else {
        //                 alternatives.push(value);
        //             }
        //         });
        //         this.alternatives = panelAdapt(alternatives, this.injector);
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //     });
    }


    preview() {
        this.modal.open({
            title: '合成组件预览',
            maskClosable: false,
            footer: false,
            content: PreviewMultiFaceComponent,
            componentParams: {
                pages: this.pageList
            }
        });
    }

    save() {
        const params = {
            type: 'carousel',
            children: [
                'children id 序列号',       // 这里不需要保存cType字段，强制后端以记录的方式保存
                {                           // 或者记录cType字段
                    id: '',
                    type: ''
                }
            ]
        };
        console.log(this.pageList);
    }

    pageCountChange(num) {
        this.pageList.length = 0;
        for (let i = 0; i < num; i++) {
            this.pageList.push({
                component: null,
                injector: null,
                cid: null,
                cType: null,
                pending: true
            });
        }
    }

    selectCard(card, page) {
        page.component = card.component;
        page.injector = card.injector;
        page.cid = card.id;
        page.cType = card.type;     // 悲哀的处理！供保存时使用，考虑到panelAdapt时的问题
    }


    selectView(page) {
        if (page.component && page.injector) {
            page.pending = false;
        }
    }


}

