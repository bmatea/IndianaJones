import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery } from './session.query';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private router: Router, private sessionQuery: SessionQuery, private jwtHeper: JwtHelperService) {}

  canActivate(): boolean {
    if (this.sessionQuery.isLoggedIn() || !this.jwtHeper.isTokenExpired(this.jwtHeper.tokenGetter())) {
      //console.log(localStorage.getItem('token'));
      return true;
    }

    this.router.navigateByUrl('login');
    return false;
  }
}
