import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Todo, UpdateTodoDto } from '../../../../model/todo.model';
import { TodoService } from '../../../../services/todo.service';
import { ToastService } from '../../../../services/toast.service';
import { getErrorMessage } from '../../../../utils/http-error.util';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls:   ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input()  todo!:      Todo;
  @Input()  isEditing = false;

  @Output() startEdit   = new EventEmitter<number>();
  @Output() cancelEdit  = new EventEmitter<void>();
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  @ViewChild('editInput') editInputRef!: ElementRef<HTMLInputElement>;

  currentEditValue = '';
  isSaving         = false;
  isDeleting       = false;

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}

  get paddedId(): string {
    return this.todo?.id?.toString().padStart(3, '0') ?? '000';
  }

  // ✅ Guard: todo or priority could be null while API response is in flight
  get priorityClass(): string {
    return this.todo?.priority
      ? 'priority-' + this.todo.priority.toLowerCase()
      : 'priority-low';
  }

  get badgeClass(): string {
    return this.todo?.priority
      ? 'tag-' + this.todo.priority.toLowerCase()
      : 'tag-low';
  }

  /* PUT /todo/:id/complete  OR  PUT /todo/:id { completed: false } */
  onToggle(): void {
    if (!this.todo.completed) {
      this.todoService.markAsCompleted(this.todo.id).subscribe({
        next: (updated) => {
          this.todoUpdated.emit(updated);
          this.toastService.success('✓ Task marked as completed.');
        },
        error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
      });
    } else {
      const dto: UpdateTodoDto = { completed: false };
      this.todoService.updateTodo(this.todo.id, dto).subscribe({
        next: (updated) => {
          this.todoUpdated.emit(updated);
          this.toastService.info('↩ Task moved back to pending.');
        },
        error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
      });
    }
  }

  /* PUT /todo/:id — title update */
  onSave(title?: string): void {
    const value   = title ?? this.editInputRef?.nativeElement?.value ?? this.currentEditValue;
    const trimmed = value.trim();
    if (!trimmed) return;

    this.isSaving = true;
    const dto: UpdateTodoDto = { title: trimmed };

    this.todoService.updateTodo(this.todo.id, dto).subscribe({
      next: (updated) => {
        this.todoUpdated.emit(updated);
        this.toastService.success('✓ Task updated.');
        this.isSaving = false;
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error(getErrorMessage(err));
        this.isSaving = false;
      }
    });
  }

  /* DELETE /todo/:id */
  onDelete(): void {
    this.isDeleting = true;
    this.todoService.deleteTodo(this.todo.id).subscribe({
      next: () => {
        this.todoDeleted.emit(this.todo.id);
        this.toastService.info(`🗑 Task "${this.todo.title}" deleted.`);
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error(getErrorMessage(err));
        this.isDeleting = false;
      }
    });
  }
}