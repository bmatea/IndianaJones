import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '../akitaAuth/session.query';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private query: SessionQuery, private service: SessionService) { }

  ngOnInit() {
    this.isLoggedIn = this.query.isLoggedIn();
  }

  logout() {
    this.service.logout();
  }

}
