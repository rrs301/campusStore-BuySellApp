import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListsPage } from './items-lists.page';

describe('ItemsListsPage', () => {
  let component: ItemsListsPage;
  let fixture: ComponentFixture<ItemsListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsListsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
