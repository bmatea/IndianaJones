import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PregledZahtjevaService{

  detaljiBaseUrl = '/api/sporazum?'; //sporazumId=x&mail=y
  preuzmiDokumenteBaseUrl = '/api/DownloadFiles?sporazumId=';
  prilaganjeDokumenataBaseUrl = '/api/UploadFiels';

  constructor(private http: HttpClient) { }

  getDetails(sporazumId, email) {
    return this.http.get('http://172.22.3.100:32603/tk_suglasnost/api/sporazum?sporazumId=' + sporazumId + '&mail=' + email);
  }

  downloadFiles(sporazumId) {
    return this.http.get('http://wsapi.ht.ba/TK_SUGLASNOST/api/DownloadFiles?sporazumId=782678' );
  }

  uploadFiles(formData) {
    return this.http.post<any>('http://172.22.3.100:32603/tk_suglasnost/api/UploadFiles', formData);
  }

}
