import {Component} from '@angular/core';

@Component({
    selector: 'nz-demo-datepicker-basic',
    // language=HTML
    template: `
        <ul>
            <li><span style="font-size: 17px;">现金库存</span></li>
            <li><span style="font-size: 24px;font-weight: 700;">9838.00万元</span></li>
            <li><span>上个周期现金库存量：8746.20万元</span></li>
            <li><span>环比增长：12.48%</span></li>
        </ul>
    `,
    // language=CSS
    styles: [`
        ul {
            color: #fff;
            position: absolute;
            left: calc(50% - 106px); /* 106px为ul元素宽度/2  */
            top: calc(50% - 63px);
        }
    `]
})
export class NzDemoDatePickerBasicComponent {
    _date = null;
    _dateRange = [null, null];

    constructor() {
    }

}
