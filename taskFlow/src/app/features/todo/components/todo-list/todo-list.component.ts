import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../../../model/todo.model';
;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls:   ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input()  todos:     Todo[]        = [];
  @Input()  editingId: number | null = null;

  /* Bubbled up from todo-item → todo-list → todo-page */
  @Output() startEdit  = new EventEmitter<number>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  trackById(_: number, todo: Todo): number {
    return todo.id;
  }
}
