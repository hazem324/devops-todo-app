import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TodoPageComponent } from './todo-page.component';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoPageComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute counts correctly', () => {
    component.todos = [
      { id: 1, title: 'A', completed: true,  priority: 'HIGH' },
      { id: 2, title: 'B', completed: false, priority: 'LOW'  }
    ];
    expect(component.totalCount).toBe(2);
    expect(component.doneCount).toBe(1);
    expect(component.pendingCount).toBe(1);
  });

  it('should add new todo on onTodoCreated', () => {
    component.todos = [];
    component.onTodoCreated({ id: 1, title: 'New', completed: false, priority: 'LOW' });
    expect(component.todos.length).toBe(1);
  });

  it('should remove todo on onTodoDeleted', () => {
    component.todos = [{ id: 1, title: 'A', completed: false, priority: 'LOW' }];
    component.onTodoDeleted(1);
    expect(component.todos.length).toBe(0);
  });
});