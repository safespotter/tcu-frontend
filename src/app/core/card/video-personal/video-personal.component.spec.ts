import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPersonalComponent } from './video-personal.component';

describe('VideoPersonalComponent', () => {
  let component: VideoPersonalComponent;
  let fixture: ComponentFixture<VideoPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
