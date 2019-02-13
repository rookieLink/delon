大屏展示使用手册

1.模板中引用<zj-screen></zj-screen>

2.定义ScreenService服务

3.模块中导入ZjScreenModule.forRoot(ScreenService)

4.模块的Providers数组中配置懒加载的路径

5.懒加载的模块定义名称-类映射

ScreenService所需方法

```
getScreenDef() {
        return of({
            'columns': [
                {
                    'size': 25,
                    'rows': [
                        {
                            'size': 25,
                            'comp': {
                                c_Name: 'QualityIndexComponent' // 所要实例化的组件名称
                            }
                        },
                        {
                            'size': 45,
                            'comp': {
                                c_Name: 'CashModuleComponent'
                            }
                        },
                        {
                            'size': 30,
                            'comp': {
                                c_Name: 'TransactionRatioComponent'
                            }
                        }
                    ]
                },
                {
                    'size': 48,
                    'rows': [
                        {
                            'size': 25,
                            'comp': {
                                c_Name: 'CashRepertoryComponent'
                            }
                        },
                        {
                            'size': 75,
                            'comp': {
                                c_Name: 'DemoCarouselComponent'
                            }
                        }
                    ]
                },
                {
                    'size': 27,
                    'rows': [
                        {
                            'size': 55,
                            'comp': {
                                c_Name: 'ServiceQualityRankComponent'
                            }
                        },
                        {
                            'size': 45,
                            'comp': {
                                c_Name: 'TransctionListComponent'
                            }
                        }
                    ]
                }
            ]
        });
    }
```

ScreenModule
```
@NgModule({
    imports: [
        SharedModule,
        ZjScreenModule.forRoot(ScreenService),
        ScreenRoutingModule,
    ],
    declarations: [
        ScreenComponent,
    ],
    providers: [
        SystemJsNgModuleLoader,
        provideRoutes([
            { loadChildren: 'app/routes/lazy/nml-lazy.module#NMLLazyModule' }
        ])
    ],
})
export class ScreenModule {

}
```


懒加载模块
```
export class NMLLazyModule {

    paths = {
        DemoCarouselComponent: DemoCarouselComponent,
        TurnOverComponent: TurnOverComponent,
        DeviceBenefitRankComponent: DeviceBenefitRankComponent
    };

}

```


ScreenComponent

```
/**
 * zj-screen组件使用方式
 *
 * splitDisabled - 是否显示布局分割符。为false时，页面会出现保存按钮，可以下载当前页面布局信息
 * backgroundImage -  指定背景图片
 * headImg  - 指定头部背景图片
 *
 */

@Component({
    template: `
        <zj-screen [splitDisabled]="true"
                   [backgroundImage]="'./assets/images/screen/bj-yz.png'"
                   [headImg]="'./assets/images/screen/screen_header.png'">
        </zj-screen>
    `,

})
export class ScreenComponent {

}

```
