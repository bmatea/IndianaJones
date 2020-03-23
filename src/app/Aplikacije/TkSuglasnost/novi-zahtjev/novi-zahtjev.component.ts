import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { TkSuglasnostService } from './tk-suglasnost.service';

@Component({
  selector: 'app-novi-zahtjev',
  templateUrl: './novi-zahtjev.component.html',
  styleUrls: ['./novi-zahtjev.component.css']
})
export class NoviZahtjevComponent implements OnInit {

  public mjesta$: Observable<any>;
  public ulice$: Observable<any>;
  public opcine$: Observable<any>;
  public poste$: Observable<any>;
  public trasa_mjesta$: Observable<any>;
  public trasa_ulice$: Observable<any>;
  public trasa_opcine$: Observable<any>;
  public trasa_poste$: Observable<any>;

  form: FormGroup;
  public korisnikType = true;

  constructor(private builder: FormBuilder,private service: TkSuglasnostService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.builder.group({
      osobniPodaci: this.builder.group({
        privatniKorisnik: [true, []],
        ime: ['', [Validators.required]],
        prezime: ['', [Validators.required]],
        naziv: ['', [Validators.required]],
        dodatak: ['', [Validators.required]],
        tel: ['', [Validators.required]],
        email: ['', [Validators.required]],
      }),
      adresaZaDostavu: this.builder.group({
        ime: ['', [Validators.required]],
        prezime: ['', [Validators.required]],
        naziv: ['', [Validators.required]],
        dodatak1: ['', [Validators.required]],
        mjesto: ['', [Validators.required]],
        ulica: ['null', [Validators.required]],
        kucniBr: ['', [Validators.required]],
        dodatak: ['', [Validators.required]],
        napomena: ['', [Validators.required]],
        opcina: ['', [Validators.required]],
        posta: ['', [Validators.required]],
        noAdresa: [false, [Validators.required]],
        opisnaAdresa: [{value: '', disabled: true}, [Validators.required]],
      }),
      podaciOLokaciji: this.builder.group({
        tipSuglasnosti: ['', [Validators.required]],
        kokc: ['', [Validators.required]],
        svrha: ['', [Validators.required]],
        mjesto: ['', [Validators.required]],
        ulica: ['null', [Validators.required]],
        kucniBr: ['', [Validators.required]],
        dodatak: ['', [Validators.required]],
        napomena: ['', [Validators.required]],
        opcina: ['', [Validators.required]],
        posta: ['', [Validators.required]],
        noAdresa: [false, [Validators.required]],
        opisnaAdresa: [{value: '', disabled: true}, [Validators.required]],
      })

    });

    this.form.get('adresaZaDostavu.noAdresa').valueChanges.subscribe(v => this.onCheckboxChecked(v, 'adresaZaDostavu'));
    this.form.get('podaciOLokaciji.noAdresa').valueChanges.subscribe(v => this.onCheckboxChecked(v, 'podaciOLokaciji'));

    this.mjesta$ = this.trasa_mjesta$ = this.service.getMjesta();
  }

  onCheckboxChecked(value, form) {
    if (value) {
      this.form.get(form + '.kucniBr').disable();
      this.form.get(form + '.napomena').disable();
      this.form.get(form + '.dodatak').disable();

      this.form.get(form + '.opisnaAdresa').enable();
    } else {
      this.form.get(form + '.kucniBr').enable();
      this.form.get(form + '.napomena').enable();
      this.form.get(form + '.dodatak').enable();

      this.form.get(form + '.opisnaAdresa').disable();
    }
  }

  radioChange() {
    //console.log(this.form.get('osobniPodaci.privatniKorisnik'));
    //console.log( !!this.form.get('osobniPodaci.privatniKorisnik').value);
  }

  isPrivatni() {
    return !!this.form.get('osobniPodaci.privatniKorisnik').value;
  }

  onSelectChange(e) {
    this.ulice$ = this.service.getUlice(e.target.value);
    this.opcine$ = this.service.getOpcine(e.target.value);
    this.poste$ = this.service.getPoste(e.target.value);

    this.cd.detectChanges();
  }

  onSelectChangeTrasa(e) {
    this.trasa_ulice$ = this.service.getUlice(e.target.value);
    this.trasa_opcine$ = this.service.getOpcine(e.target.value);
    this.trasa_poste$ = this.service.getPoste(e.target.value);

    this.cd.detectChanges();
  }

}
