import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  standalone: true,
  imports: [
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

  createTask(): void {
    const newTask = `Task ${Math.floor(Math.random() * 100)}`;
    this.taskStatus.notCompleted.push(newTask);
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
}
