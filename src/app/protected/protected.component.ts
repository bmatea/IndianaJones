import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  click() {
    this.router.navigateByUrl('test');
  }

}
