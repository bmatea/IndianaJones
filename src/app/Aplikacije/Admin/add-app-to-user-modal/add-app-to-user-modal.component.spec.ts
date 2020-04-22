import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppToUserModalComponent } from './add-app-to-user-modal.component';

describe('AddAppToUserModalComponent', () => {
  let component: AddAppToUserModalComponent;
  let fixture: ComponentFixture<AddAppToUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppToUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppToUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
