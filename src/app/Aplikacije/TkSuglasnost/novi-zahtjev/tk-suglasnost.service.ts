import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TkSuglasnostService {

  public ulr = 'http://wsapi.ht.ba/TK_SUGLASNOST/api';

  constructor(private http: HttpClient) { }

  getMjesta() {
    return this.http.get(this.ulr + '/mjesta').pipe(
      map((data: any[]) => data.map(item => item)));
  }

  getUlice(mjestoId: string) {
    return this.http.get(this.ulr + '/ulice?mjestoId=' + mjestoId).pipe(
      map((data: any[]) => data.map(item => item)));
  }

  getOpcine(mjestoId: string) {
    return this.http.get(this.ulr + '/opcine?mjestoId=' + mjestoId).pipe(
      map((data:any[]) => data.map(item => item)));
    }

    getPoste(mjestoId: string) {
      return this.http.get(this.ulr + '/poste?mjestoId=' + mjestoId).pipe(
        map((data:any[]) => data.map(item => item)));
  }

  noviZahtjev() {

  }
}
