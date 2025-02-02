import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Workout {
  username: string;
  workoutTypes: string[]; // Store multiple workouts per user
  totalMinutes: number; // Total workout duration
  numberOfWorkouts: number; // Count of workouts
}

@Component({
  selector: 'app-workout-logs',
  templateUrl: './workout-logs.component.html',
  styleUrls: ['./workout-logs.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class WorkoutLogsComponent {
  workoutList: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  searchTerm: string = '';
  selectedType: string = 'All';
  workoutTypes: string[] = ['All', 'Cycling', 'Running', 'Swimming', 'Yoga'];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  itemsPerPageOptions: number[] = [10, 50, 100];

  constructor() {
    this.filteredWorkouts = [...this.workoutList]; // Initialize the filtered list
  }

  addWorkout(newWorkout: {
    username: string;
    workoutType: string;
    minutes: number;
  }) {
    const existingUser = this.workoutList.find(
      (w) => w.username === newWorkout.username
    );

    if (existingUser) {
      // ✅ Update existing user’s workouts
      if (!existingUser.workoutTypes.includes(newWorkout.workoutType)) {
        existingUser.workoutTypes.push(newWorkout.workoutType);
      }
      existingUser.totalMinutes += newWorkout.minutes;
      existingUser.numberOfWorkouts += 1;
    } else {
      // ✅ Add new user entry
      this.workoutList.push({
        username: newWorkout.username,
        workoutTypes: [newWorkout.workoutType],
        totalMinutes: newWorkout.minutes,
        numberOfWorkouts: 1,
      });
    }

    this.filterWorkouts();
  }

  filterWorkouts() {
    let filtered = [...this.workoutList];

    // Apply search filter
    if (this.searchTerm.trim()) {
      filtered = filtered.filter((workout) =>
        workout.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply workout type filter
    if (this.selectedType !== 'All') {
      filtered = filtered.filter((workout) =>
        workout.workoutTypes.includes(this.selectedType)
      );
    }

    this.filteredWorkouts = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1; // Reset pagination
  }

  get paginatedWorkouts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredWorkouts.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages() {
    return Math.max(Math.ceil(this.totalItems / this.itemsPerPage), 1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = Number(event.target.value);
    this.currentPage = 1; // Reset to first page
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.filterWorkouts();
  }

  onTypeChange(event: any) {
    this.selectedType = event.target.value;
    this.filterWorkouts();
    this.currentPage = 1; // Reset pagination after filtering
  }
}
