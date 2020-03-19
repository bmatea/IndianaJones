import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviZahtjevComponent } from './novi-zahtjev.component';

describe('NoviZahtjevComponent', () => {
  let component: NoviZahtjevComponent;
  let fixture: ComponentFixture<NoviZahtjevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoviZahtjevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviZahtjevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
