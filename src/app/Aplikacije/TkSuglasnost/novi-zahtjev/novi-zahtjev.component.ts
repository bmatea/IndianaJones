import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

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
  public tipoviSuglasnosti$: Observable<any>;
  public svrhe$: Observable<any>;
  public trasa_mjesta$;
  public trasa_ulice$;
  public trasa_opcine$;
  public trasa_poste$;

  form: FormGroup;
  public korisnikType = true;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.builder.group({
      osobniPodaci: this.builder.group({
        privatniKorisnik: ["privatni", []],
        ime: ['', [Validators.required]],
        prezime: ['', [Validators.required]],
        naziv: [{value: '', disabled: true}, [Validators.required]],
        dodatak: [{value: '', disabled: true}, [Validators.required]],
        tel: ['', [Validators.required]],
        email: ['', [Validators.required]],
      }),
      adresaZaDostavu: this.builder.group({
        ime: ['', [Validators.required]],
        prezime: ['', [Validators.required]],
        naziv: [{value: '', disabled: true}, [Validators.required]],
        dodatak: ['', [Validators.required]],
        mjesto: ['', [Validators.required]],
        ulica: ['', [Validators.required]],
        kucniBr: ['', [Validators.required]],
        dodatak2: ['', [Validators.required]],
        napomena: ['', [Validators.required]],
        opcina: ['', [Validators.required]],
        posta: ['', [Validators.required]],
      }),
      podaciOLokaciji: this.builder.group({
        tipSuglasnosti: ['', [Validators.required]],
        kokc: ['', [Validators.required]],
        svrha: ['', [Validators.required]],
        mjesto: ['', [Validators.required]],
        ulica: ['', [Validators.required]],
        kucniBr: ['', [Validators.required]],
        dodatak: ['', [Validators.required]],
        napomena: ['', [Validators.required]],
        opcina: ['', [Validators.required]],
        posta: ['', [Validators.required]],
      })

    });
  }

  radioChange() {
    console.log(this.form.get('osobniPodaci.privatniKorisnik'));
  }

}
