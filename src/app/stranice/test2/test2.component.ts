import { Component, OnInit, Input } from '@angular/core';
import { StranicaComponent } from '../../interfaces/stranica-component';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit, StranicaComponent {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
