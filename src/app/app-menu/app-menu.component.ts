import { Component, OnInit } from '@angular/core';
import { Application } from '../models/application';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user-service.service';
import { Observable } from 'rxjs';
import { PermissionQuery } from '../permissions/permission.query';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  apps: Observable<Application[]>;

  constructor(private userService: UserService, private query: PermissionQuery) { }

  ngOnInit() {
    // this.userService.getApps().subscribe(apps => {
    //   console.log(apps);
    //   this.apps = apps;
    // });
    this.apps = this.userService.getApps();
  }

}
