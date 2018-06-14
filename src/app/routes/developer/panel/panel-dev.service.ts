import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PanelsDevService {

    private SERVERAPI = "http://localhost:3000";

    constructor(private http: HttpClient) {
    }

    qryAllServiceList() {
        return this.http.get(this.SERVERAPI + '/serviceList');
    }

    preview(params: any) {
        return this.http.get(this.SERVERAPI + '/alters');
    }

    save(params: any) {
        return this.http.post(this.SERVERAPI + 'visible/chartsDevelop/chartModel/save', {...params});
    }

    // 获取自定义的图表
    getChartsDef() {
        return this.http.get(this.SERVERAPI + '/alters');
    }
}
