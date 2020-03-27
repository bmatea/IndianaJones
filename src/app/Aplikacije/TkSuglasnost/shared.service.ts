import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sporazum = new BehaviorSubject<any>('');

  getSporazum() {
    return this.sporazum.asObservable();
  }

  updateSporazum(sporazum) {
    this.sporazum.next(sporazum);
  }

  constructor() { }
}
