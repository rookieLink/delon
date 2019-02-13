驾驶舱使用方式：


1.模板中引入<zj-dashboard></zj-dashboard>

2.定义DashboardService服务

3.模块中引入ZjDashboardModule.forRoot(DashboardService) 


DashboardService服务所需方法

    /*获取用户的已有的主题列表
     * @returns {Observable<[{pageId: any}...]>}
     */
    getMultiPagesMeta() 

     /**
     *  获取用户可见的所有主题(系统内置+自定义)
     * @returns {Observable<[{pageId: any; name: any; description: any}]>}
     */
    getAllPagesMeta()

    /**
     * 获取主题的配置信息
     *
     * @param pageId
     * @returns {Observable<{homeDef: any; themeName: any; themeDesc: any}>}
     */
    getPageDefById(pageId)

    /**
     * 新增内置主题
     * 用户可以选择其他内置的主题展现在自己的驾驶舱中
     *
     * @param {{pageId: string}} params
     */
    addNewPageDef(params: { pageId: string }) 

    // 新增(自定义)主题
    addUserNewPageDef(params: { name: string, desc: string, icon: string }) 
       
    // 删除主题
    deletePageById(pageId)

    // 更新主题的配置信息
    updatePageDefById(params: { pageId: string, homeDef: any })

    // 获取自定义的图表列表
    getChartsDef() 

    // 根据图表定义ID获取图表详细信息
    getOptionAndDataById(id)
