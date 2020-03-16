import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { Modul } from './modul';

@Injectable({
  providedIn: 'root'
})
export class ModulAdapter implements Adapter<Modul> {
  adapt(item: any): Modul {
    return new Modul(item.id, item.naziv);
  }

}
