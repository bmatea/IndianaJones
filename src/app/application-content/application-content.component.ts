import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChildren, QueryList } from '@angular/core';
import { ComponentDirective } from '../component.directive';
import { ComponentItem } from '../models/component-item';
import { StranicaComponent } from '../interfaces/stranica-component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { PermissionQuery } from '../permissions/permission.query';

@Component({
  selector: 'app-application-content',
  templateUrl: './application-content.component.html',
  styleUrls: ['./application-content.component.css']
})
export class ApplicationContentComponent implements OnInit, OnDestroy {

  components: ComponentItem[];
  hosts: QueryList<ViewContainerRef>;
  base = window.location.href;
  active = 1;
  selectedcomponent;
  appName;
 // @ViewChildren('componentHost') public componentHosts: QueryList<ViewContainerRef>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private permissionQuery: PermissionQuery
    ) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params['appId']);
      this.appName = params['appName'];
      //return this.components = JSON.parse(params['components']);
      this.userService.getStranice(params['appId']).subscribe(strs => {
        this.components = strs;
        this.selectedcomponent = this.components[0];
        this.permissionQuery.hasPermission('ROLA_MIGRACIA_IMOVINE').subscribe(imali => console.log("from app content: " + imali));
      });
    });
  }

  ngOnInit() {
    //this.loadComponent();

  }
  ngOnDestroy() {
  }

}
