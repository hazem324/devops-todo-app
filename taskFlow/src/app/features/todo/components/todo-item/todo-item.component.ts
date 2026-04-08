import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../../../model/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls:   ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input()  todo!:      Todo;
  @Input()  isEditing = false;

  @Output() toggle     = new EventEmitter<number>();
  @Output() delete     = new EventEmitter<number>();
  @Output() startEdit  = new EventEmitter<number>();
  @Output() save       = new EventEmitter<{ id: number; title: string }>();
  @Output() cancelEdit = new EventEmitter<void>();

  get paddedId(): string {
    return this.todo.id.toString().padStart(3, '0');
  }

  get priorityClass(): string {
    return 'priority-' + this.todo.priority.toLowerCase();
  }

  get badgeClass(): string {
    return 'tag-' + this.todo.priority.toLowerCase();
  }

  onSave(title: string): void {
    const trimmed = title.trim();
    if (trimmed) this.save.emit({ id: this.todo.id, title: trimmed });
  }
}
