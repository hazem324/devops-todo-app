import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Todo, FilterType, Priority } from '../../../../model/todo.model';
import { getErrorMessage } from '../../../../utils/http-error.util';
import { TodoService } from '../../../../services/todo.service';
import { ToastService } from '../../../../services/toast.service';


interface FilterOption {
  value: FilterType;
  label: string;
}

@Component({
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls:   ['./todo-filters.component.css']
})
export class TodoFiltersComponent {

  @Input()  activeFilter: FilterType = 'all';

  /* Notifies parent which filter pill is active */
  @Output() filterChange = new EventEmitter<FilterType>();

  /* Sends the filtered list up so todo-page can pass it to todo-list */
  @Output() filteredResults = new EventEmitter<Todo[]>();

  isLoading = false;

  readonly statusFilters: FilterOption[] = [
    { value: 'all',     label: 'All'     },
    { value: 'pending', label: 'Pending' },
    { value: 'done',    label: 'Done'    },
  ];

  readonly priorityFilters: FilterOption[] = [
    { value: 'high',   label: '🔴 High'   },
    { value: 'medium', label: '🟡 Medium' },
    { value: 'low',    label: '🟢 Low'    },
  ];

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}

  onFilterClick(filter: FilterType): void {
    this.activeFilter = filter;
    this.filterChange.emit(filter);

    switch (filter) {

      /* GET /todo — all: let todo-page reload; emit null to signal "use full list" */
      case 'all':
        this.todoService.getAllTodos().subscribe({
          next: (todos) => this.filteredResults.emit(todos),
          error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
        });
        break;

      /* GET /todo/completed/false */
      case 'pending':
        this.todoService.getTodosByCompleted(false).subscribe({
          next: (todos) => this.filteredResults.emit(todos),
          error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
        });
        break;

      /* GET /todo/completed/true */
      case 'done':
        this.todoService.getTodosByCompleted(true).subscribe({
          next: (todos) => this.filteredResults.emit(todos),
          error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
        });
        break;

      /* GET /todo/priority/HIGH */
      case 'high':
        this.todoService.getTodosByPriority('HIGH').subscribe({
          next: (todos) => this.filteredResults.emit(todos),
          error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
        });
        break;

      /* GET /todo/priority/MEDIUM */
      case 'medium':
        this.todoService.getTodosByPriority('MEDIUM').subscribe({
          next: (todos) => this.filteredResults.emit(todos),
          error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
        });
        break;

      /* GET /todo/priority/LOW */
      case 'low':
        this.todoService.getTodosByPriority('LOW').subscribe({
          next: (todos) => this.filteredResults.emit(todos),
          error: (err: HttpErrorResponse) => this.toastService.error(getErrorMessage(err))
        });
        break;
    }
  }
}
