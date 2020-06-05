import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {

  form;
  constructor(public activeModal: NgbActiveModal, private service: UserServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      korisnik_id: ['', [Validators.required]],
      naziv: ['', []],
      email: ['', []],
      tip: [null, [Validators.required, Validators.nullValidator]],
      ime: ['', []],
      prezime: ['', []],
      lozinka: ['', []]
    });
  }

  hasErrors(control) {
    if (this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty)) {
      return true;
    } else {
      return false;
    }
  }

  onAdd() {
    if (!this.form.invalid)
    {
      const id = this.form.get('korisnik_id').value;
      const naziv = this.form.get('naziv').value;
      const email = this.form.get('email').value;
      const tip = this.form.get('tip').value;
      const ime = this.form.get('ime').value;
      const prezime = this.form.get('prezime').value;
      const lozinka = this.form.get('lozinka').value;
      this.service.addUser(id, naziv, email, tip, ime, prezime, lozinka).subscribe(res => {
        if (res === 1) {
          this.activeModal.close('dodano');
        } else {
          this.activeModal.close('error');
        }
      });
    }
  }

}
