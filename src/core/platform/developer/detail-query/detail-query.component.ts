import {Component, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid/main';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'zj-detail-query',
    templateUrl: './detail-query.component.html',

})

export class DetailQueryComponent implements OnInit {

    fieldGridOptions: GridOptions;
    resultOptions: GridOptions;
    rowDataField: any[];
    rowData: any[];
    columnDefsFiled: any[];
    columnDefs: any[];
    params = {};
    groupList;
    serviceList;
    selectedRows = [];   // 已选字段数组
    queryName;
    groupName;
    queryNameErro;
    groupNameErro;
    formModel = {};
    selectedField = [];
    filter = [];
    Mothed: '';
    rowSelection = 'multiple';

    constructor(private message: NzMessageService) {

        this.fieldGridOptions = <GridOptions>{};
        this.fieldGridOptions.suppressClickEdit = false;
        this.columnDefsFiled = [
            {
                headerName: '参数名称',
                field: 'name',
                width: 100,
                editable: false,
                enableCellEdit: false
            }, {
                headerName: '参数类型',
                field: 'type',
                width: 100,
                editable: false,
                enableCellEdit: false
            }, {
                headerName: '参数说明',
                field: 'desc',
                width: 200,
                editable: true,
                enableCellEdit: true
            }
        ];
        this.rowDataField = [];

        this.resultOptions = <GridOptions>{};
        this.resultOptions.suppressMovableColumns = false;
        this.columnDefs = [];
        this.rowData = [];
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

    ngOnInit(): void {
        // this.detailService.queryGroups(this.params).subscribe(data => {
        //     this.groupList = data.retList;
        // }, error => {
        //     console.log('system error');
        // });
        // this.detailService.queryServiceList(this.params).subscribe(data => {
        //     this.serviceList = data.retList;
        // }, () => {
        //     console.log('查询失败');
        // });
    }

    serviceChange($event) {

        this.rowDataField = $event.returnParam;
        this.Mothed = $event.serviceMethod;

    }

    onRowChange(params) {
        // console.log('row changed');
        // params.api.sizeColumnsToFit();
    }

    onRowSelected($event) {
        // getDetailRowData
        // rowClicked
        // console.log("ssss" + $event.node.rowIndex);
    }

    onSelectionChanged() {
        this.selectedRows = this.fieldGridOptions.api.getSelectedNodes();
        console.log(this.selectedRows);
        this.selectedField = [];
        this.filter = [];
        this.selectedRows.forEach(s => {
            this.selectedField.push(s.data);
        });
        // fieldName fieldType fieldComment代表returnParams
        this.selectedField.forEach((data) => {
            // this.filter.push(Object.assign({}, {fieldName: data.name, fieldType: data.type, fieldComment: data.desc}));
            this.filter.push({name: data.name, type: data.type, desc: data.desc});
        });
        console.log(this.filter);
    }

    preview() {
        const paramMsg = {
            // serviceName: this.formModel['service'].serviceName,
            serviceMethod: this.Mothed,
            serviceURL: this.formModel['service'].serviceURL,
            // returnParam: this.filter[0],
            requestParam: ''
        };
        this.columnDefs = [];
        for (let i = 0; i < this.filter.length; i++) {
            this.columnDefs.push({
                // headerName: this.filter[i].fieldComment === '' ? this.filter[i].fieldName : this.filter[i].fieldComment,
                // field: this.filter[i].fieldName,
                headerName: this.filter[i].desc === '' ? this.filter[i].name : this.filter[i].desc,
                field: this.filter[i].name,
            });
        }
        const date1 = new Date().getTime();
        // this.detailService.preview(paramMsg).subscribe(data => {
        //     console.log(this.columnDefs);
        //     this.rowData = data.element;
        //     const date2 = new Date().getTime();
        //     console.log('查询耗时：' + (date2 - date1) + 'ms');
        // });
    }

    save() {
        this.preview();
        const params = {
            name: this.formModel['queryName'],
            groupName: this.formModel['groupName'],
            serviceName: this.formModel['service'].serviceName,
            serviceURL: this.formModel['service'].serviceURL,
            serviceMethod: this.Mothed,
            // fields: this.filter,
            returnParam: this.filter,
            requestParam: ''
        };
        let breakFlag = false;
        if (params.name === '' || params.name === null) {
            this.queryNameErro = true;
            breakFlag = true;
        }
        if (params.groupName == null) {
            this.groupNameErro = true;
            breakFlag = true;
        }
        if (breakFlag) {
            return;
        }
        console.log(params);
        // this.detailService.save(params).subscribe(data => {
        //     if (data.retCode === '00') {
        //         this.message.success('保存成功');
        //         console.log('保存成功');
        //     } else {
        //         this.message.error(data.retMsg);
        //         console.log('保存失败');
        //     }
        // });

    }

    exportTo() {
        this.preview();
        const paraMsg = {
            serviceName: this.formModel['service'].serviceName,
            serviceURL: this.formModel['service'].serviceURL,
            fields: this.filter,
            requestParam: {}
        };
        // this.detailService.exportTo(paraMsg).subscribe((data: HttpResponse<any>) => {
        //     const name = data.headers.get('Content-Disposition').replace('attachment;filename=', '');
        //     const blob = new Blob([data.body], {type: 'application/vnd.ms-excel'});
        //     this.fileService.save(blob, name);
        // });
    }


}
