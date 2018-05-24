import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DashboardService} from '@delon/abc/dashboard/config';

@Injectable()
export class DemoDashboardService implements DashboardService {


    constructor(private http: HttpClient) {
    }

    // 获取用户的主题数目
    getMultiPagesMeta() {
        return this.http.get('assets/json/multiPagesMeta.json');
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
}
