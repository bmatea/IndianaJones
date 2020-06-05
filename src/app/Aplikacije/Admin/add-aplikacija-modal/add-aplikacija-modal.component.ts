import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-aplikacija-modal',
  templateUrl: './add-aplikacija-modal.component.html',
  styleUrls: ['./add-aplikacija-modal.component.css']
})
export class AddAplikacijaModalComponent implements OnInit {
  form;
  layoutIds;

  constructor(public activeModal: NgbActiveModal, private service: UserServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      naziv: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      oznaka: ['', Validators.required]
    });
  }

  onAdd() {
    this.service.addAplikacija(this.form.get('oznaka').value, this.form.get('naziv').value, this.form.get('opis').value).subscribe(res => {
      if (res === 1) {
        this.activeModal.close('dodano');
      } else {
        this.activeModal.close('error');
      }
    });

  }

  hasErrors(control) {
    if (this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty)) {
      return true;
    } else {
      return false;
    }
  }

}
