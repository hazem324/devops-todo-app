import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterType } from '../../../../model/todo.model';

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
  @Output() filterChange = new EventEmitter<FilterType>();

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
}
