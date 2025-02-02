import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutVizComponent } from './workout-viz.component';

describe('WorkoutVizComponent', () => {
  let component: WorkoutVizComponent;
  let fixture: ComponentFixture<WorkoutVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutVizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
