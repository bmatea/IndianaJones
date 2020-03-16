import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserService } from '../services/user-service.service';
import { SessionQuery } from '../akitaAuth/session.query';

export interface PermissionState {
   permissions: string[];
}

export function createInitialState(): PermissionState {
  return {
    permissions: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Permission' })
export class PermissionStore extends Store<PermissionState> {

  constructor(private userService: UserService, private query: SessionQuery) {
    super(createInitialState());
  }
}

