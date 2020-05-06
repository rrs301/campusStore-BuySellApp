import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsPage } from './add-items.page';

describe('AddItemsPage', () => {
  let component: AddItemsPage;
  let fixture: ComponentFixture<AddItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
