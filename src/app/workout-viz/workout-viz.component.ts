import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-workout-viz',
  templateUrl: './workout-viz.component.html',
  styleUrls: ['./workout-viz.component.css'],
})
export class WorkoutVizComponent implements OnChanges {
  @Input() userWorkouts: any[] = []; // Receive data of selected user
  chart: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userWorkouts) {
      this.updateChart();
    }
  }

  updateChart() {
    const workoutTypes = [
      ...new Set(this.userWorkouts.map((w) => w.workoutType)),
    ]; // Unique workout types
    const workoutMinutes = workoutTypes.map((type) => {
      return this.userWorkouts
        .filter((workout) => workout.workoutType === type)
        .reduce((total, workout) => total + workout.minutes, 0); // Total minutes for each workout type
    });

    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart before creating a new one
    }

    this.chart = new Chart('workoutChart', {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [
          {
            label: 'Time Spent (Minutes)',
            data: workoutMinutes,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
