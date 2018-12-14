import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';


@Injectable()
export class EchartsDevService {
    private SERVERAPI = 'http://localhost:3000';

    constructor(private http: HttpClient) {
    }

    qryAllServiceList() {
        // return Observable.of([]);
        return this.http.get(this.SERVERAPI + '/serviceList', {});
        // .map((data: any) => {
        //     console.log(data);
        //     return data;
        // });
    }

    preview() {

        return this.http.get(this.SERVERAPI + '/echartPreview', {})
            .map(data => data[0]);
    }

    save(params: any) {
        return this.http.post(this.SERVERAPI + 'visible/chartsDevelop/chartModel/save', {...params});
    }
}
