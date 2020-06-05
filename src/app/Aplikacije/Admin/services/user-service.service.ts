import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:8080/korisniciRole/getUsers');
  }

  getUserApps(id) {
    return this.http.get('http://localhost:8080/prismVezeKorisniciApp/' + id);
  }

  getRoleForApp(userId, appId) {
    return this.http.get('http://localhost:8080/korisniciRole/getRoleForApp/' + userId + '/' + appId);
  }

  getAplikacije() {
    return this.http.get('http://localhost:8080/all/prismAplikacije');
  }

  getStranice(appId) {
    return this.http.get('http://localhost:8080/prismVezeAppStr/' + appId);
  }

  getAppsNotAssignedToUser(userId) {
    return this.http.get('http://localhost:8080/prismVezeKorisniciNotApp/' + userId);
  }

  getRoleNotAssignedToUserAndApp(userId, appId) {
    return this.http.get('http://localhost:8080/korisniciRole/getUnassignedRole/' + userId + '/' + appId);
  }

  getStraniceNotAssignedToApp(appId) {
    return this.http.get('http://localhost:8080/prismVezeAppStrNot/' + appId);
  }

  getAllStranice() {
    return this.http.get('http://localhost:8080/all/prismStranice');
  }

  addAppForUser(appId, userId) {
    const body = JSON.stringify(
      {
        aplikacijaId: appId,
        korisnikId: userId
      }
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/prismVezeKorisniciApp', body, {headers: headers});
  }

  removeAppForUser(appId, userId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete('http://localhost:8080/prismVezeKorisniciApp/' + userId + '/' + appId, {headers: headers});
  }

  addUser(korisnikId, naziv, email, tip, ime, prezime, lozinka) {
    const body = JSON.stringify({
      korisnikId: korisnikId,
      naziv: naziv,
      email: email,
      tkorisnikaId: tip,
      ime: ime,
      prezime: prezime,
      lozinka: lozinka
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/korisniciRole', body, { headers: headers});
  }

  removeUser(userId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete('http://localhost:8080/korisniciRole/' + userId, {headers: headers});
  }

  addAplikacija(oznaka, naziv, opis) {
    const body = JSON.stringify(
      {
        oznaka: oznaka,
        naziv: naziv,
        opis: opis,
      }
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/prismAplikacije', body, { headers: headers });
  }

  removeAplikacija(appId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete('http://localhost:8080/prismAplikacije/' + appId, {headers: headers});
  }

  addRolaForUser(rolaId, userId) {
    const body = JSON.stringify(
      {
        korisnikId1: userId,
        korisnikId2: rolaId,
      }
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/odnosiKorisnika', body, { headers: headers });
  }

  removeRolaForUser(rolaId, userId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete('http://localhost:8080/odnosiKorisnika/' + userId + '/' + rolaId, { headers: headers });
  }

  addStranica(naziv, oznaka) {
    const body = JSON.stringify(
      {
        oznaka: oznaka,
        naziv: naziv,
      }
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/prismStranice', body, { headers: headers });
  }

  removeStranica(strId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete('http://localhost:8080/prismStranice/' + strId, { headers: headers });
  }

  addStrToApp(strId, appId) {
    const body = JSON.stringify(
      {
        aplikacijaId: appId,
        stranicaId: strId
      }
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/prismVezeAppStr', body, { headers: headers });
  }

  removeStrFromApp(strId, appId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete('http://localhost:8080/prismVezeAppStr/' + appId + '/' + strId, {headers: headers});
  }
}
