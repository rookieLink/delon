import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ScreenDevService {
    private url =  'chartsDevelop/v1/chartModel';

    constructor(private http: HttpClient) {

    }

    getJsonData(params): Observable<any> {
        return this.http.post(this.url + '/preview', params);
    }

    save(params): Observable<any> {
        return this.http.post(this.url, params);
    }

    getAllComponents() {

    }


    // 获取自定义的图表类型
    getSelfDefCharts() {


    }

}
