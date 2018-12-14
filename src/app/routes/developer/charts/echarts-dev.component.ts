import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EchartsDevService} from './echarts-dev.service';
import {ZjEchartsDevContentDirective} from '@delon/platform/developer/charts/zj-echarts-dev-content.directive';

@Component({
    templateUrl: './echarts-dev.component.html',
    styles: [`
        :host {
            height: 500px;
        }
    `],
    providers: [
        EchartsDevService
    ]
})
export class DemoEchartsDevComponent implements OnInit {

    id;
    myForm: FormGroup;
    echartsRightRendered = false;   // 判断Echarts是否正确渲染

    availableServices = [];
    availableFields = [];
    requestFields = [];

    oldControls = [];

    @ViewChild(ZjEchartsDevContentDirective) content: ZjEchartsDevContentDirective;


    constructor(private route: ActivatedRoute,
                private chartService: EchartsDevService,
                private fb: FormBuilder) {

        /**
         *  从路由中获取图表id值
         */
        this.route.params.subscribe(params => {
            this.id = params.id;
        });

        this.myForm = this.fb.group({
            name: ['', [Validators.required]],
            subject: ['', [Validators.required]],
            icon: ['', [Validators.required]],
            describe: ['', [Validators.required]],
            innerForm: this.fb.group({
                service: [null, [Validators.required]],
                dimensionRows: [[], [Validators.required]],
                measureRows: [[], [Validators.required]],
            })
        });
    }

    ngOnInit(): void {
        this.getServiceList();
        this.content.optionData.subscribe((data: any) => {
            if (data) {     // 当emit的值不为false时，表示echarts渲染成功
                this.echartsRightRendered = true;
            } else {
                this.echartsRightRendered = false;
                console.log('预览失败');
            }
        });
    }

    getServiceList() {
        this.chartService.qryAllServiceList()
            .subscribe((dataList: Array<any>) => {
                this.availableServices = dataList;
            }, err => {
                // this.message.error(err.body.retMsg);
            });
    }


    selectService(service) {
        console.log(service);
        this.requestFields = [];

        const innerGroup = this.myForm.controls.innerForm as FormGroup;
        this.oldControls.forEach(name => {
            innerGroup.removeControl(name);
        });

        console.log(this.myForm);

        // 将之前的FormControl移除

        if (service) {
            this.availableFields = service.returnParam;
            this.createRequestField(service.requestParam);
        } else {
            this.availableFields = [];
        }

        // todo: reset其他formControl
    }

    save(myForm) {
        console.log(this.echartsRightRendered);
    }


    getJsonData() {

        // 重新获取json需要再次预览
        this.echartsRightRendered = false;

        this.chartService.preview()
            .subscribe(data => {
                this.content.jsonData.emit(data);
            }, err => {
                // this.message.error(err.body.retMsg);
                console.log(err);
            });

    }


    createRequestField(requestParams: Array<any>) {
        if (requestParams.length) {
            const innerForm = this.myForm.controls.innerForm as FormGroup;
            requestParams.forEach(r => {
                innerForm.addControl(r.name, new FormControl());
                this.oldControls.push(r.name);
            });

            this.requestFields = [...requestParams];

            console.log(this.myForm);
            console.log(this.requestFields);
        }

    }


}
