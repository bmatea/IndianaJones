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
  selectedAppName;
  selectedStranicaName;
  selectedAplikacijaToDeleteName;
  selectedRolaName;
  stranicaToDeleteId;
  aplikacijaToDeleteId;
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
      { field: 'odjelId', header: 'Odjel Id' },
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
      {field: 'statusId', header: 'Status ID'},
      {field: 'layoutAppId', header: 'Layout ID'},
    ];
    this.strCols = [
      { field: 'id', header: 'ID'},
      { field: 'naziv', header: 'Naziv'},
    ];
    this.straniceCols = [
      { field: 'id', header: 'ID'},
      { field: 'oznaka', header: 'Oznaka'},
      { field: 'naziv', header: 'Naziv'},
      { field: 'statusId', header: 'Status ID'},
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
      this.service.getUserApps(this.selectedUser.korisnikId).subscribe((apps: any[]) => this.apps = apps);
      this.selectedRola = '';
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
        this.role = [];
        this.selectedApp = '';
        this.rolaDodanaAlertVisible = true;
      }
    }).catch(err => console.log(err));
  }

  delRolaClick(e) {
    this.rolaDeleteVisible = true;
    this.selectedRola = e['korisnikId'];
    this.selectedRolaName = e['naziv'];
  }

  deleteRola() {
    this.service.removeRolaForUser(this.selectedRola, this.userId).subscribe(res => {
      this.service.getRoleForApp(this.userId, this.appId).subscribe(role => {
        this.role = role;
        this.rolaDeleteVisible = false;
        this.rolaUklonjenaAlertVisible = true;
      });
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
      this.service.getAllStranice().subscribe(strs => this.straniceAll = strs);
      this.isFormDisabled = true;
      this.form.reset();
      this.alertVisible = true;
    });
  }

  deleteStr() {
    this.service.removeStrFromApp(this.selectedStr['id'], this.selectedAplikacija['id']).subscribe(res => {
      this.strDeleteVisible = false;
      this.selectedStr = '';
      this.service.getStranice(this.selectedAplikacija['id']).subscribe(str => this.stranice = str);
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
        this.service.getUserApps(this.selectedUser['korisnikId']).subscribe((aps: any[]) => {
          this.apps = aps;
          this.selectedApp = '';
          this.role = [];
        });
      }
    }).catch(err => console.log(err));
  }

  addAplikacija() {
    const modalRef = this.modalService.open(AddAplikacijaModalComponent);
    modalRef.result.then(res => {
      if (res === 'dodano') {
        this.service.getAplikacije().subscribe(apls => this.aplikacijeAll = apls);
        this.selectedStr = '';
        this.stranice = [];
      }
    }).catch(err => console.log(err));
  }

  addStrToApp() {
    const modalRef = this.modalService.open(AddStrToAppModalComponent);
    modalRef.componentInstance.appId = this.selectedAplikacija['id'];
    modalRef.componentInstance.appName = this.selectedAplikacija['naziv'];
    modalRef.result.then(res => {
        if (res === 'dodano') {
          this.service.getStranice(this.selectedAplikacija['id']).subscribe(strs => this.stranice = strs);
          this.selectedStr = '';
        }
      }
    ).catch(err => console.log(err));
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
      this.service.getAllStranice().subscribe(strs => this.straniceAll = strs);
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

  }

  deleteAplikacijaClick(e) {
    this.aplikacijaDeleteVisible = true;
    this.selectedAplikacijaToDeleteName = e['naziv'];
    this.aplikacijaToDeleteId = e['id'];
  }

  deleteAplikacija() {
    this.service.removeAplikacija(this.aplikacijaToDeleteId).subscribe(res => {
      this.service.getAplikacije().subscribe(aps => this.aplikacijeAll = aps);
      this.stranice = [];
      this.selectedStr = '';
      this.aplikacijaDeleteVisible = false;
    });
  }
  deleteAplikacijaNo() {
    this.aplikacijaDeleteVisible = false;
  }
}
