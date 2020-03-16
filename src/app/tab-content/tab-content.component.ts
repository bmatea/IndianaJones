import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ComponentDirective } from '../component.directive';
import { ComponentItem } from '../models/component-item';
import { StranicaComponent } from '../interfaces/stranica-component';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {

  @Input() component;
  @ViewChild(ComponentDirective, {static: true}) host: ComponentDirective;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const item: ComponentItem = this.component;
    const factory = this.resolver.resolveComponentFactory(item.component);
    const viewContainerRef = this.host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(factory);
    (componentRef.instance as StranicaComponent).data = item.data;
  }

}
