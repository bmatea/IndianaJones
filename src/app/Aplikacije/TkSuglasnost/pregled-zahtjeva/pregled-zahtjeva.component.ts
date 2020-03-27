import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PregledZahtjevaService } from './pregled-zahtjeva.service';

@Component({
  selector: 'app-pregled-zahtjeva',
  templateUrl: './pregled-zahtjeva.component.html',
  styleUrls: ['./pregled-zahtjeva.component.css']
})
export class PregledZahtjevaComponent implements OnInit, OnDestroy {
  sporazum: object;
  subscription: Subscription;
  details;
  form: FormGroup;

  constructor(private shared: SharedService, private formBuilder: FormBuilder, private service: PregledZahtjevaService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      pregledZahtjeva: this.formBuilder.group({
        sporazumId: ['', []],
        email: ['', []]
      }),
      prilozi: this.formBuilder.group({
        chooseFiles: ['', []]
      })
    });

    this.subscription = this.shared.getSporazum().subscribe(sporazum => {
      this.sporazum = sporazum;
      console.log(this.sporazum);
      this.form.get('pregledZahtjeva.sporazumId').setValue(this.sporazum['sporazumId']);
      this.form.get('pregledZahtjeva.email').setValue(this.sporazum['email.kontakt']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showDetails() {
    this.service.getDetails(this.form.get('pregledZahtjeva.sporazumId').value, this.form.get('pregledZahtjeva.email').value).subscribe(detailsArray => {
      this.details = detailsArray;
    });
  }

}
