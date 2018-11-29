import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DashboardService} from '@delon/abc/dashboard/config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class DemoDashboardService implements DashboardService {

    private api = 'http://localhost:3000';

    constructor(private http: HttpClient) {
    }

    // 获取用户的主题数目
    getMultiPagesMeta() {
        return this.http.get(this.api + '/multiPagesMeta');
    }

    // 获取主题的配置信息
    getPageDefById(pageId) {
        return this.http.get(this.api + '/homeDef/' + pageId)
            .map(data => {
                console.log(data);
                return data;
            });
    }

    // 更新主题的配置信息
    updatePageDefById(params) {
        return this.http.patch(this.api + '/homeDef/' + params.pageId, {
            homeDef: params.homeDef
        });
    }

    // 获取自定义的图表
    getChartsDef() {
        return this.http.get(this.api + '/alters');
    }

    // 获取图表详细信息
    getOptionAndDataById(chartId) {
        console.log(chartId);
        return this.http.get(this.api + '/chartModel/' + chartId);
    }

    //  获取所有主题信息
    getAllPagesMeta() {
        return this.http.get(this.api + '/allPagesMeta');
    }

    // 新增(内置)主题
    addNewPageDef(params) {
        return this.http.post(this.api + '/multiPagesMeta/', {
            pageId: params.pageId,
            id: params.pageId,
        });
    }

    // 新增(自定义)主题
    addUserNewPageDef(params) {
        return this.http.post(this.api + '/multiPagesMeta/', params);
    }

    // 删除主题
    deletePageById(pageId) {
        return this.http.delete(this.api + '/multiPagesMeta/' + pageId);
    }
}
