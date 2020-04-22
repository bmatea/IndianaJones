import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-app-to-user-modal',
  templateUrl: './add-app-to-user-modal.component.html',
  styleUrls: ['./add-app-to-user-modal.component.css']
})
export class AddAppToUserModalComponent implements OnInit {

  @Input() userId;

  nonAssignedApps;
  cols;
  selectedApps;

  constructor(public activeModal: NgbActiveModal, private service: UserServiceService) { }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID'},
      { field: 'naziv', header: 'Naziv'},
    ];
    this.service.getAppsNotAssignedToUser(this.userId).subscribe(apps => this.nonAssignedApps = apps);
  }

  onAdd() {
    console.log(this.selectedApps);
    for (let app of this.selectedApps) {
      this.service.addAppForUser(app['id'], this.userId).subscribe(res => this.activeModal.close('dodano'));
    }

  }

}
