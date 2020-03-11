import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { tap, shareReplay} from 'rxjs/operators';
import { SessionState } from './../akitaAuth/session.store';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<SessionState>{
    return this.http.post<SessionState>('http://localhost:8080/auth/signin', {'username': username, "password": password})
    .pipe(tap((res => {
      console.log(res);
      return this.setSession(res); })));
  }

  private setSession(authResult) {
    console.log(authResult);
    localStorage.setItem('user', authResult.username);
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
