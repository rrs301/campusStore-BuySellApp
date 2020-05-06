import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayItemsPage } from './display-items.page';

describe('DisplayItemsPage', () => {
  let component: DisplayItemsPage;
  let fixture: ComponentFixture<DisplayItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
