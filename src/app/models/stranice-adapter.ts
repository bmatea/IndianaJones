import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { Stranica } from './stranica';
import * as comps from '../componentMap';
import { ComponentItem } from './component-item';

@Injectable({
  providedIn: 'root'
})
export class StraniceAdapter implements Adapter<ComponentItem> {
  stranice = comps.components;

  adapt(item: any): ComponentItem {
    let i = new ComponentItem(this.stranice['Test1Component'], {id: item.id, naziv: item.naziv});
    return i;
  }

}
