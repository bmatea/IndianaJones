import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionQuery } from './akitaAuth/session.query';
import { LocalStorageService } from './services/local-storage.service';
import { SessionStore } from './akitaAuth/session.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IndianaJones';

constructor(private jwtHelper: JwtHelperService, private store: SessionStore, private storage: LocalStorageService) {}

  ngOnInit() {
    const name = this.storage.getUsername();
    const token = this.storage.getToken();
    if (!this.jwtHelper.isTokenExpired(token)) {
       this.store._setState({name, token});
    }
    else {
      this.storage.clearAll();
    }
  }

  ngOnDestroy() {
    this.storage.clearAll();
  }
}
