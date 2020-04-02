import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptycardComponent } from './emptycard.component';

describe('EmptycardComponent', () => {
  let component: EmptycardComponent;
  let fixture: ComponentFixture<EmptycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
