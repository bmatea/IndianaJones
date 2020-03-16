import { Directive, Input, ViewContainerRef, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PermissionQuery } from './permission.query';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit, OnDestroy{

  @Input('hasPermission') checkPermission: string[] | string;
  private subscription: Subscription;

  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>,
    private query: PermissionQuery
  ) { }

  ngOnInit() {
    this.query.hasPermission(this.checkPermission).subscribe(hasPermission => {
      this.vcr.clear();
      if (hasPermission) {
        this.vcr.createEmbeddedView(this.tpl);
      }
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}
