import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-str-to-app-modal',
  templateUrl: './add-str-to-app-modal.component.html',
  styleUrls: ['./add-str-to-app-modal.component.css']
})
export class AddStrToAppModalComponent implements OnInit {

  @Input() appId;
  @Input() appName;
  selectedStrs;
  nonassignedStrs;
  stranice;
  cols;

  constructor(public activeModal: NgbActiveModal, private service: UserServiceService) { }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID'},
      { field: 'naziv', header: 'Naziv'},
    ];
    this.service.getStraniceNotAssignedToApp(this.appId).subscribe(strs => this.stranice = strs);
  }

  onAdd() {
    for (const s of this.selectedStrs) {
      this.service.addStrToApp(s['id'], this.appId).subscribe(res => {
        res === 1 ? this.activeModal.close('dodano') : this.activeModal.close('error');
      });
    }
  }

}
