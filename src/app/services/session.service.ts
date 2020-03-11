import { Injectable } from '@angular/core';
import { SessionStore, SessionState } from '../akitaAuth/session.store';
import { SessionDataService } from './session-data.service';
import { tap } from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private authStore: SessionStore, private authDataService: SessionDataService) { }

  login(username: string, password: string) {
    return this.authDataService.login(username, password).pipe(tap((session => this.authStore.login(session as SessionState))));
  }

  logout() {
    this.authDataService.logout();
  }


}
