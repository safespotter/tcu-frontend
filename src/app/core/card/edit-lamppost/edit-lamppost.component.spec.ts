import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLamppostComponent } from './edit-lamppost.component';

describe('EditLamppostComponent', () => {
  let component: EditLamppostComponent;
  let fixture: ComponentFixture<EditLamppostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLamppostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLamppostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
