import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor() { }

  ngOnInit() {
  }

}
