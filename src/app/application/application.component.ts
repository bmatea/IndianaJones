import { Component, OnInit, Input } from '@angular/core';
import { Application } from '../models/application';
import { UserService } from '../services/user-service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @Input() app: Application;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  click() {
    this.userService.getStranice(this.app.id).subscribe(items => {
      let params: NavigationExtras = {
        queryParams: {
          'components': JSON.stringify(items)
        }
      };

      let params2: NavigationExtras = {
        queryParams: {
          'appId': this.app.id
        }
      }
      this.router.navigate(['/appContent'], params2);
    });
  }
}
