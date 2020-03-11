import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageName = 'Settings';

  constructor() { }

  set(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  getAll() {
    return localStorage.getItem(this.storageName);
  }

  getUsername() {
    return localStorage.getItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearAll() {
    localStorage.clear();
  }
}
