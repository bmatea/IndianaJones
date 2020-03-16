import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionQuery } from '../akitaAuth/session.query';
import { Observable } from 'rxjs';
import { Application } from '../models/application';
import { Adapter } from '../interfaces/adapter';
import { map } from 'rxjs/operators';
import { AppAdapter } from '../models/adapter';
import { StraniceAdapter } from '../models/stranice-adapter';
import { ModulAdapter } from '../models/modul-adapter';
import { components } from '../componentMap';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private router: Router,
    private http: HttpClient,
    private query: SessionQuery,
    private adapter: AppAdapter,
    private strAdapter: StraniceAdapter,
    private modulAdapter: ModulAdapter,
    ) { }

  getApps(): Observable<Application[]> {
    return this.http.get('http://localhost:8080/prismVezeKorisniciApp/' + this.query.getUsername()).pipe(
      map((data: any[]) => data.map(item => this.adapter.adapt(item)))
    );
  }

  getModuli(appId: string) {
    return this.http.get('http://localhost:8080/prismVezeKorisniciModuli/' + this.query.getUsername() + '/' + appId).pipe(
      map((data: any[]) => data.map(item => this.modulAdapter.adapt(item)))
    );
  }

  getRole(korisnikId: string) {
    return this.http.get('http://localhost:8080/odnosiKorisnika/' + korisnikId).pipe(
      map((data: any[]) => data)
      );
    }

  getStranice(appId: string) {
    return this.http.get('http://localhost:8080/prismVezeAppStr/' + appId).pipe(
      map((data: any[]) => data.map(item => this.strAdapter.adapt(item)))
    );
  }
}
