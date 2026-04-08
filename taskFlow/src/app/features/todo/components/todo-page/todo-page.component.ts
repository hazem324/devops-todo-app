import { Component } from '@angular/core';
import { FilterType, Todo } from '../../../../model/todo.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls:   ['./todo-page.component.css']
})
export class TodoPageComponent {

  /* ── State ── */
  todos: Todo[] = [
    { id: 1, title: 'Setup Spring Boot project',       completed: true,  priority: 'HIGH'   },
    { id: 2, title: 'Design REST API endpoints',       completed: true,  priority: 'HIGH'   },
    { id: 3, title: 'Build Angular frontend',          completed: false, priority: 'MEDIUM' },
    { id: 4, title: 'Connect to PostgreSQL',           completed: false, priority: 'HIGH'   },
    { id: 5, title: 'Write unit tests for service layer', completed: false, priority: 'MEDIUM' },
    { id: 6, title: 'Deploy to Docker',                completed: false, priority: 'LOW'    },
  ];

  private nextId  = 7;
  activeFilter: FilterType  = 'all';
  editingId: number | null  = null;

  /* ── Toast ── */
  toastMessage = '';
  toastVisible = false;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  /* ── Derived getters ── */
  get filteredTodos(): Todo[] {
    return this.todos.filter(t => {
      switch (this.activeFilter) {
        case 'pending': return !t.completed;
        case 'done':    return t.completed;
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

  /* ── Handlers ── */
  onAdd(draft: Omit<Todo, 'id'>): void {
    this.todos = [{ ...draft, id: this.nextId++ }, ...this.todos];
    this.showToast(`Task added — id:${this.nextId - 1}`);
  }

  onToggle(id: number): void {
    this.todos = this.todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
  }

  onDelete(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.showToast(`Task #${id} deleted`);
  }

  onSave(event: { id: number; title: string }): void {
    this.todos = this.todos.map(t =>
      t.id === event.id ? { ...t, title: event.title } : t
    );
    this.editingId = null;
    this.showToast(`Task #${event.id} updated`);
  }

  clearCompleted(): void {
    const count = this.todos.filter(t => t.completed).length;
    this.todos  = this.todos.filter(t => !t.completed);
    if (count) this.showToast(`${count} completed task(s) removed`);
  }

  private showToast(msg: string): void {
    this.toastMessage = msg;
    this.toastVisible = true;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastVisible = false), 2200);
  }
}
