import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCouchComponent } from './train-couch.component';

describe('TrainCouchComponent', () => {
  let component: TrainCouchComponent;
  let fixture: ComponentFixture<TrainCouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainCouchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainCouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
