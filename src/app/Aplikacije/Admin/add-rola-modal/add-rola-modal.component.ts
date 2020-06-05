import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-rola-modal',
  templateUrl: './add-rola-modal.component.html',
  styleUrls: ['./add-rola-modal.component.css']
})
export class AddRolaModalComponent implements OnInit {

  @Input() appId;
  @Input() userId;
  cols;
  role;
  selectedRole;
  constructor(public activeModal: NgbActiveModal, private service: UserServiceService) { }

  ngOnInit() {
    this.cols = [
      { field: 'korisnikId', header: 'ID'},
      { field: 'naziv', header: 'Naziv'}
    ];
    this.service.getRoleNotAssignedToUserAndApp(this.userId, this.appId).subscribe(role => {
      console.log((role as Array<any>).length === 0);
      if ((role as Array<any>).length !== 0) {
        this.role = role;
      }
    });
  }

  addRola() {
    for (const rola of this.selectedRole) {
      this.service.addRolaForUser(rola['korisnikId'], this.userId).subscribe(res => {
        console.log(res);
        res === 1 ? this.activeModal.close('dodano') : this.activeModal.close('error');
      }, err => {
        console.log(err);
        this.activeModal.close('error');
      });
    }
  }

}
