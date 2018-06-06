import {SingleFaceComponent} from "./panel/components/single-face.component";
import {TurnoverComponent} from "./panel/components/turnover.component";
import {MultiFaceComponent} from "./panel/components/multi-face.component";
import {ViewInfoComponent} from "@delon/abc/screen/components/view-info.component";
import {ViewDetailComponent} from "@delon/abc/screen/components/view-detail.component";
import {ViewRankComponent} from "@delon/abc/screen/components/view-rank.component";


export const DevComponentTypeCode: Map<string, any> = new Map<string, any>();
DevComponentTypeCode.set('info', {component: SingleFaceComponent, data: null});
DevComponentTypeCode.set('detail', {component: SingleFaceComponent, data: null});
DevComponentTypeCode.set('rank', {component: SingleFaceComponent, data: null});
DevComponentTypeCode.set('turn-over', {component: TurnoverComponent, data: null});
DevComponentTypeCode.set('multi-face', {component: MultiFaceComponent, data: null});

export const ViewCode: Map<string, any> = new Map<string, any>();
ViewCode.set('info', ViewInfoComponent);
ViewCode.set('detail', ViewDetailComponent);
ViewCode.set('rank', ViewRankComponent);
