import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    // todo(ccliu): localStorage存储
    getPageDefById(params/*pageId = 'meta-analysis'*/) {
        return this.http.get('assets/json/homeDef.json', {params: params});
    }

    updatePageDefById(def) {
        return this.http.get('assets/json/alters.json', {params: def});
        // return this.http.put('assets/json/alters.json', {...def});
    }

    // 获取自定义的图表类型 todo(ccliu):该接口建议后端不返回chart_option字段值
    getChartsDef(params) {
        return this.http.get('assets/json/alters.json', {
            params: params
        });
    }

    // 根据id获取图表详细信息
    getOptionAndDataById(id) {
        return this.http.get('assets/json/chartModel.json', {
            params: id
        });
    }
}
