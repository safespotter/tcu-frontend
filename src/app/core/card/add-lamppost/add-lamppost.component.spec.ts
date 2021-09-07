import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLamppostComponent } from './add-lamppost.component';

describe('AddLamppostComponent', () => {
  let component: AddLamppostComponent;
  let fixture: ComponentFixture<AddLamppostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLamppostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLamppostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
