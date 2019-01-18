## API

### zj-chart-dev

| 成员 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| `[devRoute]` | 指定图表开发的路由路径 | string |  |

### zj-echarts-dev

| 成员 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| `[chartType]` | 图表类型 | string | 用于图表组件开发时，通常从路由中获取  |
| `[chartId]` | 已开发好的图表ID | string | 用于图表组件修改时  |


### zj-echarts-dev-content
这个指令的目的在于将form表单的开发放到具体的应用

| 属性 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| `jsonData` | JSON数据 | EventEmitter |  用于emit后台获取的json数据 |
| `optionData` | 图表Option | EventEmitter | 用于emit页面上写好的option数据  |


示例

```ts
//  该Component用于展现可开发的Echarts图表列表
@Component({
    template: '<zj-chart-dev [devRoute]="'develop/charts'"></zj-chart-dev>'
})
export class EchartsComponent {}

// 该Component用于开发具体类型的Echarts
@Component({
    template: `
    <zj-echarts-dev [chartType]="id">
    
        <form nz-form [formGroup]="myForm" novalidate zj-echarts-dev-content>
            ...
        </form>
    
    </zj-echarts-dev>
    `,
})
export class EchartsDevComponent implements OnInit {
    id; //图表类型(id)        
    echartsRightRendered = false;   // 判断Echarts是否正确渲染
    @ViewChild(ZjEchartsDevContentDirective) content: ZjEchartsDevContentDirective;
    optionMsg: any; // Echarts option

    constructor(private route: ActivatedRoute,
                private chartServcie: ChartService) {
        // 从路由中获取图表类型(id)        
        this.route.params.subscribe(params => this.id = params.id);
    }

    ngOnInit(): void {
    
        // 订阅optionData，如果页面渲染成功，获取页面的Echarts option值
        this.content.optionData.subscribe((data: any) => {
            if (data) {     // 当data值不为false时，表示echarts渲染成功
                // 预览成功
                this.echartsRightRendered = true;
                this.optionMsg = data;
            } else {
                // 预览失败
                this.echartsRightRendered = false;
            }
        });
    }

    getJsonData() {
        // 重新获取json需要再次预览
        this.echartsRightRendered = false;

        this.chartService.preview().subscribe(data => {
            // 通知zj-echarts-dev组件，json数据获取成功
            this.content.jsonData.emit(data);   
        });

    }

}


```
