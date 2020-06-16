import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateattendancePage } from './createattendance.page';

describe('CreateattendancePage', () => {
  let component: CreateattendancePage;
  let fixture: ComponentFixture<CreateattendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateattendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateattendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
