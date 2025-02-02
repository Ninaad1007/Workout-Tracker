import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css',
})
export class WorkoutFormComponent {
  @Output() workoutAdded = new EventEmitter<any>(); // Emit event when workout is added

  person = {
    username: '',
    workoutType: 'Cycling', // Default workout type (capitalized for consistency)
    minutes: '',
  };

  update() {
    if (!this.person.username || !this.person.minutes) {
      console.error('Please fill in all required fields.');
      return;
    }

    console.log('Form submitted!', this.person);

    // Save to localStorage
    let personList = JSON.parse(localStorage.getItem('personList') || '[]');
    personList.push(this.person);
    localStorage.setItem('personList', JSON.stringify(personList));

    // Emit event to notify parent component (workout-logs)
    this.workoutAdded.emit({ ...this.person });

    // Reset form
    this.person = { username: '', workoutType: 'Cycling', minutes: '' };
  }

  loadData() {
    const savedPersonList = localStorage.getItem('personList');
    if (savedPersonList) {
      console.log('Loaded person list:', JSON.parse(savedPersonList));
    }
  }

  ngOnInit() {
    this.loadData();
  }
}
