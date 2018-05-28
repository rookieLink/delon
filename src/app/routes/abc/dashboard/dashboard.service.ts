import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DashboardService} from '@delon/abc/dashboard/config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DemoDashboardService implements DashboardService {


    constructor(private http: HttpClient) {
    }

    // 获取用户的主题数目
    getMultiPagesMeta() {
        return Observable.of(
            [
                {
                    pageId: 'meta-analysis1'
                },
                {
                    pageId: 'meta-analysis2'
                }
            ]
        );
    }

    // 获取主题的配置信息
    getPageDefById(params/*pageId = 'meta-analysis'*/) {
        return this.http.get('assets/json/homeDef.json', {params: params});
    }

    // 更新主题的配置信息
    updatePageDefById(def) {
        return this.http.get('assets/json/alters.json', {params: def});
        // return this.http.put('assets/json/alters.json', {...def});
    }

    // 获取自定义的图表
    getChartsDef(params) {
        return this.http.get('assets/json/alters.json', {
            params: params
        });
    }

    // 获取图表详细信息
    getOptionAndDataById(id) {
        return this.http.get('assets/json/chartModel.json', {
            params: id
        });
    }

    //  获取所有主题信息
    getAllPagesMeta() {
        return Observable.of([
                {
                    pageId: 'meta-analysis',
                    name: '渠道综合分析',
                    description: '现金自助渠道相关数据和关键指标综合分析'
                },
                {
                    pageId: 'meta-analysis1',
                    name: '渠道综合分析1',
                    description: '现金自助渠道相关数据和关键指标综合分析1'
                },
                {
                    pageId: 'meta-analysis2',
                    name: '渠道综合分析2',
                    description: '现金自助渠道相关数据和关键指标综合分析2'
                },
                {
                    pageId: 'meta-analysis3',
                    name: '渠道综合分析3',
                    description: '现金自助渠道相关数据和关键指标综合分析3'
                }
            ]
        );
    }
}
