import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScreenService} from '@delon/abc/screen/config';

@Injectable()
export class DemoScreenService implements ScreenService {

    private api = 'http://localhost:3000';


    constructor(private http: HttpClient) {
    }

    // 获取大屏配置
    getScreenDef() {
        return this.http.get(this.api + '/screenDef');
    }

    // 更新大屏配置
    updateScreenDef(newDef) {
        return this.http.put(this.api + '/screenDef', {
            screenDef: newDef
        });
    }

    // 获取自定义的图表类型
    getSelfDefCharts(params) {
        return this.http.get('assets/json/alters.json', {
            params: params
        });
    }

    // 根据id获取图表详细信息
    getOptionAndDataById(id) {
        return this.http.get(this.api + '/chartModel/' + id);
    }
}
