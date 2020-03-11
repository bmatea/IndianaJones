import { Component, OnInit, Input } from '@angular/core';
import { Application } from '../models/application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @Input() app: Application;
  constructor() { }

  ngOnInit() {
  }

}
