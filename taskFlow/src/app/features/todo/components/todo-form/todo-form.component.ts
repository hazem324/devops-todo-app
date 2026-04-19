import { Component, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Todo, CreateTodoDto, Priority } from '../../../../model/todo.model';
import { TodoService } from '../../../../services/todo.service';
import { ToastService } from '../../../../services/toast.service';
import { getErrorMessage } from '../../../../utils/http-error.util';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls:   ['./todo-form.component.css']
})
export class TodoFormComponent {

  //  Emits ONLY after server responds with the created Todo (contains real id + priority)
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
    if (!trimmed || this.isSubmitting) return;

    this.isSubmitting = true;

    const dto: CreateTodoDto = {
      title:     trimmed,
      completed: false,
      priority:  this.selectedPriority
    };

    this.todoService.createTodo(dto).subscribe({
      next: (created: Todo) => {
        //  Only emit after server confirms 
        this.todoCreated.emit(created);
        this.toastService.success(`✓ Task "${created.title}" added.`);
        this.title        = '';
        this.isSubmitting = false;
      },
      error: (err: HttpErrorResponse) => {
        //  On error, emit NOTHING — no broken todo enters the list
        this.toastService.error(getErrorMessage(err));
        this.isSubmitting = false;
      }
    });
  }
}