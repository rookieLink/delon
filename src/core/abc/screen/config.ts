import {Observable} from 'rxjs/Observable';
import {InjectionToken} from '@angular/core';

export interface ScreenService {
    getScreenDef: (params) => Observable<any>;
    updateScreenDef: (params) => Observable<any>;
    getSelfDefCharts: (params) => Observable<any>;
    getOptionAndDataById: (params) => Observable<any>;
}

export const SCREENSERVICE = new InjectionToken<ScreenService>('ScreenService');
