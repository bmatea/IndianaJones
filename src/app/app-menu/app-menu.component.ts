import { Component, OnInit } from '@angular/core';
import { Application } from '../models/application';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  apps: Application[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getApps().subscribe(apps => {
      console.log(apps);
      this.apps = apps
    });
  }

}
