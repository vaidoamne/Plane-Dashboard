// tasks.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForOf} from "@angular/common";
import {HeaderComponent} from "../header/header.component"; // Import FormsModule

interface NewTask {
  description: string;
  urgency: string;
  creator: string;
  assignedTo: string;
  dueDate: string; // Type for due date
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    HeaderComponent
  ],
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  taskStatus = {
    notCompleted: [] as string[],
    workingOnIt: [] as string[],
    completed: [] as string[]
  };

  newTask: NewTask = {
    description: '',
    urgency: 'Low',
    creator: '',
    assignedTo: '',
    dueDate: '' // Default to empty string
  };

  createTask(): void {
    // Check if all fields are filled
    if (!this.newTask.description || !this.newTask.creator || !this.newTask.assignedTo || !this.newTask.dueDate) {
      alert('Please fill in all fields.');
      return;
    }

    // Generating random task ID for demo
    const taskId = Math.floor(Math.random() * 1000);
    // Creating a new task object
    const newTaskStr = `Task ${taskId}: Description: ${this.newTask.description}, Urgency: ${this.newTask.urgency}, Creator: ${this.newTask.creator}, Assigned to: ${this.newTask.assignedTo}, Due Date: ${this.newTask.dueDate}`;
    this.taskStatus.notCompleted.push(newTaskStr);
    // Clearing form fields after creating task
    this.newTask = {
      description: '',
      urgency: 'Low',
      creator: '',
      assignedTo: '',
      dueDate: '' // Reset due date
    };
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDragStart(event: DragEvent, task: string): void {
    event.dataTransfer?.setData('text/plain', task);
  }

  onTaskDrop(event: DragEvent, targetStatus: 'notCompleted' | 'workingOnIt' | 'completed'): void {
    event.preventDefault();
    const task = event.dataTransfer?.getData('text/plain');
    if (task) {
      const originalStatus = this.getOriginalStatus(task);
      const index = this.taskStatus[originalStatus].indexOf(task);
      if (index !== -1) {
        this.taskStatus[originalStatus].splice(index, 1);
        this.taskStatus[targetStatus].push(task);
      }
    }
  }

  private getOriginalStatus(task: string): 'notCompleted' | 'workingOnIt' | 'completed' {
    if (this.taskStatus.notCompleted.includes(task)) {
      return 'notCompleted';
    } else if (this.taskStatus.workingOnIt.includes(task)) {
      return 'workingOnIt';
    } else if (this.taskStatus.completed.includes(task)) {
      return 'completed';
    }
    return 'notCompleted'; // Default to notCompleted if task is not found
  }

  // Function to determine urgency class based on task
  getUrgencyClass(task: string): string {
    if (task.includes('(Urgency: Low)')) {
      return 'task low';
    } else if (task.includes('(Urgency: Medium)')) {
      return 'task medium';
    } else if (task.includes('(Urgency: High)')) {
      return 'task high';
    }
    return 'task'; // Default class if no urgency is specified
  }

  // Getters for task details
  getTaskDescription(task: string): string {
    const descriptionStart = task.indexOf('Description: ') + 'Description: '.length;
    const descriptionEnd = task.indexOf(', Urgency:');
    return task.substring(descriptionStart, descriptionEnd);
  }

  getTaskUrgency(task: string): string {
    const urgencyStart = task.indexOf('Urgency: ') + 'Urgency: '.length;
    const urgencyEnd = task.indexOf(', Creator:');
    return task.substring(urgencyStart, urgencyEnd);
  }

  getTaskCreator(task: string): string {
    const creatorStart = task.indexOf('Creator: ') + 'Creator: '.length;
    const creatorEnd = task.indexOf(', Assigned to:');
    return task.substring(creatorStart, creatorEnd);
  }

  getTaskAssignedTo(task: string): string {
    const assignedToStart = task.indexOf('Assigned to: ') + 'Assigned to: '.length;
    const assignedToEnd = task.indexOf(', Due Date:');
    return task.substring(assignedToStart, assignedToEnd);
  }

  getTaskDueDate(task: string): string {
    const dueDateStart = task.indexOf('Due Date: ') + 'Due Date: '.length;
    return task.substring(dueDateStart);
  }
}
