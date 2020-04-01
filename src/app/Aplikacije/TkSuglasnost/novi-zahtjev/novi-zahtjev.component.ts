import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidationErrors } from '@angular/forms';
import { TkSuglasnostService } from './tk-suglasnost.service';
import { ThrowStmt } from '@angular/compiler';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-novi-zahtjev',
  templateUrl: './novi-zahtjev.component.html',
  styleUrls: ['./novi-zahtjev.component.css']
})
export class NoviZahtjevComponent implements OnInit {

  public mjesta$: Observable<any>;
  public ulice;
  public opcine;
  public poste;
  public trasa_mjesta$: Observable<any>;
  public trasa_ulice;
  public trasa_opcine;
  public trasa_poste;

  tipStrankeId: string;
  naziv1: string;
  naziv2: string;
  tKontaktaId: string;
  vAdreseId1TkSuglasnost: string;
  vAdrese1AdresaObavijest: string;
  statusIdTkSuglasnost: string;
  statusIdAdresaObavijest: string;

  opisna1True;
  opisna2True;

  form: FormGroup;
  public korisnikType = true;

  constructor(private builder: FormBuilder, private service: TkSuglasnostService, public cd: ChangeDetectorRef, private shared: SharedService) { }

  ngOnInit() {
    this.form = this.builder.group({
      stranka: this.builder.group({
        privatniKorisnik: [true, []],
        ime: ['', [Validators.required]],
        prezime: ['', [Validators.required]],
        naziv: ['', []],
        dodatak: ['', []],
        tel: ['', [Validators.required]],
        email: ['', [Validators.required]],
      }),
      adresaObavijest: this.builder.group({
        ime: ['', [Validators.required]],
        prezime: ['', [Validators.required]],
        naziv: ['', []],
        dodatak: ['', []],
        mjesto: ['null', [Validators.required]],
        ulica: ['null', [Validators.required]],
        kucniBr: ['', []],
        dodatak1: ['', []],
        napomena: ['', []],
        opcina: ['null', [Validators.required]],
        posta: ['null', [Validators.required]],
        noAdresa: [false, []],
        opisnaAdresa: [{value: '', disabled: true}, []],
      }),
      adresaTKSuglasnost: this.builder.group({
        tipSuglasnosti: ['null', [Validators.required]],
        kokc: ['', [Validators.required]],
        svrha: ['null', [Validators.required]],
        mjesto: ['', [Validators.required]],
        ulica: ['null', []],
        kucniBr: ['', []],
        dodatak: ['', []],
        napomena: ['', []],
        opcina: ['', [Validators.required]],
        posta: ['', [Validators.required]],
        noAdresa: [false, []],
        opisnaAdresa: [{value: '', disabled: true}, []],
      })

    });

    this.form.get('adresaObavijest.noAdresa').valueChanges.subscribe(v => this.onCheckboxChecked(v, 'adresaObavijest'));
    this.form.get('adresaTKSuglasnost.noAdresa').valueChanges.subscribe(v => this.onCheckboxChecked(v, 'adresaTKSuglasnost'));

    this.mjesta$ = this.trasa_mjesta$ = this.service.getMjesta();
  }

  onCheckboxChecked(value, form) {
    if (form === 'adresaObavijest') {
      this.opisna1True = true;

    } else {
      this.opisna2True = true;
    }
    if (value) {
      this.form.get(form + '.kucniBr').disable();
      this.form.get(form + '.napomena').disable();
      if (form === 'adresaObavijest') {
        this.form.get(form + '.dodatak1').disable();
      } else {
        this.form.get(form + '.dodatak').disable();
      }

      this.form.get(form + '.opisnaAdresa').enable();
      this.form.get(form + '.opisnaAdresa').setValidators([Validators.required]);
      this.form.get(form + '.opisnaAdresa').updateValueAndValidity();

    } else {
      this.form.get(form + '.kucniBr').enable();
      this.form.get(form + '.napomena').enable();
      if (form === 'adresaObavijest') {
        this.form.get(form + '.dodatak1').enable();
      } else {
        this.form.get(form + '.dodatak').enable();
      }

      this.form.get(form + '.opisnaAdresa').disable();
      this.form.get(form + '.opisnaAdresa').clearValidators();
      this.form.get(form + '.opisnaAdresa').updateValueAndValidity();
    }
  }

  radioChange() {
    //console.log(this.form.get('stranka.privatniKorisnik'));
    //console.log( !!this.form.get('stranka.privatniKorisnik').value);
    const required1 = this.isPrivatni() ? "ime" : "naziv";
    const required2 = this.isPrivatni() ? "prezime" : "dodatak";
    const hidden1 = required1 === "ime" ? "naziv" : "ime";
    const hidden2 = required2 === "prezime" ? "dodatak" : "prezime";

    //stranka
    this.form.get('stranka.' + required1).setValidators([Validators.required]);
    this.form.get('stranka.' + required1).updateValueAndValidity();
    this.form.get('stranka.' + required2).setValidators([Validators.required]);
    this.form.get('stranka.' + required2).updateValueAndValidity();
    this.form.get('stranka.' + hidden1).clearValidators();
    this.form.get('stranka.' + hidden1).updateValueAndValidity();
    this.form.get('stranka.' + hidden2).clearValidators();
    this.form.get('stranka.' + hidden2).updateValueAndValidity();
    //adresaObavijest
    this.form.get('adresaObavijest.' + required1).setValidators([Validators.required]);
    this.form.get('adresaObavijest.' + required1).updateValueAndValidity();
    this.form.get('adresaObavijest.' + required2).setValidators([Validators.required]);
    this.form.get('adresaObavijest.' + required2).updateValueAndValidity();
    this.form.get('adresaObavijest.' + hidden1).clearValidators();
    this.form.get('adresaObavijest.' + hidden1).updateValueAndValidity();
    this.form.get('adresaObavijest.' + hidden2).clearValidators();
    this.form.get('adresaObavijest.' + hidden2).updateValueAndValidity();

  }

  isPrivatni() {
    return !!this.form.get('stranka.privatniKorisnik').value;
  }

  onSelectChange(e) {
      if(e.target.value != "null") {
      this.service.getUlice(e.target.value).subscribe(ulice => {
        this.ulice = ulice.sort((a,b) => a.naziv.localeCompare(b.naziv));
        if (ulice.length === 1) {
          this.form.get('adresaObavijest.ulica').setValue(ulice[0].geoId);
        }
      });
      this.service.getOpcine(e.target.value).subscribe(opcine => {
        this.opcine = opcine.sort((a,b) => a.naziv.localeCompare(b.naziv));
        if (opcine.length === 1) {
          this.form.get('adresaObavijest.opcina').setValue(opcine[0].geoId);
        }
      });
      this.service.getPoste(e.target.value).subscribe(poste => {
        this.poste = poste;
        if (poste.length === 1) {
          this.form.get('adresaObavijest.posta').setValue(poste[0].geoId);
        }
      });

      this.cd.detectChanges();
    } else {
      this.ulice = this.opcine = this.poste = null;
      this.cd.detectChanges();
    }
  }

  onSelectChangeTrasa(e) {
    if (e.target.value != "null") {

      this.service.getUlice(e.target.value).subscribe(ulice => {
        this.trasa_ulice = ulice;
        if (ulice.length === 1) {
          this.form.get('adresaTKSuglasnost.ulica').setValue(ulice[0].geoId);
        }
      });
      this.service.getOpcine(e.target.value).subscribe(opcine => {
        this.trasa_opcine = opcine;
        if (opcine.length === 1) {
          this.form.get('adresaTKSuglasnost.opcina').setValue(opcine[0].geoId);
        }
      });
      this.service.getPoste(e.target.value).subscribe(poste => {
        this.trasa_poste = poste;
        if (poste.length === 1) {
          this.form.get('adresaTKSuglasnost.posta').setValue(poste[0].geoId);
        }
      });
      this.cd.detectChanges();
    } else {
      this.trasa_ulice = this.trasa_opcine = this.trasa_poste = null;
    }
  }

  uliceLoaded(ulice, uliceArrayLength) {
    if (uliceArrayLength === 1) {
      this.form.get('adresaObavijest.ulica').setValue(ulice[0]);
      this.cd.detectChanges();
      return true;
    }


    this.cd.detectChanges();
    return false;
  }

  get ao() { return this.form.get('adresaObavijest'); }
  get ats() { return this.form.get('adresaTKSuglasnost'); }
  get s() { return this.form.get('stranka'); }

  hasErrors(control) {
    //console.log(this.form.get(control).valid);
    if (this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty)) {
      return true;
    } else {
      return false;
    }
  }

  send() {
    if (this.form.invalid) {
     this.form.markAllAsTouched();
     console.log('invalid')
      return;
    } else {
      //console.log(this.form.value)
      const adresaObavijestFormValue = this.form.get('adresaObavijest').value;
      const adresaTKSuglasnostFormValue = this.form.get('adresaTKSuglasnost').value;
      const strankaFormValue = this.form.get('stranka').value;

      const adresaObavijest = {
        naziv1: this.isPrivatni() ? adresaObavijestFormValue['ime'] : adresaObavijestFormValue['naziv'],
        naziv2:  this.isPrivatni() ? adresaObavijestFormValue['prezime'] : adresaObavijestFormValue['dodatak'],
        mjestoId: adresaObavijestFormValue['mjesto'],
        ulicaId: adresaObavijestFormValue['ulica'],
        kucniBroj: adresaObavijestFormValue['kucniBr'],
        kBrDodatak: adresaObavijestFormValue.dodatak1,
        opcinaId: adresaObavijestFormValue['opcina'],
        postaId: adresaObavijestFormValue['posta'],
        napomena: adresaObavijestFormValue['napomena'],
        vAdreseId: this.opisna1True ? 20 : 10,
        opisnaAdresaTxt: this.opisna1True ? adresaObavijestFormValue['opisnaAdresa'] : '',
        statusId: 1,
      };

      const adresaTKSuglasnost = {
        mjestoId: adresaTKSuglasnostFormValue['mjesto'],
        ulicaId: adresaTKSuglasnostFormValue['ulica'],
        kucniBroj: adresaTKSuglasnostFormValue['kucniBr'],
        kBrDodatak: adresaTKSuglasnostFormValue['dodatak'],
        opcinaId: adresaTKSuglasnostFormValue['opcina'],
        postaId: adresaTKSuglasnostFormValue['posta'],
        napomena: adresaTKSuglasnostFormValue['napomena'],
        vAdreseId: this.opisna2True ? 20 : 10,
        opisnaAdresaTxt: this.opisna2True ? adresaTKSuglasnostFormValue['opisnaAdresa'] : '',
        statusId: 1
      };
      const atrikbutiTK = {
        svrha: {
          lvstavkaId: adresaTKSuglasnostFormValue['svrha'],
          // tslint:disable-next-line: max-line-length
          naziv:  adresaTKSuglasnostFormValue['svrha'] === '2309' ? 'Izgradnja' : adresaTKSuglasnostFormValue['svrha'] === '2310' ? 'Legalizacija' : 'Rekonstrukcija'
        },
        tipSuglasnosti: {
          lvstavkaId: adresaTKSuglasnostFormValue['tipSuglasnosti'],
          naziv:  adresaTKSuglasnostFormValue['tipSuglasnosti'] === '1729' ? 'Lokacija' : 'Trasa'
        },
        opis: adresaTKSuglasnostFormValue['kokc'],
        prilozi: '-',

      };

      const stranka = {
        naziv1: this.isPrivatni() ? strankaFormValue['ime'] : strankaFormValue['naziv'],
        naziv2: this.isPrivatni() ? strankaFormValue['prezime'] : strankaFormValue['dodatak'],
        tipStrankeId: this.isPrivatni() ? 10 : 20,
        kontakti: [
          {
            tKontaktaId: 10,
            kontakt: strankaFormValue['tel']
          },
          {
            tKontaktaId: 30,
            kontakt: strankaFormValue['email']
          }
        ]
      };

      let payload = {
        "stranka": stranka,
        "adresaObavijest": adresaObavijest,
        "adresaTKSuglasnost": adresaTKSuglasnost,
        "atributiTK": atrikbutiTK
      };

      //console.log(JSON.stringify(payload));

      this.service.postNoviZahtjev(payload).subscribe(response => {
        console.log(response);
        const sporazum = {
          sporazumId: response['psporazumId'],
          email: stranka.kontakti[1]
        };
        this.shared.updateSporazum(sporazum);
        let tab = document.querySelector('#PregledZahtjeva') as HTMLElement;
        tab.click();
      });
    }
  }

}
