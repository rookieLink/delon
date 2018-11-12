import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Injector,
    Input,
    OnInit,
    SystemJsNgModuleLoader,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from './components/card-alternatives.component';

import * as _ from 'lodash';
import * as screenfull from 'screenfull';
import {panelAdapt} from '../componentTypeUtil';
import {SCREENSERVICE} from './config';
import {ScreenLayoutDefault} from './screen-layout-default';
import {provideRoutes} from '@angular/router';

@Component({
    selector: 'zj-screen',
    templateUrl: './screen.html',
    styleUrls: ['./screen.less'],
    providers: [
        SystemJsNgModuleLoader,
        provideRoutes([
            {loadChildren: 'app/routes/lazy/nml-lazy.module#NMLLazyModule'}
        ])
    ]
})
export class ScreenComponent implements OnInit, AfterViewInit {


    @Input() headImg = './assets/img/screen_header.png';
    @Input() backgroundImage = './assets/img/screen_background.png';

    @ViewChild('swrapper') swrapper: ElementRef;
    // @Input() developer = false;
    //
    splitConf = null;
    // setting = false;
    // openSetting = false;
    // alternatives = []; // 图表选择项
    //
    // iconClass = 'anticon-arrows-alt';

    layModule: any;


    constructor(private injector: Injector,
                private modal: NzModalService,
                private el: ElementRef,
                @Inject(SCREENSERVICE) private screenService,
                private loader: SystemJsNgModuleLoader,
                private _injector: Injector,
                private message: NzMessageService) {


        console.log(`url(${'"' + this.backgroundImage + '"'})`);
        console.log('screen init.');
    }

    ngOnInit() {

        // todo: 如何链式调用？
        this.screenService.getScreenDef({})
            .subscribe(sConf => {
                console.log('screenConfig: ', sConf);
                // 获取布局settings
                this.splitConf = sConf;

                this.splitConf.columns.forEach((col) => {
                    panelAdapt(col.rows, this.injector);
                });
                //
                // panelAdapt(sConf.lColumn.rows, this.injector);
                // panelAdapt(sConf.cColumn.rows, this.injector);
                // panelAdapt(sConf.rColumn.rows, this.injector);

                console.log(sConf);


                this.loader.load('app/routes/lazy/nml-lazy.module#NMLLazyModule')
                    .then((ngModuleFactory) => {
                        const module = ngModuleFactory.create(this._injector);

                        this.layModule = ngModuleFactory;

                        this.splitConf.columns.forEach((col) => {
                            col.rows.forEach(row => {
                                if (row.comp.c_Name) {
                                    row.comp.component = module.instance.paths[row.comp.c_Name];
                                    row.comp.injector = this._injector;
                                }
                            });
                        });

                    });

            }, err => {
                this.message.error(err.body.retMsg);
            });
        //
        // this.screenService.getSelfDefCharts()
        //     .subscribe((data) => {
        //         this.alternatives = panelAdapt(data, this.injector);
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //     });
        //
        // screenfull.on('change', () => {
        //     if (screenfull.isFullscreen) {
        //         this.iconClass = 'anticon-shrink';
        //     } else {
        //         this.iconClass = 'anticon-arrows-alt';
        //
        //     }
        // });

    }

    // cardModal(card) {
    //     this.modal.open({
    //         content: CardAlternativesComponent,
    //         footer: false,
    //         componentParams: {
    //             alts: this.alternatives
    //         }
    //     }).subscribe(value => {
    //         if (value.id) {
    //             if (this.lCards.indexOf(card) !== -1) {
    //                 this.lCards[this.lCards.indexOf(card)] = value;
    //             } else if (this.rCards.indexOf(card) !== -1) {
    //                 this.rCards[this.rCards.indexOf(card)] = value;
    //             } else if (this.cTCards.indexOf(card) !== -1) {
    //                 this.cTCards[this.cTCards.indexOf(card)] = value;
    //             } else if (this.cBCards.indexOf(card) !== -1) {
    //                 this.cBCards[this.cBCards.indexOf(card)] = value;
    //             }
    //         }
    //     });
    // }
    //
    // openSettings() {
    //     this.openSetting = true;
    //     setTimeout(() => {
    //         this.splitConf.disabled = false;
    //         this.setting = true;
    //         this.openSetting = false;
    //     }, 500);
    // }
    //
    saveSettings() {
        // this.openSetting = false;

        // this.setting = false;
        // this.splitConf.disabled = true;

        console.log(this.splitConf);

        // this.screenService.updateScreenDef({
        //     layout: _.omit(this.splitConf, ['disabled']),
        //     lCards: this.transform(this.lCards),
        //     rCards: this.transform(this.rCards),
        //     cTCards: this.transform(this.cTCards),
        //     cBCards: this.transform(this.cBCards),
        // }).subscribe(data => {
        //     console.log(data);
        //     this.setting = false;
        //     this.splitConf.disabled = true;
        // }, err => {
        //     this.message.error(err.body.retMsg);
        // });


    }

    ngAfterViewInit() {
        this.el.nativeElement.style.backgroundImage = `url(${'"' + this.backgroundImage + '"'})`;
    }

    onDragEnd(columnindex: number, e: { gutterNum: number, sizes: Array<number> }) {
        console.log('columnindex', columnindex);
        console.log('sizesArray', e.sizes);
        if (columnindex === -1) { // Column dragged
            // Set size for all visible columns
            this.splitConf.columns.forEach((col, i) => {
                col[i] = e.sizes[i];
            });
            // this.splitConf.columns[0] = e.sizes[0];
            // this.splitConf.columns[1] = e.sizes[1];
            // this.splitConf.columns[2] = e.sizes[2];
            // this.splitConf.columns.filter(c => c.visible === true).forEach((column, index) => column.size = e.sizes[index]);
        } else { // Row dragged
            // Set size for all visible rows from specified column
            this.splitConf.columns[columnindex - 1].rows.forEach((row, index) => row.size = e.sizes[index]);
            // this.splitConf.lColumn.rows.forEach((row, index) => row.size = e.sizes[index]);
        }

    }


    toggleFullScreen() {
        if (screenfull.isFullscreen) {
            screenfull.exit();
        } else {
            // screenfull.request();
            screenfull.request(this.el.nativeElement);
        }
    }

    trackByFn(index) {
        return index;
    }
}
