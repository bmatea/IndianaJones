import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionQuery } from '../akitaAuth/session.query';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean;
  isLoggedin: Observable<boolean>;

  constructor(private query: SessionQuery, private service: SessionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.isLoggedin = this.query.isLoggedIn$
    this.isLoggedIn = this.query.isLoggedIn();
  }

  logout() {
    this.service.logout();
    this.isLoggedIn = false;
  }

}
