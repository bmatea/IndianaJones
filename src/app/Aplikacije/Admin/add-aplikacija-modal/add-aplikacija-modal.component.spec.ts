import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAplikacijaModalComponent } from './add-aplikacija-modal.component';

describe('AddAplikacijaModalComponent', () => {
  let component: AddAplikacijaModalComponent;
  let fixture: ComponentFixture<AddAplikacijaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAplikacijaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAplikacijaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
