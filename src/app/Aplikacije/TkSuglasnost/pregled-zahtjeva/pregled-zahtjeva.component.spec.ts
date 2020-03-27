import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZahtjevaComponent } from './pregled-zahtjeva.component';

describe('PregledZahtjevaComponent', () => {
  let component: PregledZahtjevaComponent;
  let fixture: ComponentFixture<PregledZahtjevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledZahtjevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledZahtjevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
