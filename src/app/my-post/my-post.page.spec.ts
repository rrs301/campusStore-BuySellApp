import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostPage } from './my-post.page';

describe('MyPostPage', () => {
  let component: MyPostPage;
  let fixture: ComponentFixture<MyPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
