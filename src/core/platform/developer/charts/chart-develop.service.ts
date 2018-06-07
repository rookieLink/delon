import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ChartDevelopService {

    private chartDevUrl = 'chartsDevelop';
    private modUrl =  'system/v1/chart';
    private session;

    constructor(private http: HttpClient) {
    }


    preview(paramMsg) {
        // return this.http.post<any>(this.chartDevUrl + '/v1/chartModel/preview', paramMsg);
    }

    save(paramMsg) {
        // return this.http.post(this.chartDevUrl + '/v1/chartModel', paramMsg);
    }

    modChart(paramMsg) {
        // return this.http.put(this.modUrl, paramMsg);
    }

    queryChartSubjects(paramMsg) {
        // return this.http.get(this.chartDevUrl + '/queryChartSubjects', {
        //     params: {orgNo: this.session.orgNo}
        // });
    }

    queryServiceList() {
        // return this.http.get(this.chartDevUrl + '/v1/chartModel/serviceList', {
        //     params: {orgNo: this.session.orgNo}
        // });
    }


}
