import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUIPage } from './chat-ui.page';

describe('ChatUIPage', () => {
  let component: ChatUIPage;
  let fixture: ComponentFixture<ChatUIPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUIPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
