import { Component } from '@angular/core';
import { Todo } from '../../../../model/todo.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {

   todos: Todo[] = [];
  filter = 'all';
  nextId = 1;

  addTodo(title: string, priority: string) {
    this.todos.unshift({
      id: this.nextId++,
      title,
      completed: false,
      priority: priority as any
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  toggleTodo(id: number) {
    const t = this.todos.find(t => t.id === id);
    if (t) t.completed = !t.completed;
  }

  setFilter(f: string) {
    this.filter = f;
  }

  get filteredTodos() {
    return this.todos.filter(t => {
      if (this.filter === 'done') return t.completed;
      if (this.filter === 'pending') return !t.completed;
      if (this.filter === 'high') return t.priority === 'HIGH';
      if (this.filter === 'medium') return t.priority === 'MEDIUM';
      if (this.filter === 'low') return t.priority === 'LOW';
      return true;
    });
  }

  get stats() {
    return {
      total: this.todos.length,
      done: this.todos.filter(t => t.completed).length,
      pending: this.todos.filter(t => !t.completed).length
    };
  }
}