import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modem-info-modal',
  templateUrl: './modem-info-modal.component.html',
  styleUrls: ['./modem-info-modal.component.css']
})
export class ModemInfoModalComponent implements OnInit {

  @Input() modemInfo;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.modemInfo);
  }

}
