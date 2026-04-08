import { Component, Output, EventEmitter } from '@angular/core';
import { Priority, Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls:   ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() addTodo = new EventEmitter<Omit<Todo, 'id'>>();

  title            = '';
  selectedPriority: Priority = 'LOW';
  readonly priorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];

  selectPriority(p: Priority): void {
    this.selectedPriority = p;
  }

  submit(): void {
    const trimmed = this.title.trim();
    if (!trimmed) return;
    this.addTodo.emit({ title: trimmed, completed: false, priority: this.selectedPriority });
    this.title = '';
  }
}
