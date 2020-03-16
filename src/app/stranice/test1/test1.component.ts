import { Component, OnInit, Input } from '@angular/core';
import { StranicaComponent } from '../../interfaces/stranica-component';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit, StranicaComponent {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
