import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRequestComponent } from './action-request.component';

describe('ActionRequestComponent', () => {
  let component: ActionRequestComponent;
  let fixture: ComponentFixture<ActionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
