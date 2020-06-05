import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { AddAppToUserModalComponent } from '../add-app-to-user-modal/add-app-to-user-modal.component';
import { ModulAdapter } from 'src/app/models/modul-adapter';
import { AddAplikacijaModalComponent } from '../add-aplikacija-modal/add-aplikacija-modal.component';
import { AddStrToAppModalComponent } from '../add-str-to-app-modal/add-str-to-app-modal.component';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddRolaModalComponent } from '../add-rola-modal/add-rola-modal.component';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-admin.w-100',
  templateUrl: './admin.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild('myTable', {static: false}) table: any;
  rows;
  expanded: any = {};
  colMode = ColumnMode;
  cols;
  appCols;
  straniceCols;
  apps = [];
  roleCols;
  strCols;
  role;
  stranice;
  aplCols;
  selected = false;
  appSelected = false;
  selectedUser;
  selectedApp;
  selectedRola;
  selectedAplikacija;
  selectedStr;
  userId;
  appId;
  appDeleteVisible = false;
  rolaDeleteVisible = false;
  strDeleteVisible = false;
  stranicaDeleteVisible = false;
  aplikacijaDeleteVisible = false;
  userDeleteVisible = false;
  selectedAppName;
  selectedStranicaName;
  selectedAplikacijaToDeleteName;
  selectedRolaName;
  stranicaToDeleteId;
  aplikacijaToDeleteId;
  userToDeleteId;
  korisnickaPravaToggle = true;
  aplikacijeToggle = true;
  straniceToggle = true;
  aplikacijeAll;
  straniceAll;
  isFormDisabled = true;
  form;
  alertVisible = false;
  rolaDodanaAlertVisible = false;
  rolaUklonjenaAlertVisible = false;
  userAddedAlertVisible = false;
  userDeletedAlertVisible = false;
  userAddedErrorAlertVisible = false;
  userDeletedErrorAlertVisible = false;
  rolaDodanaErrorAlertVisible = false;
  rolaUklonjenaErrorAlertVisible = false;
  appDodanaAlertVisible = false;
  appDodanaErrorAlertVisible = false;
  appUklonjenaAlertVisible = false;
  appUklonjenaErrorAlertVisible = false;
  aplikacijaDodanaAlertVisible = false;
  aplikacijaDodanaErrorAlertVisible = false;
  aplikacijaUklonjenaAlertVisible = false;
  aplikacijaUklonjenaErrorAlertVisible = false;
  strDodanaAlertVisible = false;
  strDodanaErrorAlertVisible = false;
  strUklonjenaAlertVisible = false;
  strUklonjenaErrorAlertVisible = false;
  stranicaDodanaErrorAlertVisible = false;
  stranicaUklonjenaAlertVisible = false;
  stranicaUklonjenaErrorAlertVisible = false;

  constructor(private service: UserServiceService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      naziv: ['', [Validators.required]],
      oznaka: ['', [Validators.required]],
    });
    this.service.getUsers().subscribe(data => this.rows = data);
    this.cols = [
      { field: 'korisnikId', header: 'ID' },
      { field: 'ime', header: 'Ime' },
      { field: 'prezime', header: 'Prezime' },
      //{ field: 'odjelId', header: 'Odjel'}
      { field: 'email', header: 'Email' },
    ];
    this.appCols = [
      { field: 'id', header: 'ID'},
      { field: 'naziv', header: 'Naziv'}
    ];
    this.roleCols = [
      { field: 'korisnikId', header: 'ID'},
      { field: 'naziv', header: 'Naziv'}
    ];
    this.aplCols = [
      {field: 'aplikacijaId', header: 'ID'},
      {field: 'naziv', header: 'Naziv'},
      {field: 'statusId', header: 'Status'},
     // {field: 'layoutAppId', header: 'Layout ID'},
    ];
    this.strCols = [
      { field: 'id', header: 'ID'},
      { field: 'naziv', header: 'Naziv'},
    ];
    this.straniceCols = [
      { field: 'id', header: 'ID'},
      { field: 'oznaka', header: 'Oznaka'},
      { field: 'naziv', header: 'Naziv'},
      { field: 'statusId', header: 'Status'},
    ];
    this.service.getAplikacije().subscribe(apps => this.aplikacijeAll = apps);
    this.service.getAllStranice().subscribe(strs => this.straniceAll = strs);
  }


  // toggleExpandRow(row) {
  //   console.log('Toggled Expand Row!', row);
  //   this.table.rowDetail.toggleExpandRow(row);
  // }

  // onDetailToggle(event) {
  //   console.log('Detail Toggled', event);
  // }

  rowUserSelect(e) {
    this.userId = e.data.korisnikId;
    this.service.getUserApps(this.userId).subscribe((apps: any[]) => this.apps = apps);
    this.selected = true;
    this.role = [];
    this.selectedApp = '';
    this.selectedRola = '';
  }

  rowAppSelected(e) {
    this.appSelected = true;
    this.appId = e.data.id;
    this.service.getRoleForApp(this.userId, this.appId).subscribe(role => this.role = role);
    this.selectedAppName = this.selectedApp.naziv;
    this.selectedRola = '';
  }

  rowAppUnselected() {
    this.appSelected = false;
    this.appDeleteVisible = false;
    this.role = [];
  }

  rowUserUnselected() {
    this.selected = false;
    this.apps = [];
    this.apps = this.apps.slice();
    this.role = [];
    this.selectedApp = '';
    this.appDeleteVisible = false;
  }

  delClick(e) {
    console.log(e.id);
    this.appDeleteVisible = true;
  }

  deleteApp() {
    console.log(this.selectedApp.id);
    this.service.removeAppForUser(this.selectedApp.id, this.selectedUser.korisnikId).subscribe(res => {
      this.appDeleteVisible = false;
      if (res === 1) {
        this.service.getUserApps(this.selectedUser.korisnikId).subscribe((apps: any[]) => this.apps = apps);
        this.selectedRola = '';
        this.appUklonjenaAlertVisible = true;
      } else {
        this.appUklonjenaErrorAlertVisible = true;
      }
    });
  }

  deleteAppNo() {
    this.appDeleteVisible = false;
    this.selectedApp = '';
  }

  addApp() {
    this.openAddAppToUserModal();
  }

  kpToggle() {
    this.korisnickaPravaToggle = true;

  }

  addRola() {
    const mr = this.modalService.open(AddRolaModalComponent);
    mr.componentInstance.userId = this.userId;
    mr.componentInstance.appId = this.appId;
    mr.result.then(res => {
      if (res === 'dodano') {
        this.service.getRoleForApp(this.userId, this.appId).subscribe(r => this.role = r);
        this.rolaDodanaAlertVisible = true;
      } else if (res === 'error') {
        this.rolaDodanaErrorAlertVisible = true;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  delRolaClick(e) {
    this.rolaDeleteVisible = true;
    this.selectedRola = e['korisnikId'];
    this.selectedRolaName = e['naziv'];
  }

  deleteRola() {
    this.service.removeRolaForUser(this.selectedRola, this.userId).subscribe(res => {
      if (res === 1) {
        this.service.getRoleForApp(this.userId, this.appId).subscribe(role => {
          this.role = role;
          this.rolaDeleteVisible = false;
          this.rolaUklonjenaAlertVisible = true;
      });
      } else {
        this.rolaUklonjenaErrorAlertVisible = true;
        this.rolaDeleteVisible = false;
      }
    });
  }

  deleteRolaNo() {
    this.rolaDeleteVisible = false;
    this.selectedRola = '';
  }

  rowAplikacijaSelected() {
    this.service.getStranice(this.selectedAplikacija.id).subscribe(strs => this.stranice = strs);
    this.selectedStr = '';
  }

  rowAplikacijaUnselected() {
    this.selectedStr = '';
  }

  addStranica() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.addStranica(this.form.get('naziv').value, this.form.get('oznaka').value).subscribe(res => {
      if (res === 1) {
        this.service.getAllStranice().subscribe(strs => this.straniceAll = strs);
        this.isFormDisabled = true;
        this.form.reset();
        this.alertVisible = true;
      } else {
        this.stranicaDodanaErrorAlertVisible = true;
        this.isFormDisabled = true;
        this.form.reset();
      }
    });
  }

  deleteStr() {
    this.service.removeStrFromApp(this.selectedStr['id'], this.selectedAplikacija['id']).subscribe(res => {
      if (res === 1) {
        this.strDeleteVisible = false;
        this.selectedStr = '';
        this.service.getStranice(this.selectedAplikacija['id']).subscribe(str => this.stranice = str);
        this.strUklonjenaAlertVisible = true;
      } else {
        this.strDeleteVisible = false;
        this.strUklonjenaErrorAlertVisible = true;
      }
    });
  }

  deleteStrNo() {
    this.strDeleteVisible = false;
    this.selectedStr = false;
  }

  rowStrSelected() {

  }

  rowStrUnselected() {

  }

  delStrClick() {
    this.strDeleteVisible = true;
  }

  openAddAppToUserModal() {
    const modalRef = this.modalService.open(AddAppToUserModalComponent);
    modalRef.componentInstance.userId = this.selectedUser['korisnikId'];
    modalRef.result.then(result => {
      if (result === 'dodano') {
        this.appDodanaAlertVisible = true;
        this.service.getUserApps(this.selectedUser['korisnikId']).subscribe((aps: any[]) => {
          this.apps = aps;
          this.selectedApp = '';
          this.role = [];
        });
      } else if (result === 'error') {
        this.appDodanaErrorAlertVisible = true;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  addAplikacija() {
    const modalRef = this.modalService.open(AddAplikacijaModalComponent);
    modalRef.result.then(res => {
      if (res === 'dodano') {
        this.service.getAplikacije().subscribe(apls => this.aplikacijeAll = apls);
        this.selectedStr = '';
        this.stranice = [];
        this.aplikacijaDodanaAlertVisible = true;
      } else if (res === 'error') {
        this.aplikacijaDodanaErrorAlertVisible = true;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  addStrToApp() {
    const modalRef = this.modalService.open(AddStrToAppModalComponent);
    modalRef.componentInstance.appId = this.selectedAplikacija['id'];
    modalRef.componentInstance.appName = this.selectedAplikacija['naziv'];
    modalRef.result.then(res => {
        if (res === 'dodano') {
          this.service.getStranice(this.selectedAplikacija['id']).subscribe(strs => this.stranice = strs);
          this.selectedStr = '';
          this.strDodanaAlertVisible = true;
        } else if (res === 'error') {
          this.strDodanaErrorAlertVisible = true;
        }
      }
    ).catch(err => {
      console.log(err);
    });
  }

  delStranicaClick(e) {
    console.log('tu');
    console.log(this.stranicaDeleteVisible);
    this.stranicaDeleteVisible = true;
    this.selectedStranicaName = e['naziv'];
    this.stranicaToDeleteId = e['id'];
  }

  deleteStranica() {
    this.service.removeStranica(this.stranicaToDeleteId).subscribe(res => {
      this.stranicaDeleteVisible = false;
      if (res === 1) {
        this.service.getAllStranice().subscribe(strs => this.straniceAll = strs);
        this.stranicaUklonjenaAlertVisible = true;
      } else {
        this.stranicaUklonjenaErrorAlertVisible = true;
      }
    });
  }

  deleteStranicaNo() {
    this.stranicaDeleteVisible = false;
  }

  hasErrors(control) {
    if (this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty)) {
      return true;
    } else {
      return false;
    }
  }

  onOcisti() {
    this.form.reset();
  }

  addUser() {
    const modal = this.modalService.open(AddUserModalComponent);
    modal.result.then(res => {
      if (res === 'dodano') {
        this.userAddedAlertVisible = true;
        this.service.getUsers().subscribe(u => {
          const su = this.selectedUser;
          const sa = this.selectedApp;
          const sr = this.selectedRola;
          const apps = this.apps;
          const role = this.role;
          this.rows = u;
          this.apps = apps;
          this.role = role;
          this.selectedUser = su;
          this.selectedApp = sa;
          this.selectedRola = sr;
        });
      } else if (res === 'error') {
        this.userAddedErrorAlertVisible = true;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  deleteAplikacijaClick(e) {
    this.aplikacijaDeleteVisible = true;
    this.selectedAplikacijaToDeleteName = e['naziv'];
    this.aplikacijaToDeleteId = e['id'];
  }

  deleteAplikacija() {
    this.service.removeAplikacija(this.aplikacijaToDeleteId).subscribe(res => {
      if (res === 1) {
        this.service.getAplikacije().subscribe(aps => this.aplikacijeAll = aps);
        this.stranice = [];
        this.selectedStr = '';
        this.aplikacijaDeleteVisible = false;
        this.aplikacijaUklonjenaAlertVisible = true;
      } else {
        this.aplikacijaUklonjenaErrorAlertVisible = true;
        this.aplikacijaDeleteVisible = false;
      }
    });
  }
  deleteAplikacijaNo() {
    this.aplikacijaDeleteVisible = false;
  }

  delUserClick(e) {
    this.userToDeleteId = e['korisnikId'];
    this.userDeleteVisible = true;
  }

  deleteUser() {
    this.service.removeUser(this.userToDeleteId).subscribe(res => {
      if (res === 1) {
        this.service.getUsers().subscribe(u => {
          this.userDeleteVisible = false;
          this.userDeletedAlertVisible = true;
          this.rows = u;
          this.apps = [];
          this.role = [];
        });
      } else {
        this.userDeleteVisible = false;
        this.userDeletedErrorAlertVisible = true;
      }
    });
  }
}
