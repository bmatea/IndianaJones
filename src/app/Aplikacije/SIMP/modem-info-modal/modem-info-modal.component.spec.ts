import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModemInfoModalComponent } from './modem-info-modal.component';

describe('ModemInfoModalComponent', () => {
  let component: ModemInfoModalComponent;
  let fixture: ComponentFixture<ModemInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModemInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModemInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
