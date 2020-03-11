import { Application } from './application';
import { Adapter } from '../interfaces/adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppAdapter implements Adapter<Application> {
  adapt(item: any): Application {
    return new Application(item.id, item.naziv);
  }
}
