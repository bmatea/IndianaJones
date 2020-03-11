import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionQuery } from '../akitaAuth/session.query';
import { Observable } from 'rxjs';
import { Application } from '../models/application';
import { Adapter } from '../interfaces/adapter';
import { map } from 'rxjs/operators';
import { AppAdapter } from '../models/adapter';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private router: Router, private http: HttpClient, private query: SessionQuery, private adapter: AppAdapter) { }

  getApps(): Observable<Application[]> {
    return this.http.get('http://localhost:8080/prismVezeKorisniciApp/' + this.query.getUsername()).pipe(
      map((data: any[]) => data.map(item => this.adapter.adapt(item)))
    );
  }

  getModuli() {

  }

  getStranice() {

  }
}
