import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {DASHBOARDSERVICE} from './config';
import {DashboardComponent} from './dashboard.component';

import * as _ from 'lodash';

@Component({
    selector: 'zj-dashboard',
    template: `
        <!-- 提供更改主题数目的操作 -->
        <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" style="position: absolute;z-index: 1;">
            <span class="anticon anticon-setting" nz-dropdown></span>
            <div nz-menu style="width:200px">
                <div nz-menu-item class="theme-switch" (click)="deleteCurrentPage()">
                    删除当前主题
                </div>
                <div nz-menu-item (click)="configPages()">
                    新增系统主题
                </div>
                <div nz-menu-item>
                    新增自定义主题
                </div>
                <!--<div nz-menu-item>
                    <header-i18n></header-i18n>
                </div>-->
            </div>
        </nz-dropdown>
        <zj-carousel [panels]="panels" [zjArrows]="false" (onActive)="activatePage($event)"></zj-carousel>
        <nz-modal [nzVisible]="pVisible" [nzTitle]="'第一个 Modal'" [nzContent]="modalContent"
                  (nzOnCancel)="pVisible = false;"
                  (nzOnOk)="addPage();">
            <ng-template #modalContent>
                <div nz-row [nzGutter]="8">
                    <div nz-col [nzSpan]="8" *ngFor="let page of pendingPages;">
                        <nz-card [ngClass]="{'card-nonavailable': !page.available,'card-available':page.available}"
                                 (click)="selectPage(page)">
                            <ng-template #body>
                                <i class="anticon anticon-check-circle"
                                   style="color: blueviolet;font-size: 22px;position: absolute;right: 7px;top:4px;"
                                   *ngIf="page.selected"></i>
                                <i class="anticon anticon-check-circle-o" *ngIf="!page.selected"
                                   style="position: absolute;right: 7px;top:4px"></i>
                                <i style="font-size: 45px;" [ngClass]="['anticon','anticon-area-chart']"></i>
                                <p style="height: 50px;">{{page.description}}</p>
                            </ng-template>
                        </nz-card>
                    </div>
                </div>
            </ng-template>
        </nz-modal>
    `,
    styles: [
            `
            .card-available {
                cursor: pointer;
                background-color: #8bd22f;
                margin-bottom: 5px;
            }

            .card-nonavailable {
                cursor: pointer;
                background-color: darkslategray;
                margin-bottom: 5px;
            }
        `
    ]
})
export class ZijinDashboardComponent implements OnInit {

    pVisible = false;

    // 当前已配置的主题项
    pages = [];
    // 获取所有主题项
    pendingPages = [];

    pageActivating;

    pageSelected;

    panels = [];
    @Output() onDeletePage = new EventEmitter();

    constructor(private message: NzMessageService,
                @Inject(DASHBOARDSERVICE) private dashboardService) {

    }

    ngOnInit(): void {
        this.getMultiPagesMeta();
        this.getAllPagesMeta();
    }

    configPages() {
        this.pVisible = true;

        this.pendingPages.forEach(val => {
            val.available = true;
            val.selected = false;
        });
        this.pendingPages.forEach(val => {
            this.pages.forEach(v => {
                if (val.pageId === v.pageId) {
                    val.available = false;
                    val.selected = true;
                }
            });
        });
    }

    selectPage(page) {

        if (!page.available) {
            return;
        }

        // 标志当前页被选中
        this.pendingPages.forEach(val => {
            if (val.available) {
                val.selected = false;
            }
        });
        page.selected = true;
        this.pageSelected = page;
    }

    addPage() {

        this.dashboardService.addNewPageDef({
            pageId: this.pageSelected.pageId
        }).subscribe(data => {
            this.pageSelected = null;
            this.pVisible = false;
            this.getMultiPagesMeta();
        }, err => {
            this.message.error(err.body.retMsg);
        });


        // this.pages.push({pageId: this.pageSelected.pageId});
        // this.panels.push({
        //     data: {pageId: this.pageSelected.pageId},
        //     component: DashboardComponent
        // });
        // this.panels = [].concat(this.panels);
        // this.pageSelected = null;
        // this.pVisible = false;
    }

    activatePage(page) {
        this.pageActivating = page.pageId;
    }

    deleteCurrentPage() {
        // let idx;
        // this.panels.forEach((val, index) => {
        //     if (val.data.pageId === this.pageActivating) {
        //         idx = index;
        //     }
        // });
        //
        // if (idx > -1) {
        //     this.panels.splice(idx, 1);
        //     this.panels = [].concat(this.panels);   // 脏值检测
        // }

        this.dashboardService.deletePageById(this.pageActivating)
            .subscribe(data => {
                this.getMultiPagesMeta();
                this.onDeletePage.emit('删除驾驶舱成功');
            }, err => {
                this.message.error(err.body.retMsg);
            });

    }


    // 获取当前用户下的主题项
    getMultiPagesMeta() {
        this.dashboardService.getMultiPagesMeta()
            .subscribe(data => {
                const panels = [];
                data.forEach(val => {
                    panels.push({
                        data: val,
                        component: DashboardComponent
                    });
                });
                this.panels = panels;
                this.pages = data;
            });
    }

    // 获取系统内置的所有主题
    getAllPagesMeta() {
        this.dashboardService.getAllPagesMeta()
            .subscribe(data => {
                this.pendingPages = data;
            });
    }


}
