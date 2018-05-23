import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

/**
 * 用于对正反组件需要交互的情形
 * todo(ccliu): 需要进一步思考
 */
@Injectable()
export class InteractService {

    private valueAnnouncedSource = new Subject<any>();

    valueAnnounced$ = this.valueAnnouncedSource.asObservable();

    announceValue(value) {
        this.valueAnnouncedSource.next(value);
    }

}
