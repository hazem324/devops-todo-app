import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Todo, FilterType } from '../../../../model/todo.model';
import { TodoService } from '../../../../services/todo.service';
import { ToastService } from '../../../../services/toast.service';
import { getErrorMessage } from '../../../../utils/http-error.util';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls:   ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  todos:        Todo[] = [];
  isLoading   = false;
  activeFilter: FilterType   = 'all';
  editingId:    number | null = null;

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}

  /* ─── Init: GET /todo ─── */
  ngOnInit(): void {
    this.isLoading = true;

    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos     = todos;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastService.error(getErrorMessage(err));
      }
    });
  }

  /* ─── Derived getters ─── */
  get filteredTodos(): Todo[] {
    return this.todos.filter(t => {
      switch (this.activeFilter) {
        case 'pending': return !t.completed;
        case 'done':    return  t.completed;
        case 'high':    return t.priority === 'HIGH';
        case 'medium':  return t.priority === 'MEDIUM';
        case 'low':     return t.priority === 'LOW';
        default:        return true;
      }
    });
  }

  get totalCount():   number { return this.todos.length; }
  get doneCount():    number { return this.todos.filter(t =>  t.completed).length; }
  get pendingCount(): number { return this.todos.filter(t => !t.completed).length; }

  /* ─── Called by todo-form after it creates a task ─── */
  onTodoCreated(todo: Todo): void {
    this.todos = [todo, ...this.todos];
  }

  /* ─── Called by todo-item after it updates a task ─── */
  onTodoUpdated(updated: Todo): void {
    this.todos     = this.todos.map(t => t.id === updated.id ? updated : t);
    this.editingId = null;
  }

  /* ─── Called by todo-item after it deletes a task ─── */
  onTodoDeleted(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  /* ─── Clear all completed — delegates to todo-item via filter ─── */
  get completedTodos(): Todo[] {
    return this.todos.filter(t => t.completed);
  }
}
