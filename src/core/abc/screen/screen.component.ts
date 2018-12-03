import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Injector,
    Input,
    NgModuleFactory,
    OnInit,
    SystemJsNgModuleLoader
} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import * as screenfull from 'screenfull';
import {panelAdapt} from '../componentTypeUtil';
import {SCREENSERVICE} from './config';
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
    @Input() splitDisabled = true;

    fullScreen = false; // 是否全屏状态
    splitConf = null;
    lazyModule: NgModuleFactory<any>;

    constructor(private injector: Injector,
                private modal: NzModalService,
                private el: ElementRef,
                @Inject(SCREENSERVICE) private screenService,
                private loader: SystemJsNgModuleLoader,
                private _injector: Injector,
                private message: NzMessageService) {
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

                this.loader.load('app/routes/lazy/nml-lazy.module#NMLLazyModule')
                    .then((ngModuleFactory) => {
                        const module = ngModuleFactory.create(this._injector);

                        this.lazyModule = ngModuleFactory;

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
    }


    saveSettings() {
        console.log(this.splitConf);
        const splitConf = _.cloneDeep(this.splitConf);
        splitConf.columns.forEach(col => {
            col.rows.forEach(row => {
                if (row.comp.component) {
                    delete row.comp.component;
                }
                if (row.comp.injector) {
                    delete row.comp.injector;
                }
            });
        });

        console.log(splitConf);

        const blob = new Blob([JSON.stringify(splitConf, null, 2)], {type: 'text/plain;charset=utf-8'});
        FileSaver.saveAs(blob, `zijin.screen.${moment().format('YYYYMMDDHHmmss')}.json`);


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
                col.size = e.sizes[i];
            });
        } else { // Row dragged
            // Set size for all visible rows from specified column
            this.splitConf.columns[columnindex].rows.forEach((row, index) => row.size = e.sizes[index]);
            // this.splitConf.lColumn.rows.forEach((row, index) => row.size = e.sizes[index]);
        }

    }


    toggleFullScreen() {
        if (screenfull.isFullscreen) {
            screenfull.exit();
            this.fullScreen = false;
        } else {
            screenfull.request(this.el.nativeElement);
            this.fullScreen = true;
        }
    }

    trackByFn(index) {
        return index;
    }
}
