import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { TodoPageComponent } from './todo-page.component';
import { TodoService } from '../../../../services/todo.service';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;
  let todoService: TodoService;

  const mockTodos = [
    { id: 1, title: 'Task A', completed: true,  priority: 'HIGH'   },
    { id: 2, title: 'Task B', completed: false, priority: 'LOW'    },
    { id: 3, title: 'Task C', completed: false, priority: 'MEDIUM' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoPageComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture   = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    spyOn(todoService, 'getAllTodos').and.returnValue(of(mockTodos));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    expect(todoService.getAllTodos).toHaveBeenCalled();
    expect(component.todos.length).toBe(3);
  });

  it('should compute totalCount correctly', () => {
    expect(component.totalCount).toBe(3);
  });

  it('should compute doneCount correctly', () => {
    expect(component.doneCount).toBe(1);
  });

  it('should compute pendingCount correctly', () => {
    expect(component.pendingCount).toBe(2);
  });

  it('should filter by pending', () => {
    component.activeFilter = 'pending';
    expect(component.filteredTodos.every(t => !t.completed)).toBeTrue();
  });

  it('should filter by done', () => {
    component.activeFilter = 'done';
    expect(component.filteredTodos.every(t => t.completed)).toBeTrue();
  });

  it('should filter by high priority', () => {
    component.activeFilter = 'high';
    expect(component.filteredTodos.every(t => t.priority === 'HIGH')).toBeTrue();
  });

  it('should filter by medium priority', () => {
    component.activeFilter = 'medium';
    expect(component.filteredTodos.every(t => t.priority === 'MEDIUM')).toBeTrue();
  });

  it('should filter by low priority', () => {
    component.activeFilter = 'low';
    expect(component.filteredTodos.every(t => t.priority === 'LOW')).toBeTrue();
  });

  it('should return all todos when filter is all', () => {
    component.activeFilter = 'all';
    expect(component.filteredTodos.length).toBe(3);
  });

  it('should add new todo on onTodoCreated', () => {
    const newTodo = { id: 4, title: 'New', completed: false, priority: 'LOW' };
    component.onTodoCreated(newTodo);
    expect(component.todos[0]).toEqual(newTodo);
    expect(component.todos.length).toBe(4);
  });

  it('should update todo on onTodoUpdated', () => {
    const updated = { id: 1, title: 'Updated', completed: true, priority: 'HIGH' };
    component.onTodoUpdated(updated);
    expect(component.todos.find(t => t.id === 1)?.title).toBe('Updated');
  });

  it('should clear editingId on onTodoUpdated', () => {
    component.editingId = 1;
    component.onTodoUpdated({ id: 1, title: 'X', completed: false, priority: 'LOW' });
    expect(component.editingId).toBeNull();
  });

  it('should remove todo on onTodoDeleted', () => {
    component.onTodoDeleted(1);
    expect(component.todos.find(t => t.id === 1)).toBeUndefined();
    expect(component.todos.length).toBe(2);
  });

  it('should return completed todos via completedTodos getter', () => {
    expect(component.completedTodos.length).toBe(1);
    expect(component.completedTodos[0].id).toBe(1);
  });
});