import {Injectable} from '@angular/core';
import {user} from './session';

@Injectable()
export class SessionService {

    session = user;

    constructor() {
    }

    getUserSession() {
        return this.session;
    }


}
