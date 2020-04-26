import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolaModalComponent } from './add-rola-modal.component';

describe('AddRolaModalComponent', () => {
  let component: AddRolaModalComponent;
  let fixture: ComponentFixture<AddRolaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRolaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
