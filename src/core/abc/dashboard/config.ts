import {Observable} from 'rxjs/Observable';
import {InjectionToken} from '@angular/core';

/**
 * 以下接口只关心接口的返回值，具体与后端交互的请求参数，请参看开发时的具体接口
 */

export interface DashboardService {
    /**
     *获取当前用户已有的主题列表
     * 返回值：
     * [
     *  {
     *      pageId: string
     *  }
     *  ...
     * ]
     */
    getMultiPagesMeta: () => Observable<any>;

    /**
     *获取用户可见的所有主题(系统内置+自定义)
     * 返回值：
     * [
     *  {
     *       description: "综合分析"
     *       name: "综合分析"
     *       pageId: "0"
     *  }
     *  ...
     * ]
     */
    getAllPagesMeta: () => Observable<any>;

    /**
     *根据主题ID获取主题的配置信息
     * 返回值：
     *  {
     *      homeDef:{
     *          cards:[
     *              { "id":"ID201901170001" },
     *              {},
     *              {},
     *              {}
     *          ],
     *          tabs:[
     *              [
     *                  { "name":"test","id":"ID201901170001" }
     *                  ...
     *              ],
     *              []
     *          ]
     *      },
     *      themeDesc:string,
     *      themeName:string
     *  }
     */
    getPageDefById: (pageId: string) => Observable<any>;

    /**
     * 新增内置主题（选择其他内置主题展现）
     */
    addNewPageDef: (page: { pageId: string }) => Observable<any>;


    /**
     * 根据主题ID删除主题
     */
    deletePageById: (pageId: string) => Observable<any>;

    /**
     *根据主题ID更新当前主题
     */
    updatePageDefById: (params: { pageId: string, homeDef: any }) => Observable<any>;

    /**
     * 获取自定义Echarts组件列表
     * 返回值：
     *  {
     *      element:{
     *          componentMsg:{
     *              describe:string,
     *              icon:string,
     *              name:string,
     *              subject:string | number
     *          },
     *          dataMsg:JSONData,
     *          optionMsg:string
     *      }
     *  }
     */
    getChartsDef: (params) => Observable<any>;


    /**
     *获取绘制图表所需的数据与Option
     */
    getOptionAndDataById: (echartsID: string) => Observable<any>;
}

export const DASHBOARDSERVICE = new InjectionToken<DashboardService>('DashboardService');
