import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/observable/from';


@Injectable()
export class EchartsDevService {
    private SERVERAPI = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    qryAllServiceList() {
        return Observable.from([]);
        // return this.http.post(this.SERVERAPI + 'visible/chartsDevelop/chartModel/qryAllServiceList', {})
        //     .map((data: any) => data.retList);
    }

    preview(params: any) {
        params.chartType = '0';
        return this.http.post(this.SERVERAPI + 'visible/chartsDevelop/chartModel/preview', {...params})
            .map(data => data['retData']);
    }

    save(params: any) {
        return this.http.post(this.SERVERAPI + 'visible/chartsDevelop/chartModel/save', {...params});
    }
}
