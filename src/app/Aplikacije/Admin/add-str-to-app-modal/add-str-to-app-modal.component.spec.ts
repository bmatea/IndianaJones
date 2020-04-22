import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStrToAppModalComponent } from './add-str-to-app-modal.component';

describe('AddStrToAppModalComponent', () => {
  let component: AddStrToAppModalComponent;
  let fixture: ComponentFixture<AddStrToAppModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStrToAppModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStrToAppModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
