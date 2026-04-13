import { Component, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Todo, CreateTodoDto, Priority } from  '../../../../model/todo.model';
import { TodoService } from '../../../../services/todo.service';
import { ToastService } from '../../../../services/toast.service';
import { getErrorMessage } from '../../../../utils/http-error.util';



@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls:   ['./todo-form.component.css']
})
export class TodoFormComponent {

  /* Emits the fully created Todo (with id from server) up to todo-page */
  @Output() todoCreated = new EventEmitter<Todo>();

  title             = '';
  selectedPriority: Priority = 'LOW';
  isSubmitting      = false;

  readonly priorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}

  selectPriority(p: Priority): void {
    this.selectedPriority = p;
  }

  /* POST /todo */
  submit(): void {
    const trimmed = this.title.trim();
    if (!trimmed) return;

    this.isSubmitting = true;

    const dto: CreateTodoDto = {
      title:     trimmed,
      completed: false,
      priority:  this.selectedPriority
    };

    this.todoService.createTodo(dto).subscribe({
      next: (created: Todo) => {
        this.todoCreated.emit(created);
        this.toastService.success(`✓ Task "${created.title}" added.`);
        this.title        = '';
        this.isSubmitting = false;
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error(getErrorMessage(err));
        this.isSubmitting = false;
      }
    });
  }
}
