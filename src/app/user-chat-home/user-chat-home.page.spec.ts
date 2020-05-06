import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatHomePage } from './user-chat-home.page';

describe('UserChatHomePage', () => {
  let component: UserChatHomePage;
  let fixture: ComponentFixture<UserChatHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChatHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
