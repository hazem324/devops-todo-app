import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockTodos = [
    { id: 1, title: 'Task A', completed: false, priority: 'LOW'  },
    { id: 2, title: 'Task B', completed: true,  priority: 'HIGH' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]   // template renders app-todo-item children
    }).compileComponents();

    fixture   = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty todos by default', () => {
    expect(component.todos).toEqual([]);
  });

  it('should have null editingId by default', () => {
    expect(component.editingId).toBeNull();
  });

  it('should accept todos as input', () => {
    component.todos = mockTodos;
    fixture.detectChanges();
    expect(component.todos.length).toBe(2);
  });

  it('should return correct id from trackById', () => {
    const result = component.trackById(0, mockTodos[0]);
    expect(result).toBe(1);
  });

  it('should emit startEdit when triggered', () => {
    spyOn(component.startEdit, 'emit');
    component.startEdit.emit(1);
    expect(component.startEdit.emit).toHaveBeenCalledWith(1);
  });

  it('should emit cancelEdit when triggered', () => {
    spyOn(component.cancelEdit, 'emit');
    component.cancelEdit.emit();
    expect(component.cancelEdit.emit).toHaveBeenCalled();
  });

  it('should emit todoDeleted when triggered', () => {
    spyOn(component.todoDeleted, 'emit');
    component.todoDeleted.emit(1);
    expect(component.todoDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should emit todoUpdated when triggered', () => {
    spyOn(component.todoUpdated, 'emit');
    component.todoUpdated.emit(mockTodos[0]);
    expect(component.todoUpdated.emit).toHaveBeenCalledWith(mockTodos[0]);
  });
});