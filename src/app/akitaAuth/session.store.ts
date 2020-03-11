import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
   token: string;
   name: string;
}

export function createInitialState(): SessionState {
  return {
    token: null,
    name: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

  login(session: SessionState) {
    this.update(session);
    localStorage.setItem('user', session.name);
    localStorage.setItem('token', session.token);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.update(createInitialState());
  }

}

