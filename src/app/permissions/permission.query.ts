import { Injectable } from '@angular/core';
import { Query, coerceArray } from '@datorama/akita';
import { PermissionStore, PermissionState } from './permission.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PermissionQuery extends Query<PermissionState> {

  constructor(protected store: PermissionStore) {
    super(store);
  }

  hasPermission(permissions: string[] | string): Observable<boolean> {
    const permToCheckArray = coerceArray(permissions);

    return this.select(state => state.permissions).pipe(
      map(userPerms =>  permToCheckArray.every(current => userPerms.includes(current)))
    );
  }

}
