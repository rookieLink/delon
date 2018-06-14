import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ScreenDevService {
    private api = "http://localhost:3000";

    constructor(private http: HttpClient) {
    }

    getScreenDef() {
        return this.http.post(this.api + 'visible/screen/qryScreenInfo', {})
            .map((val: any) => JSON.parse(val.data.content));
    }

    updateScreenDef(newDef) {
        return this.http.post(this.api + 'visible/screen/updateScreenInfo', {content: newDef});
    }

    // 获取自定义的图表类型
    getSelfDefCharts() {
        return this.http.get('assets/json/alters.json')
            .map(val => val['retList']);
    }

    // 根据id获取图表详细信息
    getOptionAndDataById(id) {
        return this.http.get('assets/json/chartModel.json'/* + id  */)
            .map(data => data[0]);
    }


}
