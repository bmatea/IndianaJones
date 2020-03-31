import { Component, OnInit, OnDestroy, Sanitizer } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { PregledZahtjevaService } from './pregled-zahtjeva.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pregled-zahtjeva',
  templateUrl: './pregled-zahtjeva.component.html',
  styleUrls: ['./pregled-zahtjeva.component.css']
})
export class PregledZahtjevaComponent implements OnInit, OnDestroy {
  sporazum: object;
  subscription: Subscription;
  details;
  files;
  files_for_upload = [];
  form: FormGroup;
  spinner = false;
  math = Math;

  constructor(private shared: SharedService, private formBuilder: FormBuilder, private service: PregledZahtjevaService, private sanitization: DomSanitizer) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      pregledZahtjeva: this.formBuilder.group({
        sporazumId: ['', []],
        email: ['', []]
      }),
      prilozi: this.formBuilder.group({
        chooseFiles: [null, []]
      })
    });

    this.subscription = this.shared.getSporazum().subscribe(sporazum => {
      this.sporazum = sporazum;
      console.log(this.sporazum);
      if (sporazum['email']) {
        this.form.get('pregledZahtjeva.sporazumId').setValue(sporazum['sporazumId']);
        this.form.get('pregledZahtjeva.email').setValue(sporazum['email']['kontakt']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showDetails() {
    this.downloadFiles(this.form.get('pregledZahtjeva.sporazumId').value);
    this.service.getDetails(this.form.get('pregledZahtjeva.sporazumId').value, this.form.get('pregledZahtjeva.email').value).subscribe(detailsArray => {
      this.details = detailsArray;
    });
  }

  downloadFiles(sporazumId) {
    this.spinner = true;
    this.service.downloadFiles(sporazumId).subscribe((res: Array<any>) => {
      console.log(res);
      this.files = new Array();
      res.forEach(r => {
        if (r) {
          const src =  this.sanitization.bypassSecurityTrustUrl('data:application/pdf;base64,' + r['sadrzaj']);
          const filename = r['naziv'];
          this.files.push({
            "href": src,
            "download": filename
            });
          }
      });
      this.spinner = false;
    });
  }

  inputChange(fs) {
    for(const f of fs) {
      if (f) {
        console.log(f);
        this.files_for_upload.push(f);
      }
    }
    this.form.get('prilozi.chooseFiles').setValue('');
  }

  remove(index) {
    this.files_for_upload.splice(index, 1);
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.service.uploadFiles(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.inProgress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }

  uploadFiles() {
    const formData = new FormData();
    this.files_for_upload.forEach(file => {
      formData.append('file', file);
      formData.append('sporazumId', this.form.get('pregledZahtjeva.sporazumId').value);

    });
    //console.log(formData);
    console.log( this.files_for_upload)
    this.service.uploadFiles(formData).subscribe(res => {
      console.log('Vraceno: ' + res);
    })
  }

}
