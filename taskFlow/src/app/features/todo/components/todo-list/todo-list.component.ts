import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../../../model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls:   ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input()  todos:     Todo[]       = [];
  @Input()  editingId: number | null = null;

  @Output() toggle     = new EventEmitter<number>();
  @Output() delete     = new EventEmitter<number>();
  @Output() startEdit  = new EventEmitter<number>();
  @Output() save       = new EventEmitter<{ id: number; title: string }>();
  @Output() cancelEdit = new EventEmitter<void>();

  trackById(_: number, todo: Todo): number {
    return todo.id;
  }
}
