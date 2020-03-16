import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, ViewChildren, AfterContentInit, QueryList } from '@angular/core';
import { ComponentDirective } from '../component.directive';
import { ComponentItem } from '../models/component-item';
import { StranicaComponent } from '../interfaces/stranica-component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-content',
  templateUrl: './application-content.component.html',
  styleUrls: ['./application-content.component.css']
})
export class ApplicationContentComponent implements OnInit, OnDestroy {

  components: ComponentItem[];
  hosts: QueryList<ViewContainerRef>;
 // @ViewChildren('componentHost') public componentHosts: QueryList<ViewContainerRef>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      return this.components = JSON.parse(params['components']);
    });
  }

  ngOnInit() {
    //this.loadComponent();
  }

  // ngAfterContentInit(): void {
  //   console.log(this.components);
  //   this.componentHosts.changes.subscribe(comps => {
  //     comps.map(
  //       (vcr: ViewContainerRef, index: number) => {
  //         const factory = this.componentFactoryResolver.resolveComponentFactory(
  //           this.components[index].component
  //         );
  //         vcr.createComponent(factory);
  //       }
  //     );
  //   });
  //  // this.componentHosts
  // }

  ngOnDestroy() {
  }

  // loadComponent() {
  //   for (const a of this.components) {
  //     const factory = this.componentFactoryResolver.resolveComponentFactory(a.component);
  //     const viewContainerRef = this.componentHosts.viewContainerRef;
  //     //viewContainerRef.clear();
  //     const componentRef = viewContainerRef.createComponent(factory);
  //     (componentRef.instance as StranicaComponent).data = a.data;
  //   }
  // }

}
