import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  invalidUsername = false;
  invalidPassword = false;
  usernameError;
  passwordError;

  constructor(private authService: SessionService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
    });
  }

  get username() { return this.form.get('username').value; }
  get password() { return this.form.get('password').value; }

  submit() {
    if (this.form.valid) {
      this.invalidPassword = this.invalidUsername = false;
      const name = this.username;
      const password = this.password;
      this.authService.login(name, password).subscribe(() => {
        this.router.navigateByUrl('');
      });
    } else {
      if (!this.username.valid) {
        this.invalidUsername = true;
        const errors = this.form.get('username').errors;
        for (const e in errors) {
          if (e) {
            this.usernameError = e === "required" ? "Username required!" : "Username too short!";
          }
        }
      }
      if (!this.password.valid) {
        this.invalidPassword = true;
        const errors = this.form.get('password').errors;
        for (const e in errors) {
          if (e) {
            this.passwordError = e === "required" ? "Password required!" : "Password invalid!";
          }
        }
      }
      return;
    }
  }
}
